---
id: dataset
title: Handling your Dataset
sidebar_label: Handling your Dataset
---

Before you start training your model, you need to load and organize your image data. A clean and well-labeled dataset is the foundation for accurate AI performance.

## 1. Load Your Images
Access the **Dataset** tab in your ONE AI workspace to prepare your visual training data.

![Training Data View](/img/ai/one_ai_plugin/getting_started/training_data_view.png)

- You can simply drag and drop your image files to import them.
- You can ``Import Files`` or ``Import Folders`` to load unlabeled image data directly from your device.  
- The ``Import Dataset`` feature can be used to load a labeled dataset.
- You can use the ``Camera Tool`` in the ``AI`` tab to capture images directly within ONE AI for real-time data collection.  
- You can use the ``Spectrogram Generator`` to convert audio or time series data to images.

### 1.1 Dataset Import
When you press the ``Import Existing Dataset`` button, the following window opens:

![Dataset Import](/img/ai/one_ai_plugin/getting_started/dataset_import.png)

You need to select the directory to import as well as the format of your annotations. Currently, we support the formats YOLO, COCO and Pascal Voc as well as Classification datasets that contain one directory for each class.

If you want to try ONE AI but don't have a dataset, you can check out our examples:
1. [A quality control of potato chips](/docs/one-ai/tutorials/potato-chip-demo)
2. [A detection of handwritten digits](/docs/one-ai/tutorials/handwritten-digits-demo)
3. [An object detection of dice](/docs/one-ai/tutorials/dice-demo)

### 1.2 Camera Tool
You can use OneWare Studio's integrated ``Camera Tool`` to record images for your dataset. The camera tool allows you to configure camera settings and record images from multiple cameras simultaneously.

![Camera Tool Selection](/img/ai/one_ai_plugin/getting_started/camera_tool_selection.png)

When you start the camera tool, you first need to add the cameras to your workspace. Select the camera that you want to use in the dropdown menu and click on the plus icon. You can use the play icon on the bottom of the camera window to start and stop the live preview. By clicking on the gear icon, you can enter the camera configuration menu.

![Camera Tool Configuration](/img/ai/one_ai_plugin/getting_started/camera_tool_configuration.png)

The camera configuration menu allows you to customize your camera settings. You can create different presets that can be exported and imported. You are also able to crop the image. You can draw the area you are interested in onto the preview or set its coordinates at the bottom of the settings list.  
For our example, we increased the the camera's brightness and contrast. This brightens the white background and makes it easier for the AI model to recognize the numbers. We also added a crop to select a square region from the rectangular camera image.

![Camera Tool Capture](/img/ai/one_ai_plugin/getting_started/camera_tool_capture.png)

To record images, we need to go to the ``Capture`` tab. You can record images by clicking on the camera icon, which updates the preview. This records an image from all cameras simultaneously. You need to select the directory where you want to add them and click on the save icon to save them. The images are automatically named with the timestamp they were captured at, so you don't need to enter names manually.

### 1.3 Spectrogram Generator
![Spectrogram Generator](/img/ai/one_ai_plugin/getting_started/spectrogram_generator.png)

The spectrogram generator supports converting audio or CSV files to spectrogram images. You can decide, whether the generated spectrograms are added to the train, test or validation dataset. Furthermore, you need to provide the sampling rate of your data.

## 2. Choose Labeling Mode
![Label Mode](/img/ai/one_ai_plugin/getting_started/label_mode.png)
- ``Classes``: Each image is assigned to one or more classes.  
- ``Objects``: Individual objects are selected in the images by drawing boxes around them.  

## 3. Divide Your Dataset

Dividing your data into separate subsets is crucial for building reliable AI models. Follow these steps to split your data effectively.

### 3.1 Training Set
The training set teaches your AI what to recognize - it's your model's foundation.  
Use about **70%** of your total dataset with properly labeled images. Ideally it should include at least **50 images per class**. More variety means better real-world performance.

### 3.2 Validation Set
The validation set monitors your model's performance on unseen data during training.  
This evaluates performance without direct training involvement. Labels are required for the validation set as well to monitor the AI performance on unseen data while training.

![Validation Set Settings](/img/ai/one_ai_plugin/getting_started/validation_set_settings.png)

``Using Validation Split``: If you don't have separate validation images, you can enable ``Use Validation Split`` to auto-divide your training set:
- 20% for standard datasets  
- 30% for small datasets  
- 10% for large datasets  

### 3.3 Test Set
The test set provides a final performance evaluation after training. It is important to keep this set completely separate from training and validation data to get an objective evaluation. Providing labels is optional but highly recommended. Otherwise, you need to manually look through the predictions instead of getting a quantitative result.  
To get an accurate evaluation on how the model will perform for your application, it is important to ensure that the test data represents the real-world deployment conditions. This organized approach ensures your AI model will be robust, accurate, and ready for real-world deployment with ONE AI.

If you don't have a separate test dataset, you can use the images from the train or validation dataset to test your AI.
Because ONE AI only uses the validation dataset to stop the training when there is no more improvement and not for hyperparameter settings, the results should not be too far off, if you use the validation dataset for the final evaluation.

![Test Set Settings](/img/ai/one_ai_plugin/getting_started/test_set_settings.png)

## 4 Add Your Labels
Open the ``Labels`` tab and create labels for each class you want to detect, e.g. "defect" or "strawberry". You can assign unique colors to make the annotation process faster and easier.

### 4.1 The two Label Modes
- ``Classes``: Assign classes to entire images.  
  *Example:* "defective" or "non-defective" for quality control  

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/getting_started/annotation_tool_classes_1.png" alt="Annotation Tool Classes 1" style={{ width: '48%' }} />
        <img src="/img/ai/one_ai_plugin/getting_started/annotation_tool_classes_2.png" alt="Annotation Tool Classes 2" style={{ width: '48%' }} />
    </div>
- ``Objects``: Mark specific objects by drawing bounding boxes. It is possible to annotate multiple objects and labels per image.  
  *Example:* individual boxes for "Strawberry" or "Foreign Object"

    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <img src="/img/ai/one_ai_plugin/getting_started/annotation_tool_objects_1.png" alt="Annotation Tool Objects 1" style={{ width: '48%' }} />
        <img src="/img/ai/one_ai_plugin/getting_started/annotation_tool_objects_2.png" alt="Annotation Tool Objects 2" style={{ width: '48%' }} />
    </div>