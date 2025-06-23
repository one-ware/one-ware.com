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

The goal of this demo is to create an AI model that is able to recognize handwritten digits and return the correct class for an image.

Here are a few examples from the dataset:

![nist_sd19_examples](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_examples.jpg)

## Setting up the Project
The setup process is similar to the [Potato Chip Demo](/docs/one-ai/02-potato-chip-demo.md#setting-up-the-project-and-loading-the-data). First, we create a new project and a new AI Generator. Then we open the project folder in a file manager to copy the train and test data. Like before, we change the **Mode** to **Classification** and use an auto-generated validation split. Because our dataset contains a separate test set, we set both **Train Image Percentage** and **Validation Image Percentage** to **0%**.

We can verify that everything was set up correctly by checking the annotations of our train and test images. It is expected that the labels are named *"Undefined Label"*, since we never specified a name. We can do so in the **Labels** tab or when viewing a annotation but that isn't necessary.

![loaded_dataset](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_loaded_dataset.jpg)

## Filters and Augmentations
The next step is to select the filters and augmentations we want to use. Since the size of the images is only 128x128, we don't require a **Resize Filter**. Instead we use the following augmentations:
- **Move Augmentation**: We set the amount of shift to **±20%** in both directions to increase the model's robustness against variations in the position of the numbers.
- **Rotate Augmentation**: Since numbers have a clearly defined up direction, we need a lot less rotation than in the potato chip demo. We still want to have some robustness against rotations, so we set the **rotation** range to **±20°**.
- **Flip Augmentation**: We **turn off the flip augmentation**, since we aren't going to encounter mirrored numbers in our application.
- **Resize Augmentation**: We set the size augmentation from **25% to 125%** in both dimensions. We choose a lower value that is quite small, because it is useful if the model can detect smaller numbers that don't cover the whole image as well.
- **Color Augmentation**: To make the model more robust against lighting variations, we add a color augmentation. We set the **brightness** to **(-40, 40)**, the **contrast** to **(80, 120)** and leave the **saturation** and **hue** at their **default values**.
- **Frequency Augmentation**: We add a frequency augmentation, to simulate images that are out of focus. Thus, we only use a **Low Pass Filter** and set its **sigma** values to **(0, 1.5)**.
- **Noise Augmentation**: Finally, we add a noise augmentation to increase the robustness against camera noise. This is especially useful for this dataset, because it adds some variation to the otherwise smooth background. We set the values to **(5, 15)**.

![augmentations](/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_augmentations.jpg)

## Model Settings
After having set up the data processing pipeline, we configure the model settings. First, we need to specify the **Classification Type**. We want to predict one of the numbers for each image so we set it to **One Class per Image**. We set the **Minimum FPS** to **20** and the **Maximum Memory Usage** as well as the **Maximum Multiplier Usage** to **90%**. The **FPGA Clock Speed** is left at **50 MHz**, since we are going to create a model for the Altera™ Max® 10 16K.

Next, we provide some additional information on the characteristics of the input data. First, we estimate the area that the model needs to analyze to make a decision for the smallest and the largest numbers. We set the surrounding area to **(25, 25)** for small objects and to **(90, 90)** for large objects.

Then, we estimate the variance of numbers from the same class. We observe quite a few differences in writing styles like the size, the angle or the line width, so we set the **Same Class Difference** to **40%**. The next setting describes the variation of background. There is no variation in the original background but since we added noise, we set the **Background Difference** to **5%**. We set the **Detect Simplicity** to **90%**, because the task isn't that complicated. Next, we need to specify the estimated sizes for small, average and large objects. We set those to **(25, 25)**, **(50, 50)** and **(90, 90)**. Finally we need to tell OneAI how many image features are relevant for the classification. We set **Average Number of Features for Classification** to **2** and **Maximum Number of Features for Classification** to **4**.

## Training the Model
Now, it's time to set up the training configuration for the model. In the **Hardware Settings** tab we select the **Altera™ Max® 10 16K** as the **Used Hardware**.

In the **Training** tab we need to click on **Sync** to synchronize our data and existing model trainings with the ONE WARE servers. After that, we create a new training configuration. For this demo, a **training time** of **10 minutes** is sufficient to fully train the model. We leave the **patience** at the default value of **30%**. Since we want to export the model to an FPGA, we **Enable Quantization Optimization** to increase its performance.

Finally, we click on the **Train** button in the top-right corner to start the training. You can monitor the training progress in the **Logs** and **Statistics** tabs.