---
id: handwritten-digits-demo
title: Handwritten Digit Classification Demo
sidebar_label: Demo - Handwritten Digits
---
# Handwritten Digit Classification Demo

## About this Demo
This demo showcases the usage of OneWare Studio and the OneAI Extension for a demo case. If you are unfamiliar with the OneAI Extension, we recommend to first take a look at our guide [Getting Started with One AI for Object Detection](/docs/one-ai/01-get-started.md). We also recommend to read the [Potato Chip Classification Demo](/docs/one-ai/02-potato-chip-demo.md), since it goes into more detail than this demo.

## Dataset Overview
The dataset for this demo can be downloaded [here](https://github.com/one-ware/OneAI_demo_datasets/blob/main/nist_sd19_subset.zip). It is a subset of the [NIST Special Database 19](https://www.nist.gov/srd/nist-special-database-19) and contains images of handwritten digits. The training set contains 3000 images - 300 for each digit - while the test set contains 500 images.

The goal of this demo is to create an AI model that is able to recognize handwritten digits and return the correct class for an image. If you have a webcam available, you will be able to test the model with live data from that camera by drawing numbers on a piece of paper.

Here are a few examples from the dataset:

![nist_sd19_examples](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_examples.jpg)

## Setting up the Project
The setup process is similar to the [Potato Chip Demo](/docs/one-ai/02-potato-chip-demo.md#setting-up-the-project-and-loading-the-data). First, we create a new project and a new AI Generator. Then we open the project folder in a file manager to copy the train and test data. Like before, we change the **Mode** to **Classification** and use an auto-generated validation split. Because our dataset contains a separate test set, we set both **Train Image Percentage** and **Validation Image Percentage** to **0%**.

Since we want to run the model in OneWare Studio later on, we need to assign names to the labels. Otherwise, every prediction will just show *"Undefined Label"*. To do so, we go to the **Labels** tab, right click the label we want to rename and click on **Rename**. The annotated IDs match the numbers visible in the image. The exception is the number zero, which has the ID 10 since the ID 0 is reserved for the background.

We can verify that everything was set up correctly by checking the annotations of our train and test images.

![loaded_dataset](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_loaded_dataset.jpg)

## Filters and Augmentations
The next step is to select the filters and augmentations we want to use. Since the size of the images is only 128x128, we don't require a **Resize Filter**. Instead, we apply two other filters to help our model to classify the images. First, we use an **Invert Filter** that is applied before we augment the images. This filter converts the black number on a white background to a white number on black background. Some of the augmentations, like the **Rotate Augmentation**, pad missing areas with black pixels, so by using the **Invert Filter** the background matches the padded areas.

In the **After Augmentation** section we add a **Threshold Filter**. We leave the settings at their default values to create a **Binary** image based on the **Average** of all channels. This means that the resulting image contains only the values 0 and 255, which simplifies the classification task for our model. Furthermore, this step filters out noise and lighting variations. To achieve good results on new camera images, we increase the **Threshold** to **170**.

TODO: add an image of the filters

In addition to those filters, we use the following augmentations:
- **Move Augmentation**: We set the amount of shift to **±20%** in both directions to increase the model's robustness against variations in the position of the numbers.
- **Rotate Augmentation**: Since numbers have a clearly defined up direction, we need a lot less rotation than in the potato chip demo. We still want to have some robustness against rotations, so we set the **rotation** range to **±20°**.
- **Flip Augmentation**: We **turn off the flip augmentation**, since we aren't going to encounter mirrored numbers in our application.
- **Resize Augmentation**: Since the goal of this demo is to run the model on a webcam, our model needs to be quite robust against size variations. This is especially true for numbers that are smaller than in the training data, because the numbers in the webcam images are likely to be smaller as well. We thus set the size augmentation from **50% to 125%** in both dimensions.
- **Color Augmentation**: To make the model more robust against lighting variations, we add a color augmentation. We set the **brightness** to **(-10, 10)**, the **contrast** to **(90, 110)** and leave the **saturation** and **hue** at their **default values**.
- **Frequency Augmentation**: We add a frequency augmentation, to simulate images that are out of focus. Thus, we only use a **Low Pass Filter** and set its **sigma** values to **(0, 1)**.
- **Noise Augmentation**: Finally, we add a noise augmentation to increase the robustness against camera noise. This is especially useful for this dataset, because it adds some variation to the otherwise smooth background. We set the values to **(5, 15)**.

![augmentations](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_augmentations.jpg)

## Model Settings
After having set up the data processing pipeline, we configure the model settings. First, we need to specify the **Classification Type**. We want to predict one of the numbers for each image so we set it to **One Class per Image**. For the later tests with the webcam, it would be nice if we were able to detect multiple numbers in the same image, but since the training data doesn't contain any images with more than one number, our model won't be able to make these kind of predictions. We set the **Minimum FPS** to **20** and the **Maximum Memory Usage** as well as the **Maximum Multiplier Usage** to **90%**. The **FPGA Clock Speed** is left at **50 MHz**, since we are going to create a model for the Altera™ Max® 10 16K.

Next, we provide some additional information on the characteristics of the input data. First, we estimate the area that the model needs to analyze to make a decision for the smallest and the largest numbers. We set the surrounding area to **(25, 25)** for small objects and to **(90, 90)** for large objects.

Then, we estimate the variance of numbers from the same class. We observe quite a few differences in writing styles like the size, the angle or the line width, so we set the **Same Class Difference** to **40%**. The next setting describes the variation of background. There is no variation in the original background but since we added noise, we set the **Background Difference** to **5%**. We set the **Detect Simplicity** to **90%**, because the task isn't that complicated. Next, we need to specify the estimated sizes for small, average and large objects. We set those to **(25, 25)**, **(50, 50)** and **(90, 90)**. Finally we need to tell OneAI how many image features are relevant for the classification. We set **Average Number of Features for Classification** to **2** and **Maximum Number of Features for Classification** to **4**.

## Training the Model
Now, it's time to set up the training configuration for the model. In the **Hardware Settings** tab we select the **Altera™ Max® 10 16K** as the **Used Hardware**.

In the **Training** tab we need to click on **Sync** to synchronize our data and existing model trainings with the ONE WARE servers. After that, we create a new training configuration. For this demo, a **training time** of **10 minutes** is sufficient to fully train the model. We leave the **patience** at the default value of **30%**. Since we want to export the model to an FPGA, we **Enable Quantization Optimization** to increase its performance.

Finally, we click on the **Train** button in the top-right corner to start the training. You can monitor the training progress in the **Logs** and **Statistics** tabs.

## Model Export
After the training is completed, we need to export our model. We configured our model to run on a Altera™ Cyclon® V 25K, but for now we are content with testing its capabilities on a computer. To use the model inside of OneWare Studio's camera tool, we need to export it as an ONNX model. To do so, we click on the **Export** button, which opens a new window with configurations. In the **Export type** drop-down menu, we select ONNX since that is the format we need.

Next we can activate different settings, that change how are model is exported. If we check the **Export with pre- and postprocessing** checkbox, ONE AI will build all of our filters directly into the model. We need a model that contains our filters, so we activate the check box. The next setting allows us to change between exporting a floating point or quantized model. Unfortunately, there is no quantization support for ONNX model export yet, so we will receive a floating point model whether we check the box or not. Since models that run on FPGAs typically use a different format, this isn't a problem in most use cases.

The last check box allows us to select whether we want to export the last or the best model. Since the models performance can go up and down during the training, the last model might not always be the best performing one. We activate this setting to compare the model with the last model with the model with the lowest loss to export the model with the best performance (TODO: verify). In the drop-down menu, we can select the metric we want to use to determine the best model. Both accuracy and F1-Score make sense and are commonly used to evaluate classification models.

TODO: image

## Testing the Model
Now it's time to test our trained model. To do so, we go back to the **Dataset** tab. In the top-right corner, we open the **Camera Tool**. Select your camera in the drop-down menu, then click on the plus icon to add it. We recommend turning on **Auto Exposure** by clicking onto the gear icon and scrolling down until you reach the corresponding check box.

To test our model, we switch to the **Run Model** tab. In the drop-down menu in the top-left corner, we can select our trained model. Afterwards we click on the play-button below to run the model. You'll get the best results if you write your numbers on a white piece of paper without any markings and use a black pen with a thick line width.