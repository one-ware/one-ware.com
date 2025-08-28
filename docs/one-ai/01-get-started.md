---
id: get-started
title: Getting Started with One AI
sidebar_label: Getting Started
---

# Getting Started with One AI

This guide first explains how to set up ONE AI and then explains all Features and how to get the best out of your AI. But ONE AI is intelligent enought, so you don't need to understand each setting to get verry good results that usually exceed all universal AI models. If you then also follow all information on this site, you can get even better results that often exceed the work of human experts. On the left, you can find more Tutorials with datatset examples and more detailed explanaition on how to set Parameters. 

If you have any questions: Don't hesitate to ask our team for help via mail: support@one-ware.com or you can ask in our [Discord for ONE WARE Studio and ONE AI](https://discord.com/invite/NCN9VAh).
This helps us aswell, because we then know what tutorials we can do next. 

## 1. Setup
We have a cloud service and software that runs on your PC locally. This ensures maximum performance. In the setup, we guide you through the installation process.

### 1.1. Sign Up


### 1.2. Verify Address to Get Free Credits

### 1.3. Download ONE WARE Studio 

### 1.4. Install ONE AI Extension

### 1.5. Connect to ONE AI Cloud

## 2. Create a New Project
Open the Project Creator by clicking on `File -> New -> Project`

<img src="/img/ai/one_ai_plugin/newProject.png" alt="New Project" style={{ width: '40%' }} />

### Set Project options
![New Project Options](/img/ai/one_ai_plugin/setProjectOptions.png)

You need to specify the name.
The other settings are only important if you want to program an FPGA.<br/>
You can find more infomation about that [here](/docs/studio/tutorials/create-project/).

---

## 3. Initialize the AI Project
Make sure that the correct project is selected before you create a new AI project. <br/>
Navigate to the **AI** tab and choose **“Open AI Generator”**.

![AI Generator Modal](/img/ai/one_ai_plugin/ai_generator_modal.png)

Enter your **AI Project Name** and choose the **AI Type**. 

**Note:** Currently, only “Image Detection” is available as the AI type.

---

## 4. Dataset Preparation - Build Your AI Foundation

Before training your model, you need to load and organize your image data. A clean and well-labeled dataset is the foundation for accurate AI performance.

### 4.1 Load Your Images
Access the **Dataset** tab in your ONE AI workspace to prepare your visual training data.

![Training Data View](/img/ai/one_ai_plugin/training_data_view.png)

- Use **“Select Images”** to load files directly from your device.  
- Select **“Camera Tool”** to capture and load images directly within ONE AI for real-time data collection.  
- Additional Settings - Use **Preview Size** to adjust how images display in your workspace for efficient labeling.

### 4.2 Choose Labeling Mode
![Label Mode](/img/ai/one_ai_plugin/label_mode.png)
- **Classification:** Assigning one or more classes to each image.  
- **Annotation:** Mark objects in the image by drawing boxes around objects/defects. Needed for object detection.

### 4.3 Dataset Organization for AI Training

Proper dataset organization is crucial for building reliable AI models. Follow these steps to split your data effectively.

#### Training Set
The training set teaches your AI what to recognize - it's your model's foundation.  
Use about **70%** of your total dataset with properly labeled images. Ideally it should include at least **50 images per class**. More variety means better real-world performance.

#### Validation Set
The validation set monitors your model's performance on unseen data during training.  
This evaluates performance without direct training involvement. Labels are required for the validation set as well to monitor the AI performance on unseen data while training.

![Validation Setting](/img/ai/one_ai_plugin/val_setting.png)

**Using Validation Split:** If you don't have separate validation images, you can enable **"Use Validation Split"** to auto-divide your training set:
- 20% for standard datasets  
- 30% for small datasets  
- 10% for large datasets  

#### Test Set
The test set provides a final performance evaluation after training.  
Keep this set completely separate from training and validation data. Labels are optional but recommended. Make sure it represents real deployment conditions for an objective accuracy measurement.

> This organized approach ensures your AI model will be robust, accurate, and ready for real-world deployment with ONE AI.

![Test Setting](/img/ai/one_ai_plugin/test_setting.png)

If you don't have a separate test dataset, you can use the images from the train or validation dataset to test the AI.
Because ONE AI only uses the validation dataset to stop the training when there is no more improvement and not for hyperparameter settings, the results should not be too far off, if you use the validation dataset for the final evaluation.

### 4.4 Add Your Labels
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

---

## 5. Prefilters - Optimize Your Dataset
Apply prefilters before or after augmentation to optimize your dataset and boost model performance.

![Prefilter View](/img/ai/one_ai_plugin/prefilter_view.png)

### When to Use Prefilters
- **Before Augmentation:** Optimize your dataset for higher generalization and easier detection
- **After Augmentation:** Some prefilters only represent real world performance if they are applied after augmentation

### Resize Filter

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/resolution_pre.png" alt="Object resolution view " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/resolution_post.png" alt="Object resolution view" style={{ width: '18%' }} />
    </div>

Adjust image resolution based on your smallest target objects.  

Keep resolution high enough to preserve key details but avoid excessive size, as this increases prediction time and may reduce accuracy when the AI struggles with too much detail.

### Basic Prefilters

#### Color Enhancement

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/color_filter_1.png" alt="Object resolution view " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/color_filter_2.png" alt="Object resolution view" style={{ width: '18%' }} />
    </div>

Make objects stand out when they blend into similar backgrounds. Boost saturation, contrast, brightness, and hue to create clear visual separation. Add threshold filtering for sharp background removal while preserving critical object features.

#### Cropping

![Cropping](/img/ai/one_ai_plugin/smart_crop.png)

Eliminate visual clutter and zero in on your target areas. Focus on regions where objects consistently appear to cut background noise, sharpen detection accuracy, and accelerate training performance.

#### Frequency Filtering
Simplify images while preserving critical details.  
- **Highpass** - Removes background and just focuses on changes in the image  
- **Lowpass** - Smoothes textures and removes visual noise that confuses models  


    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/lowpass_img_1.png" alt="LowPass filter 1 " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/lowpass_img_2.png" alt="LowPass filter 2" style={{ width: '18%' }} />
    </div>

    

### Advanced Prefilter Options
- **Color Space Conversion** - Switch between HSV and RGB for optimal color processing  
- **Edge Sharpening** - Emphasizes object boundaries for clearer detection  
- **Threshold Processing** - Creates high-contrast black and white images for specific applications  
- **Dataset Normalization** - Rescales the image's brightness so that the darkest pixels become black and the brightest pixels become white
- **Channel Filtering** 
  
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/channel_filter_1.png" alt="Channel Filter 1 " style={{ width: '18%' }} />
        <img src="/img/ai/one_ai_plugin/channel_filter_2.png" alt="Channel Filter 2" style={{ width: '18%' }} />
    </div>

    Remove or isolate specific color channels (red, green, blue) when one introduces unwanted visual noise

---

## 6. Augmentations

Augmentations are applied during training with random values within specified ranges. Their purpose is to increase the diversity of the training data, helping the AI to generalize better. By varying the training data it is possible to increase the size of the dataset without the need to record or annotate additional data. Furthermore, it is possible to make the AI model more robust against certain variations in the data by intentionally reproducing these variations with augmentations.

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

<img src="/img/ai/one_ai_plugin/aug_resize.png" alt="Resize Augmentation" style={{ width: '40%' }} />

### Color Augmentation
Enhances object detection under varying lighting conditions by adjusting brightness, contrast, saturation and hue.

<img src="/img/ai/one_ai_plugin/aug_color.png" alt="Color Augmentation" style={{ width: '40%' }} />

### Frequency Augmentation
Use high- and lowpass filters to sharpen edges or blur your images.

<img src="/img/ai/one_ai_plugin/aug_frequency.png" alt="Frequency Augmentation" style={{ width: '40%' }} />

### Noise Augmentation
Add random noise to images to help the model become robust against real-world image imperfections.

<img src="/img/ai/one_ai_plugin/aug_noise.png" alt="Noise Augmentation" style={{ width: '40%' }} />


---

## 7. Model Settings

### Tune Model Complexity
Optimize your model according to your specific requirements

In Classification Mode:
- **Classification Type** - Select if all class types should be detected separately or if the image always has one class

In Annotation Mode:
- **Prediction Type** - Select if the size and position of objects or only the position should be detected

It is possible as well to annotate objects in the dataset and then only train to detect the classes in the image or the one class of the image. Compared to classification labels, this helps ONE AI to predict the right AI model and you can experiment with more detection types

- **X/Y Precision (%)** - Set the precision level for predicting coordinates  
- **Size Precision (%)** - Controls prediction of object sizes  
- **Prioritize Precision** - Adjust the model's balance between false positives and false negatives  
- **Minimum FPS** - Minimum predictions per second with selected hardware  
- **Maximum Memory Usage (%)** - Percentage of memory used for weights and calculations 

FPGA related:
- **Maximum Multiplier Usage (%)** - Limit the amout of DSP elements that are used of your FPGA
- **FPGA Clock Speed (MHz)** - Set the clock speed of you FPGA
  
    <img src="/img/ai/one_ai_plugin/model_settings.png" alt="Model Tune Settings" style={{ width: '70%' }} /> 
### Input Settings
- **Estimated Surrounding Min Width (%)** - Estimate the minimum width of the area required to detect the smallest object correctly
- **Estimated Surrounding Min Height (%)**  - Estimate the minimum height of the area required to detect the smallest object correctly
- **Estimated Surrounding Max Width (%)** -  Estimate the minimum width of the area required to detect the largest object correctly
- **Estimated Surrounding Max Height (%)**  - Estimate the minimum height of the area required to detect the largest object correctly
- **Same Class Difference** - Compare how different the objects in one class are
- **Background Difference** - Compare how different the backgrounds are in the images
- **Detect Simplicity (%)** - Estimate how easy it is to detect the object class

    <img src="/img/ai/one_ai_plugin/model_input_settings.png" alt="Model Input Settings" style={{ width: '70%' }} />

In Classification Mode:
- **Estimated Min Object Width (%)** - The width of the smallest object or area used for classification
- **Estimated Min Object Height (%)** - The height of the smallest object or area used for classification
- **Estimated Average Object Width (%)** - The width of the average object or area used for classification
- **Estimated Average Object Height (%)** - The height of the average object or area used for classification
- **Estimated Max Object Width (%)** - The width of the largest object or area used for classification
- **Estimated Max Object Height (%)** - The height of the largest object or area used for classification
- **Maximum Number of Features for Classification** - The maximum number of features used for classification
- **Average Number of Features for Classification** - The average number of features used for classification
---

## 8. Hardware Settings

Select or define hardware resources to create a model that is optimized for your hardware.

### Used Hardware
Choose the hardware that is used to run the AI model.

### Advanced Settings
- **Hardware Type** - Select the hardware type  
- **Prioritize Speed Optimization** - Enable this if your hardware, such as a microcontroller, has limited computational capabilities and benefits from a prioritization of speed over memory usage.
- **Compute Capability** - Specify the computational power of your hardware
- **Prioritize Memory Optimization** - Enable this if your hardware, such as an FPGA with limited internal RAM, requires efficient memory usage for higher accuracy with fewer model parameters.
- **Memory Limit** - Define the available memory  
- **Optimize for Parallel Execution** - Enable this option for FPGA/ASIC parallel architectures  
- **Quantized Calculations** - Enable quantization to boost performance. This can slightly reduce accuracy but significantly increases speed. For most applications, especially on microcontrollers, TPUs, FPGAs, or ASICs, quantization is highly recommended.
- **Bits per Value** - Set precision level for neural network calculations  

---

## 9. Training

> For these steps you need to be connected to the ONE AI Cloud

Ensure that your training data is uploaded, labeled, and properly prepared. This includes applying any necessary prefilters and selecting the most effective augmentations. Once your data is ready, double-check your model and hardware settings before starting the training process

### Create  

You can train different AI models for the same project, so you can test out different configurations.

<img src="/img/ai/one_ai_plugin/train.png" alt="Train" style={{ width: '100%' }} /> 

### Test  

You can test the AI with your test data.

<img src="/img/ai/one_ai_plugin/test.png" alt="Test" style={{ width: '100%' }} /> 

### Export  

#### Create Tool
Choose the tool format based on target hardware and application needs.
<img src="/img/ai/one_ai_plugin/export_tool.png" alt="Model Settings" style={{ width: '40%' }} /> 
