---
id: handwritten-digits-demo
title: Handwritten Digit Classification Demo
sidebar_label: Simple Image Classification (Digits)
---
# Handwritten Digit Classification Demo

## About this demo
This demo showcases the usage of OneWare Studio and the OneAI Extension for a demo case. If you are unfamiliar with the OneAI Extension, we recommend to first take a look at our guide [Getting Started with One AI](/docs/one-ai/01-getting-started/01-getting-started.md). We also recommend to read the [Potato Chip Classification Demo](/docs/one-ai/tutorials/potato-chip-demo), since it goes into more detail than this demo.

## Dataset overview
The dataset for this demo can be downloaded [here](https://github.com/one-ware/OneAI_demo_datasets/blob/main/datasets/nist_sd19_subset_sorted.zip) or you can download the complete project [here](https://github.com/one-ware/OneAI_demo_datasets/blob/main/projects/NIST_SD19.zip). It is a subset of the [NIST Special Database 19](https://www.nist.gov/srd/nist-special-database-19) and contains images of handwritten digits. The training set contains 3000 images, 300 for each digit, while the test set contains 500 images.

Here are a few examples from the dataset:

![nist_sd19_examples](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_examples.jpg)

The goal of this demo is to create an AI model that is able to recognize handwritten digits. At the end of this demo, you will be able to test the model with live data from your webcam with your own handwritten numbers. We also provide a [reference model](https://github.com/one-ware/OneAI_demo_datasets/blob/main/models/nist_sd19_sorted/onnx/nist_sd19_sorted.onnx) that you can use if you don't want to train your own model.

During this demo, we will pretend that we want to train a model for an Altera™ Max® 10 16K FPGA to show the workflow and abilities of ONE AI, although the webcam demonstration will run on the CPU of your computer.

## Setting up the project
When you are following this tutorial you can either import the provided dataset and set all the configurations yourself or you can use the provided project folder that already has all the settings configured.

### Using the project folder
To use the preconfigured project, you first need to [download](https://github.com/one-ware/OneAI_demo_datasets/blob/main/projects/NIST_SD19.zip) and unzip it. Because we are discussing how the dataset influences the trained model later in this guide, the project contains two different datasets. You can either use ``Dataset_sorted``, which is used in the next part of the tutorial, or you can use ``Dataset_shuffled``, which yields slightly better results and is discussed in the section [Room for improvement](#room-for-improvement). You need to rename the dataset folder that you choose to ``Dataset``. Afterwards, you can open the project by clicking on **File** > **Open** > **Folder**.

### Importing the dataset
The setup process is similar to the [Potato Chip Demo](/docs/one-ai/tutorials/potato-chip-demo#setting-up-the-project-and-loading-the-data). First, we create a new AI Generator. Then, we use the dataset import to load the dataset. Since we are working on a classification problem, we set the format for the import to **Classification** and the annotation **Mode** to **Classes**. Like before, we use an auto-generated validation split, which is enabled by default. Because our dataset contains a separate test set, we set both **Train Image Percentage** and **Validation Image Percentage** to **0%**.

We can verify that everything was loaded correctly by checking the annotations of our train and test images.

![loaded_dataset](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_loaded_dataset.png)

## Hardware settings
Next, we need to select the hardware for which we want to create the model. ONE AI needs the hardware specifications to build a model that is optimized for your hardware and runs within the constraints that were specified in the **Model Settings**. You can use preconfigured hardware settings or specify custom hardware parameters.

For this demo we are going to use an Altera™ Max® 10 16K. Support for the Altera™ Max® 10 isn't included in the base installation of the OneAI Extension, but can be installed in the **Extension Manager**. Click on **Extras** > **Extensions** to open the **Extension Manager**, then go to the section **Hardware** > **OneAI Support**. Here, you need to install the extension **OneAI Altera MAX10 Support**.

![MAX10 extension](/img/ai/one_ai_plugin/demos/potato_chip/max_10_extension.png)

Afterwards the Altera™ Max® 10 16K can be selected in the **Hardware configuration dialog**.

![hardware configuration dialog](/img/ai/one_ai_plugin/demos/potato_chip/hardware_settings.png)

## Filters and augmentations
The next step is to select the filters and augmentations that we want to use. All images have the same size, so we don't need to change the settings of the **Initial Resize** and since the size of the images is only 128x128, we don't need to reduce it with the **Resolution Filter**. Instead, we apply a few other filters that will help our model with classifying the images. First, we use an **Inverse Filter** that is applied before we augment the images. This filter converts the black numbers on a white background to white numbers on a black background. Some of the augmentations, like the **Rotate Augmentation**, fill missing areas with black pixels, so by using the **Inverse Filter**, the background matches the padded areas.

In the **After Augmentation** section, we add a **Normalize Filter**. This will rescale the brightness values of the image and thus increase the robustness against lighting variations. Remember to activate the check box in the filter list as well as the box in the filter itself.  
Next, we add a **Threshold Filter**. To achieve good results on new camera images, we increase the **Threshold** to **160**. The other settings are left at their default values to create a **Binary** image based on the **Average** of all channels. This means that the resulting image contains only the values 0 and 255, which simplifies the classification task for our model. Additionally, this step filters out noise and lighting variations. Since the **Threshold Filter** reduces the images to two grayscale values, we don't need three color channels. We can remove the unnecessary channels by activating the **Channel Filter** in the **End** section and **disabling any two channel**.

![filters](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_filters.jpg)

In addition to those filters, we use the following augmentations:
- **Move Augmentation**: We set the amount of shift to **±20%** in both directions to increase the model's robustness against variations in the position of the numbers.
- **Rotate Augmentation**: Since numbers have a clearly defined up direction, we need a lot less rotation than in the potato chip demo. We still want to have some robustness against rotations, so we set the **Rotation** range to **±20°**.
- **Flip Augmentation**: We **turn off the flip augmentation**, since we aren't going to encounter mirrored numbers in our application.
- **Resize Augmentation**: Since the goal of this demo is to run the model on a webcam, our model needs to be quite robust against size variations. This is especially true for numbers that are smaller than those in the training data, because the numbers in the webcam images are likely to be smaller as well. We thus set the size augmentation from **40% to 125%** in both dimensions.
- **Color Augmentation**: To make the model more robust against lighting variations, we add a color augmentation. We set the **Brightness** to **(-30, 30)**, the **Contrast** to **(80, 120)** and leave the **Saturation**, **Hue** and **Gamma** at their **default values**.
- **Frequency Augmentation**: We add a frequency augmentation, to simulate images that are out of focus. The **Sigma** values are set to **(0, 1.5)**.
- **Noise Augmentation**: Finally, we add a noise augmentation to increase the robustness against camera noise. This is especially useful for this dataset, because it adds some variation to the otherwise smooth background. We set the values to **(0, 10)**.

![augmentations](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_augmentations.jpg)

You might wonder that some of our filters undo the effects of our augmentations. Specifically the **Normalize Filter** and the **Threshold Filter**, which will remove most if not all of the changes from the **Color Augmentation** as well as the **Noise Augmentation**. This behavior is intended. We use the augmentations to simulate variations in real life data that might not have been captured by our training data. We use filters to remove those variations that our model might encounter to increase its robustness. By using both augmentations as well as filters that counteract them, we ensure that our data pipeline is configured correctly and works in real life situations. Otherwise, we might realize during deployment that the threshold we set in the **Threshold Filter** removes too much or too little under different lighting conditions and ruins the model's performance.

## Model settings
After having set up the data processing pipeline, we configure the model settings. First, we need to specify the **Classification Type**. We want to predict one of the numbers for each image, so we set it to **One Class per Image**. For the tests with the webcam, it would be nice if we were able to detect multiple numbers in the same image, but since the training data doesn't contain any images with more than one number, our model won't be able to make these kind of predictions. We set the **Minimum FPS** to **60** and the **Maximum Memory Usage** as well as the **Maximum Multiplier Usage** to **90%**. The **FPGA Clock Speed** is left at **50 MHz**, since we are going to create a model for the Altera™ Max® 10 16K.

Next, we provide some additional information on the characteristics of the input data. First, we estimate the area that the model needs to analyze to make a decision for the smallest and the largest numbers. We set the surrounding area to **(25, 25)** for small objects and to **(70, 70)** for large objects.

Then, we estimate the variance of numbers from the same class. We observe quite a few differences in writing styles like the size, the angle or the line width, so we set the **Same Class Difference** to **40%**. The next setting describes the variation of the background. As there is no variation in the white background, we set the **Background Difference** to **0%**. We set the **Detect Simplicity** to **90%**, because the task isn't that complicated. Next, we need to specify the estimated sizes for small, average and large objects. We set those to **(25, 25)**, **(40, 40)** and **(70, 70)**. Finally we need to tell ONE AI how many image features are relevant for the classification. We set **Maximum Number of Features for Classification** to **4** and **Average Number of Features for Classification** to **2**.

The last model setting is the option to organize the classes into **Groups**. This is an advanced setting that isn't necessary for this task, so we leave it at the default. We recommend leaving all classes in the same group unless you are certain that your task benefits from splitting the model into multiple sub-models.

## Training the model
Now, it's time to set up the training configuration for the model. In the **Training** tab we need to click on **Sync** to synchronize our data and existing model trainings with the ONE WARE servers. After that, we create a new model and click on **Train**. For this demo, a **Training Time** of **20 minutes** is required for the model to fully converge. We leave the **patience** at the default value of **100%**. Since we want to export the model to an FPGA, we **Enable Quantization Optimization** to increase its performance. Using quantization is required for most FPGAs and also for some microcontrollers. We set the **Percentage** to **30%**, which achieves a good trade off between training time and model performance. If we want the best performing model, we need to set it to **100%**, but this will increase the training time. For models that will be exported as floating point models it is best to turn off quantization. This is especially true if you want to export an ONNX model, because they don't support quantization. The option **Focus on Images with Objects** is only relevant for object detection tasks, so we leave the box unchecked. The option **Continue Training** can be used to continue the training of a model that has already been trained. If it is unchecked, the existing model will be overwritten. Since we don't have any prior model, this setting is ignored by ONE AI.

![training settings](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_training_settings.png)

If you don't want to train for that long, you can reduce the **Training Time** to **2 minutes** and **turn off** **Quantization Optimization**. This won't be enough time for the model to converge, but it will be trained sufficiently to produce good results in the live demo in the later part of this guide. Since the model wasn't trained to convergence, it will be less certain and might make more mistakes than otherwise. You might also observe the prediction flickering back and forth between two likely classes.

Finally, we click on **Start Training**. You can monitor the training progress in the **Logs** and **Statistics** tabs.

## Model export
After the training is completed, we need to export our model. We configured our model to run on an Altera™ Max® 10 16K, but for now we are content with testing its capabilities on a computer. To use the model inside of OneWare Studio's camera tool, we need to export it as an ONNX model. To do so, we click on the **Export** button, which opens a new window with configurations. In the **Export type** drop-down menu, we select ONNX since that is the format we need.

Next we can activate different settings, that change how our model is exported. If we check the **Export with pre- and postprocessing** checkbox, ONE AI will build all of our filters directly into the model. We activate this setting, because the filter pipeline is an important part of our model. The next setting allows us to change between exporting a floating point or quantized model. At the moment, the ONNX model export supports only floating point models, so we will receive a floating point model whether we check the box or not.

The last check box allows us to select whether we want to export the last or the best model. This setting is only relevant for object detection tasks, so we can deactivate it.

![model_export](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_export.jpg)

After the export is finished, we can download the exported ONNX model by clicking on the green arrow. This will save the model in the folder ``[ai_generator_name]/Models``. It will automatically be available in the **Camera Tool**, which we will use for testing in the next section. You can also download a trained model [here](https://github.com/one-ware/OneAI_demo_datasets/blob/main/models/nist_sd19_sorted/onnx/nist_sd19_sorted.onnx). To use this model, right click on your project folder in OneWare Studio, select **Open in File Manager** and insert the model into the folder ``[ai_generator_name]/Models``. You might need to restart OneWare Studio for the model to show up in the **Camera Tool**.

![model_download](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_download.jpg)

## Testing the model
Now it's time to test our trained model. To do so, we click on **AI** in the menu bar and then **Camera Tool**. Select your camera in the drop-down menu, then click on the plus icon to add it. Next, we need to change the camera's resolution by clicking on the gear icon and setting the **Width** and **Height** to **128** to match the resolution of our images. Afterwards, you need to press the **Restart Camera** button to apply the changes. It might happen that your camera doesn't support this specific resolution. You can check this by looking at the **Supported Size** field directly above the **Restart Camera Button**. If it doesn't show **128 x 128** you need to add a crop to the camera image. You can enter the position and size of the crop at the bottom of the settings. You can tune the position by dragging the crop that is shown in the preview. You can also draw the crop directly onto the camera preview but it is a lot harder to select a crop that is exactly **128 x 128** this way.

We can improve the classification accuracy by going to the camera settings and turning the **Brightness** and **Contrast** to their maximum. This results in the paper showing up in a bright white with a deep black number. For some cameras it is important to turn on **Auto Exposure** further down in the settings, because the image would be underexposed otherwise.

![camera_settings](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_camera_settings.jpg)

To test our model, we switch to the **Live Preview** tab. We can select our trained model in the drop-down menu in the top-left corner and the camera in th top-right corner. We also need to set the **Preview Mode** to **Classification**. Afterwards we click on the play-button on the top-left of the image to run the model. The predicted class will be shown on the bottom-right. You'll get the best results if you write your numbers on a white piece of paper without any markings and use a black pen with a thick line width.

![model_prediction](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_prediction.jpg)

## Room for improvement

You might have noticed that the model has trouble to classify some of the numbers you presented to the camera. It might be that you wrote your number in an european style, while the dataset only contains numbers that are written in an american style. There are differences for the numbers one, seven and nine. The european version of the number one consists of two lines while the american version contains only a single line and the european seven typically has a horizontal line that is missing in the american seven. The difference between the two versions of the number nine is a bit more subtle. Europeans usually add a curved hook at the bottom of the number while americans draw a straight line.

![number_style](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_american_vs_european.png)

Even though these differences might seem trivial to us, the model is struggling with them. For our model, this effect is especially strong with the number nine. It is often mistaken for the numbers three or five, because those numbers have a curve at the bottom that is similar to the bottom of the european nine.

This observation shows the importance of collecting a dataset with many variations. If an important feature doesn't occur in the training data, the model won't know what to do with it, which typically results in low quality predictions. This is also the reason why we use augmentations. By introducing variation into the training data, the model becomes more robust against these types of variation.

You might recall that the dataset we provided to you is a small subset of the full NIST Special Database 19. When we selected the training images, we took the first 300 images for each digit. Because the dataset is sorted, we only selected numbers from a small subset of people resulting in small variance in our data. We created a second dataset, which contains randomly selected samples. You can download the dataset [here](https://github.com/one-ware/OneAI_demo_datasets/blob/main/datasets/nist_sd19_subset_random.zip) as well as a trained model [here](https://github.com/one-ware/OneAI_demo_datasets/blob/main/models/nist_sd19_random/onnx/nist_sd19_random.onnx). When you look at the images, you'll see that they feature a much higher variance in writing styles. You'll also notice that the new model is better at detecting the number nine and is more robust in general.

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Tutorial Support" />