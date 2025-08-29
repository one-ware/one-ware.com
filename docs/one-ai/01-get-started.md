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

### 1.1. [Sign Up](https://cloud.one-ware.com/Account/Register)
To get access to our cloud infrastructure and AI model prediction, you need to create an account [here](https://cloud.one-ware.com/Account/Register) for the ONE AI cloud. This is free and your data is stored savely on our own servers in germany.
If you work with sensitive data, you can contact us via mail: sales@one-ware.com, so we can provide a local training service for your servers that ensures the data doesn't leave your company. In the ONE AI software, until you actually train the AI model, all data is stored locally on your PC. So you can still first create an account and test all settings until we can provide your local training service.

### 1.2. Verify Address to Get Free Credits
After you have access to the ONE AI cloud, you can get free credits worth 500 € after you verify your address [here](https://cloud.one-ware.com/Account/Manage/ChangeAddress) by just saving your billing address. You won't be changed with any fees. The address is only needed to check for trade restrictions and general company verification. It will take a bit for the verification (up to one business day), but you can continue with the next steps until you have your free credits for training.

### 1.3. [Download ONE WARE Studio](/docs/studio/setup)
Next you need our software locally on your PC, so you can experiment with your data safely and without a need for data upload. You can download it [here](/docs/studio/setup) for windows, linux and macOS.


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
Navigate to the **AI** tab and choose **Open AI Generator**.

![AI Generator Modal](/img/ai/one_ai_plugin/ai_generator_modal.png)

Enter your **AI Project Name** and choose the **AI Type**. 

**Note:** Currently, only “Image Detection” is available as the AI type.

---

## 4. Dataset Preparation - Build Your AI Foundation

Before you start training your model, you need to load and organize your image data. A clean and well-labeled dataset is the foundation for accurate AI performance.

### 4.1 Load Your Images
Access the **Dataset** tab in your ONE AI workspace to prepare your visual training data.

![Training Data View](/img/ai/one_ai_plugin/training_data_view.png)

- You can simply drag and drop your image files to import them.
- You can **Import Files** or **Import Folders** to load unlabeled image data directly from your device.  
- The **Import Dataset** feature can be used to load a labeled dataset.
- You can use the **Camera Tool** in the **AI** tab to capture images directly within ONE AI for real-time data collection.  
- You can use the **Spectrogram Generator** to convert audio or time series data to images.

#### Dataset Import
When you press the **Import Existing Dataset** button, the following window opens:

![Dataset Import](/img/ai/one_ai_plugin/dataset_import.png)

You need to select the directory to import as well as the format of your annotations. Currently, we support the formats YOLO, COCO and Pascal Voc as well as Classification datasets that contain one directory for each class.

#### Spectrogram Generator
![Spectrogram Generator](/img/ai/one_ai_plugin/spectrogram_generator.png)

The spectrogram generator supports converting audio or CSV files to spectrogram images. You can decide, whether the generated spectrograms are added to the train, test or validation dataset. Furthermore, you need to provide the sampling rate of your data.

### 4.2 Choose Labeling Mode
![Label Mode](/img/ai/one_ai_plugin/label_mode.png)
- **Classes:** Each image is assigned to one or more classes.  
- **Objects:** Individual objects are selected in the images by drawing boxes around them.  

### 4.3 Divide your Dataset

Dividing your data into separate subsets is crucial for building reliable AI models. Follow these steps to split your data effectively.

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
The test set provides a final performance evaluation after training. It is important to keep this set completely separate from training and validation data to get an objective evaluation. Providing labels is optional but highly recommended. Otherwise, you need to manually look through the predictions instead of getting a quantitative result.  
To get an accurate evaluation on how the model will perform for your application, it is important to ensure that the test data represents the real-world deployment conditions. This organized approach ensures your AI model will be robust, accurate, and ready for real-world deployment with ONE AI.

If you don't have a separate test dataset, you can use the images from the train or validation dataset to test your AI.
Because ONE AI only uses the validation dataset to stop the training when there is no more improvement and not for hyperparameter settings, the results should not be too far off, if you use the validation dataset for the final evaluation.

![Test Setting](/img/ai/one_ai_plugin/test_setting.png)

### 4.4 Add Your Labels
Open the **Labels** tab and create labels for each class you want to detect, e.g. "defect" or "strawberry". You can assign unique colors to make the annotation process faster and easier.

#### The two Label Types
- **Classification** - Assign classes to entire images.  
  *Example:* "defect" or "no defect" for quality control  

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/labeled_img_1.png" alt="Labeled Image 1" style={{ width: '48%' }} />
        <img src="/img/ai/one_ai_plugin/labeled_img_2.png" alt="Labeled Image 2" style={{ width: '48%' }} />
    </div>
- **Object Detection** - Mark specific objects by drawing bounding boxes. It is possible to annotate multiple objects and labels per image.  
  *Example:* individual boxes for "strawberry" or "foreign object"

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/yolo_img_1.png" alt="yolo Image 1" style={{ width: '48%' }} />
        <img src="/img/ai/one_ai_plugin/yolo_img_2.png" alt="yolo Image 2" style={{ width: '48%' }} />
    </div>

---

## 5. Prefilters - Optimize Your Dataset
You can add prefilters before or after applying augmentations to process your dataset and boost model performance.

![Prefilter View](/img/ai/one_ai_plugin/prefilter_view.png)

On the right, you can see the settings for the selected prefilter as well as a preview on how it will affect the image. The image on the bottom left shows a preview of your complete prefilter pipeline.

### The Steps in the Data Processing Pipeline
- **Begin:** The filters **Initial Resize** and **Resolution Filter** are used to bring all images to the same size and optionally scale them down.
- **Before Augmentation:** You can choose from a varied selection of filters that are applied before augmentation is applied to the images. Typical examples are the **Color Filter** for applying color correction or the **Crop Filter** for cropping the images to the relevant area.
- **Static Augmentations:** The augmentations are divided into two groups. The static augmentations are applied first and have a fixed order.
- **Dynamic Augmentations:** The order of the dynamic augmentations can be changed and you can even apply the same augmentation multiple times. 
- **After Augmentation:** You have the option to add additional filters that are applied after the images are augmented. For example, you could use a **Frequency Filter** to reduce noise or apply a **Threshold Filter** to convert your images to a binary representation.
- **End:** In the last step, you have the option to remove individual color channels with the **Channel Filter**.

### Image Resolution

#### Initial Resize
![Initial Resize](/img/ai/one_ai_plugin/initial_resize.png)

The **Initial Resize** filter resizes all images to the same size. You can decide between stretching images that have a different size or applying a black padding. You can set the size manually or use the button on the right of **Begin** to automatically select the size of the largest image.


#### Resolution Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/resolution_filter_50.png" alt="Resolution Filter" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/resolution_filter_10.png" alt="Resolution Filter" style={{ width: '30%' }} />
</div>

The **Resolution Filter** allows you to reduce the resolution of your images. This will reduce the prediction time and may even improve the accuracy if the AI struggles with unnecessary details. You need to keep the resolution large enough to preserve key details.

### Basic Prefilters

#### Crop Filter

![Crop Filter](/img/ai/one_ai_plugin/crop_filter.png)

You can use the **Crop Filter** to crop your images to the area of interest. For example, if your images show objects on a conveyor belt, you can use the crop filter to remove any surrounding areas that are also captured by the camera.

#### Frequency Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/low_pass_filter.png" alt="Low-pass Filter" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/high_pass_filter.png" alt="High-pass Filter" style={{ width: '30%' }} />
</div>

You can use the **Frequency Filter** to apply low-pass and high-pass filters.
- Low-pass filters allow low frequencies to pass while reducing high frequencies. This removes sharp edges and results in a blurred image.
- High-pass filters do the opposite. They remove areas of uniform color and can be used to highlight edges in images.

#### Sharpen Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/sharpen_filter_1.png" alt="Sharpen Filter before" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/sharpen_filter_2.png" alt="Sharpen Filter after" style={{ width: '30%' }} />
</div>

You can use the **Sharpen Filter** to increase the sharpness of the image and emphasize object edges for an easier detection.

#### Color Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/color_filter_1.png" alt="Color Filter" style={{ width: '30%', transform: 'scaleX(-1)' }} />
    <img src="/img/ai/one_ai_plugin/color_filter_2.png" alt="Color Filter" style={{ width: '30%' }} />
</div>

The **Color Filter** allows you to alter the brightness, contrast, saturation, hue and gamma of your images. You can use it for color correction or for creating a clearer visual separation between objects and background.

### Advanced Prefilter Options
#### Normalize Filter
This filter rescales the image's brightness so that the darkest pixels become black and the brightest pixels become white

#### Inverse Filter
This filter can be used to compute the inverse of images. For example, you can use it to convert black text on a white background to white text on a black background. This might be useful to you, since neural networks tend to be slightly better at detecting light objects on a dark background than the other way around.

#### RGB to HSV Filter
The **RGB to HSV Filter** converts the images from an RGB to an HSV representation. This can be used to apply further filters to the HSV representation before converting the image back to RGB. For example, you can use a **Threshold Filter** that is applied based on the hue value. This makes it possible to extract objects of a certain color from an image.

#### HSV ot RGB Filter
This is the counterpart to the **RGB to HSV Filter** and can be used to convert HSV images back to RGB.

#### Threshold Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/threshold_filter_1.png" alt="Threshold Filter" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/threshold_filter_2.png" alt="Threshold Filter" style={{ width: '30%' }} />
</div>

The **Threshold Filter** removes image areas based on a threshold. You can use this to remove background areas if they can be clearly separated from the objects.  
You have the option to apply the following operations:
- **Binary**: Pixels below the threshold are set to black and pixels above the threshold to white.
- **To Zero**: Pixels below the threshold are set to black.
- **To One**: Pixels below the threshold are set to white.
- **To Zero Inverted**: Pixels above the threshold are set to black.
- **To One Inverted**: Pixels above the threshold are set to white.

You can select the option to use two thresholds. This changes the operations in the following way:
- **Binary**: Pixels between the thresholds are set to white. Pixels below the first threshold or above the second threshold are set to black.
- **To Zero** and **To One**: The operation is applied to pixels below the first threshold or above the second threshold.
- **To Zero Inverted** and **To One Inverted**: The operation is applied to pixels between the thresholds.

It is possible to check whether the average of all channels is below the threshold or to only use a single channel for the decision. If you use a single channel, you can decide whether the operation is only applied to that channel or all channels. This combines nicely with the **RGB to HSV Filter**. You can convert your images to HSV and then only keep areas where the hue lies within a set value range.

#### Channel Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/channel_filter_1.png" alt="Channel Filter 1 " style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/channel_filter_2.png" alt="Channel Filter 2" style={{ width: '30%' }} />
</div>

The **Channel Filter** can be used to remove or isolate specific color channels. This can be used when one of the channels doesn't contain any useful information or contains too much noise.

---

## 6. Augmentations

Augmentations are applied during the training with random values within specified ranges. Their purpose is to increase the diversity of the training data, helping the AI to generalize better. By varying the training data, it is possible to increase the size of the dataset without the need to record or annotate additional data. Furthermore, it is possible to make the AI model more robust against certain variations in the data by intentionally reproducing these variations with augmentations.

### Move Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_move.png" alt="Move Augmentation" style={{ width: '40%' }} />

The **Move Augmentation** shifts the image along the X and Y axes within a specified range. This makes the model more robust against positional variability.

### Rotate Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_rotation.png" alt="Rotation Augmentation" style={{ width: '40%' }} />

The **Rotate Augmentation** randomly rotates your images. This helps the model to also recognize objects when they are rotated.

### Flip Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_flip.png" alt="Flip Augmentation" style={{ width: '40%' }} />

This augmentation can be used to randomly flips the images horizontally and vertically.

### Resize Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_resize.png" alt="Resize Augmentation" style={{ width: '40%' }} />

The **Resize Augmentation** scales the image up or down. This makes the model more robust against changes in the object size.

### Color Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_color.png" alt="Color Augmentation" style={{ width: '40%' }} />

This augmentation varies the image's brightness, contrast, saturation, hue and gamma values. It can be used to mimic varying lighting conditions.

### Frequency Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_frequency.png" alt="Frequency Augmentation" style={{ width: '40%' }} />

The **Frequency Augmentation** uses a low-pass filter to blur the images by a random amount. By using it, the model is trained to also make correct predictions when the image is slightly out of focus.

### Sharpen Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_sharpen.png" alt="Sharpen Augmentation" style={{ width: '40%' }} />

The **Sharpen Augmentation** randomly sharpens the images and has a similar effect as the **Frequency Augmentation**.

### Noise Augmentation
<img src="/img/ai/one_ai_plugin/augmentation_noise.png" alt="Noise Augmentation" style={{ width: '40%' }} />

This augmentation adds a random noise to the images to help the model become robust against real-world image imperfections.

---

## 7. Model Settings
The **Model Settings** tab allows you to tune the model generation to your specific needs. You can make further specifications on the parameters you want to predict, e.g. whether you want to predict an objects position and size or whether you only need its position. For achieving the best results, you also need to make some estimates about your task, like specifying the expected size of objects or the overall complexity of the task.  
For a more detailed explanation, you can follow [this guide](/docs/one-ai/choosing-parameters-guide) on how to set the right parameters.

### Output Settings
<img src="/img/ai/one_ai_plugin/model_settings_output.png" alt="Model Settings Output" style={{ width: '100%' }} /> 

#### For Classification Tasks
- **Classification Type**: You can select whether an image can have only one class or whether it can have multiple. Furthermore, you can choose to predict whether at least on class is present or not.

#### For Object Detection Tasks
- **Prediction Type**: You can choose from multiple different options what parameters your model needs to predict. If you need to predict fewer parameters, ONE AI is able to generate a simpler model that requires fewer computations.
    - **Size, Position and Class of Objects**: The model predicts the size, position and class for each detected object.
    - **Position and Class of Objects**: The model only predicts the position and class of detected objects. This setting is useful when you already know the size of the objects, e.g. because they are filmed on a conveyor belt and always have the same size.
    - **All Present Object-Classes**: The model only predicts whether different objects are present in the image but provides no further information. This option might be used for quality control to detect the presence of different types of defects.
    - **Class with Largest Combined Object Area**: The model predicts the object class that occupies the largest combined area within the image.
    - **Class with Most Objects**: The model predicts the object class that appears in the image the most.
    - **At Least One Object? (Y/N)**: The model predicts whether at least one object is present in the image or not.
- **X/Y Precision (%)**: You can set a precision level for the predicting object position. Choosing a lower precision increases the speed of the model and helps it to generalize better. By reducing the precision, you effectively reduce the resolution of its predictions. For example, if you set the X/Y precision to 25%, only every fourth pixel can be chosen as the position of a detected object.
- **Allow Overlap**: You can decide whether multiple objects that fall into the same grid cell are detected separately or merged together.
- **Size Precision (%)**: By setting the size precision, you can directly control the amount of computations that are spent on predicting the object's size. A higher precision improves the predictions but increases the computational load.
- **Prioritize Precision**: You can adjust the model's balance between false positives and false negatives. For example, if it is important for your use case to detect a defect in almost all cases and it's acceptable to have some false detections, you should lower this setting. If you want to have a balanced approach, you should set it to 50%.

#### Hardware Usage Settings
- **Minimum FPS**: The minimum predictions per second the model needs to perform with hardware selected in the **Hardware Settings** tab.
- **Maximum Memory Usage (%)**: You can limit the amount of memory that the predicted model will use.
- **Maximum Multiplier Usage (%)**: You can also limit the amount of DSP elements that the predicted model can use. If you aren't using an FPGA this setting is ignored.
- **FPGA Clock Speed (MHz)**: If you are using an FPGA, you need to provide its clock speed. Otherwise, this setting is ignored.
  
### Input Settings
To achieve the best results, you need to provide some additional information about your task. ONE AI will use this information to tailor the generated model to your individual use case.

<img src="/img/ai/one_ai_plugin/model_settings_input_1.png" alt="Model Settings Input" style={{ width: '100%' }} />

- **Estimated Surrounding Min Width (%)**: For this setting, you need to estimate the width of the area that the model needs to analyze to detect the smallest objects in your dataset. For classification tasks, this setting describes the width of the smallest area that the model needs to analyze to make the correct decision.
- **Estimated Surrounding Min Height (%)**: Estimate the height of the area required to detect the smallest objects.
- **Estimated Surrounding Max Width (%)**: Estimate the width of the area required to detect the largest objects.
- **Estimated Surrounding Max Height (%)**: Estimate the height of the area required to detect the largest objects.
- **Same Class Difference**: For this setting, you need to estimate how different the objects in one class are.
- **Background Difference**: Estimate how much the backgrounds vary in the images.
- **Detect Simplicity (%)**: Give an estimate for your task's overall difficulty.

#### For Classification Tasks
If you are training a classification model, you need to provide some additional information:

<img src="/img/ai/one_ai_plugin/model_settings_input_2.png" alt="Model Settings Input" style={{ width: '100%' }} />

- **Estimated Min Object Width (%)**: Estimate the width of the smallest area that the model needs to analyze to make the correct decision.
- **Estimated Min Object Height (%)**: Estimate the height of the smallest area relevant for the classification.
- **Estimated Average Object Width (%)**: Estimate the width of the average area relevant for the classification.
- **Estimated Average Object Height (%)**: Estimate the height of the average area relevant for the classification.
- **Estimated Max Object Width (%)**: Estimate the width of the largest area relevant for the classification.
- **Estimated Max Object Height (%)**: Estimate the height of the largest area relevant for the classification.
- **Maximum Number of Features for Classification**: This setting describes the maximum number of image features that may be relevant for a classification task.
- **Average Number of Features for Classification**: The average number of relevant features used for the classification.
- **Groups** (also available for object detection tasks): This setting is intended for advanced users. We recommend leaving all classes in one group unless you know what you are doing. By splitting the classes into multiple groups, you can divide your task onto multiple sub-models. ONE AI will generate an individual sub-model for each group that only predicts the classes that belong to that group. The sub-models are then joined to create a single unified model. This approach is practical if you have objects with significantly different sizes, e.g. long scratches and small nicks. By dividing the task onto sub-models, one model can focus on the large defects while the other focuses on the tiny defects.

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
