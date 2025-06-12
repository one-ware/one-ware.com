---
id: get-started
title: Getting Started with One AI for Object Detection
sidebar_label: Get Started
---

# Getting Started with One AI for Object Detection

## 1. Create a New Project
Open the Project Creator by `File -> New -> Project`

![New Project](/img/ai/one_ai_plugin/newProject.png)

### Set Project options
![New Project Options](/img/ai/one_ai_plugin/setProjectOptions.png)

You can change the following properties:
- Name  
- Template  
- Location  
- Toolchain  
- Loader  

---

## 2. Initialize the AI-Generator
Navigate to the **AI** tab and choose **“Open AI Generator”**.
![AI Generator Modal](/img/ai/one_ai_plugin/ai_generator_modal.png)

Enter your **Project Name** and choose the **AI Type**. 

**Note:** Currently, only “Image Detection” is available as the AI type.

---

## 3. Dataset Preparation - Build Your AI Foundation

Before training your model, you need to load and organize your image data. A clean and well-labeled dataset is the foundation for accurate AI performance.

### 3.1 Load Your Images
Access the **Dataset** tab in your ONE AI workspace to prepare your visual training data.

![Training Data View](/img/ai/one_ai_plugin/training_data_view.png)

- Use **“Select Images”** to load files directly from your device.  
- Select **“Camera Tool”** to capture and load images directly within ONE AI for real-time data collection.  
- **Preview Size** - Adjust how images display in your workspace for efficient labeling.

### 3.2 Choose Labeling Mode
![Label Mode](/img/ai/one_ai_plugin/label_mode.png)
- **Classification:** Just select the class of the images. If your images are already in folders that define the image class, the classification is done automatically.  
- **Annotation:** Mark objects in the image by drawing boxes around objects/defects. Needed for object detection.

### 3.3 Dataset Organization for AI Training

Proper dataset organization is crucial for building reliable AI models. Follow these steps to split your data effectively.

#### Training-Set
The training set teaches your AI what to recognize - it's your model's foundation.  
Use **70%** of your total dataset with properly labeled images. Include at least **50 images per class**. More variety means better real-world performance.

#### Validation-Set
The validation set monitors your model's performance on unseen data during training.  
This evaluates performance without direct training involvement. Labels are required for monitoring and prevent overfitting while tracking generalization.

**Using Validation Split:** No separate validation images? Enable **"Use Validation Split"** to auto-divide your training set:
- 20% for standard datasets  
- 30% for small datasets  
- 10% for large datasets  

#### Test-Set
The test set provides final performance evaluation after training.  
Keep this completely separate from training and validation data. Labels are optional but recommended. Make sure it represents real deployment conditions for objective accuracy measurement.

> This organized approach ensures your AI model will be robust, accurate, and ready for real-world deployment with ONE AI.

### 3.4 Add Your Labels
Open the **Labels** tab and create labels for each class you want to detect, like "defect" or "strawberry". Assign unique colors to make annotation faster and easier.

#### Two Label Types
- **Classification** - Categorize entire images with one label per image.  
  *Example:* "defect" or "no defect" for quality control  

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/labeled_img_1.png" alt="Labeled Image 1" style={{ width: '48%' }} />
        <img src="/img/ai/one_ai_plugin/labeled_img_2.png" alt="Labeled Image 2" style={{ width: '48%' }} />
    </div>
- **Object Detection** - Mark specific objects by drawing bounding boxes. Multiple objects and labels possible per image.  
  *Example:* Box individual "strawberry" or "foreign" objects

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/yolo_img_1.png" alt="yolo Image 1" style={{ width: '48%' }} />
        <img src="/img/ai/one_ai_plugin/yolo_img_2.png" alt="yolo Image 2" style={{ width: '48%' }} />
    </div>

**Simply put:**  
- **Classification =** Choose category for whole image  
- **Object Detection =** Draw boxes around objects to detect

---

## 4. Prefilters - Optimize Your Dataset
Apply prefilters before or after augmentation to standardize your dataset and boost model performance.

![Prefilter View](/img/ai/one_ai_plugin/prefilter_view.png)

### When to Use Prefilters
- **Before Augmentation:** Standardize your raw dataset for consistent training data  
- **After Augmentation:** Refine generated images to remove artifacts and improve quality  

### Resize Filter

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/resolution_pre.png" alt="Object resolution view " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/resolution_post.png" alt="Object resolution view" style={{ width: '18%' }} />
    </div>

Adjust image resolution based on your smallest target objects.  

Keep resolution high enough to preserve key details but avoid excessive size, as this increases prediction time and may reduce accuracy when the AI struggles with too much detail.

### Essential Prefilters

#### Color Enhancement

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/color_filter_1.png" alt="Object resolution view " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/color_filter_2.png" alt="Object resolution view" style={{ width: '18%' }} />
    </div>

Make objects stand out when they blend into similar backgrounds. Boost saturation, contrast, brightness, and hue to create clear visual separation. Add threshold filtering for sharp background removal while preserving critical object features.

#### Smart Cropping

![Smart Crop](/img/ai/one_ai_plugin/smart_crop.png)

Eliminate visual clutter and zero in on your target areas. Focus on regions where objects consistently appear to cut background noise, sharpen detection accuracy, and accelerate training performance.

#### Frequency Filtering
Simplify images while preserving critical details.  
- **Highpass** - Sharpens edges and fine details for better object definition  
- **Lowpass** - Smooths textures and removes visual noise that confuses models  


    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/lowpass_img_1.png" alt="LowPass filter 1 " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/lowpass_img_2.png" alt="LowPass filter 2" style={{ width: '18%' }} />
    </div>

    

### Advanced Prefilter Options
- **Color Space Conversion** - Switch between HSV and RGB for optimal color processing  
- **Edge Sharpening** - Emphasizes object boundaries for clearer detection  
- **Threshold Processing** - Creates high-contrast black and white images for specific applications  
- **Dataset Normalization** - Balances pixel values across your entire dataset  
- **Channel Filtering** 
  
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/channel_filter_1.png" alt="Channel Filter 1 " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/channel_filter_2.png" alt="Channel Filter 2" style={{ width: '18%' }} />
    </div>

    Remove or isolate specific color channels (red, green, blue) when one introduces unwanted visual noise

---

## 7. Augmentations

Augmentation filters are applied during training with random values within specified ranges. Their purpose is to increase the diversity of training data, helping AI to generalize better.

### Move Augmentation
Shifts the image along the X and Y axes within a specified range to introduce positional variability.

<img src="/img/ai/one_ai_plugin/aug_move.png" alt="Move Augmentation" style={{ width: '40%' }} />

### Rotate Augmentation
Define the range of angles within which the image can be rotated.

<img src="/img/ai/one_ai_plugin/aug_rotation.png" alt="Rotation Augmentation" style={{ width: '40%' }} />

### Flip Augmentation
Apply random flips to increase diversity.

<img src="/img/ai/one_ai_plugin/aug_flip.png" alt="Flip Augmentation" style={{ width: '40%' }} />

### Resize Augmentation
Scales the image in different dimensions for better object size detection.

<img src="/img/ai/one_ai_plugin/aug_resize.png" alt="Flip Augmentation" style={{ width: '40%' }} />

### Color Augmentation
Enhance object detection by adjusting saturation, contrast, etc.

<img src="/img/ai/one_ai_plugin/aug_color.png" alt="Color Augmentation" style={{ width: '40%' }} />

### Frequency Augmentation
Use high- and lowpass filters to reduce noise and improve generalization.

<img src="/img/ai/one_ai_plugin/aug_frequency.png" alt="Frequency Augmentation" style={{ width: '40%' }} />

### Noise Augmentation
Add random noise to images to help the model become robust against real-world image imperfections.

<img src="/img/ai/one_ai_plugin/aug_noise.png" alt="Noise Augmentation" style={{ width: '40%' }} />


---

## 8. Model Settings

### Tune Model Complexity
Optimize your model according to your specific requirements

- **X Position** - Predict the x position of objects in the image  
- **Y Position** - Predict the y position of objects in the image  
- **Width** - Predict the width of objects in the image. Uncheck to make the AI more efficient and if a default size for the objects is enough.
- **Height** - Predict the height of objects in the image. Uncheck to make the AI more efficient and if a default size for the objects is enough.
- **X/Y Precision (%)** - Set the precision level for predicting coordinates  
- **Allow Overlap**  
  - For example, with a 100x100 image and a position precision of 10%, the prediction operates on a 10x10 grid  
  - If two objects fall within the same grid cell, they are merged into one object when "Allow Overlap" is enabled  
  - If disabled, ONE AI refines the grid to avoid overlap  
- **Size Precision (%)** - Controls prediction of object sizes  
- **Prioritize Precision** - Adjust the model's balance between false positives and false negatives  
- **Minimum FPS** - Minimum predictions per second with selected hardware  
- **Maximum Memory Usage (%)** - Percentage of memory used for weights and calculations 
  
    <img src="/img/ai/one_ai_plugin/model_settings.png" alt="Model Tune Settings" style={{ width: '70%' }} /> 
### Input Settings
- **Estimated Surrounding Min Width (%)** - Estimate the minimum width of the area required to detect the smallest object correctly
- **Estimated Surrounding Min Height (%)**  - Estimate the minimum height of the area required to detect the smallest object correctly.
- **Estimated Surrounding Max Width (%)** -  Estimate the minimum width of the area required to detect the smallest object correctly
- **Estimated Surrounding Max Height (%)**  - Estimate the maximum height of the area required to detect the smallest object correctly.
- **Detect Simplicity (%)** - Estimate how easy it is to detect the object class

    <img src="/img/ai/one_ai_plugin/model_input_settings.png" alt="Model Input Settings" style={{ width: '70%' }} /> 
---

## 9. Hardware Settings

Select or define hardware resources to help ONE AI with model prediction.

### Used Hardware
Choose the hardware that is used to run the AI model.

### Advanced Settings
- **hardwareType** - Select hardware type  
- **Prioritize Speed Optimization** - Enable this if your hardware, such as an FPGA with limited internal RAM, requires efficient memory usage for higher accuracy with fewer model parameters.
- **Compute Capability** - Specify the computational power of your hardware
- **Compute Capability Unit**  
  - GFLOPS (Giga Floating Point Operations Per Second)  
  - TOPS (Tera Operations Per Second), especially for NPUs/ASICs  
- **Prioritize Memory Optimization**  
- **Memory Limit** - Define memory available  
- **Memory Limit Unit** - For FPGA SRAM in bits, divide by 8000 to convert to KB  
- **Optimize for Parallel Execution** - Enable for FPGA/ASIC parallel architectures  

### Quantized Calculations
Enable quantization to boost performance. This can slightly reduce accuracy but significantly increases speed. For most applications, especially on microcontrollers, TPUs, FPGAs, or ASICs, quantization is highly recommended 
- **Bits per Value** - Set precision level for neural network calculations  

---

## 10. Training

Ensure that your training data is uploaded, labeled, and properly prepared. This includes applying any necessary prefilters and selecting the most effective augmentations. Once your data is ready, double-check your model and hardware settings before starting the training process

### Sync  
### Create  
### Test  
### Export  

#### Create Tool
Choose tool format based on target hardware and application needs.
<img src="/img/ai/one_ai_plugin/export_tool.png" alt="Model Settings" style={{ width: '70%' }} /> 

#### Export Type
Select method for integrating AI model into the target system.
<img src="/img/ai/one_ai_plugin/export_type.png" alt="Model Settings" style={{ width: '70%' }} /> 
