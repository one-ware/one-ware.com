---
id: potato-chip-demo
title: Getting Started with One AI for Object Detection
sidebar_label: Demo - Potato Chip
---
# Potato Chip Classification Demo

## About this Demo
This demo showcases the usage of OneWare Studio and the OneAI Extension for a demo case. If you are unfamiliar with the OneAI Extension, we recommend to first take a look at our guide [Getting Started with One AI for Object Detection](/docs/one-ai/01-get-started.md).

## Dataset Overview
The dataset *PepsiCo Lab Potato Chips Quality Control* was published by the user Usama Navid on the platform [kaggle](https://www.kaggle.com/datasets/concaption/pepsico-lab-potato-quality-control). It contains quality control images from a food processing plant that produces potato chips. During the production process, the chips can get burned making them unsuitable for consumption. Our goal for this demo is to create an AI that can classify an image of a potato chip as defective or non-defective. Such an AI could be used for quality control to sort out defective chips.

Here are a few examples from the dataset:

<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/demos/potato_chip/chips_non-defective_01.jpg" alt="chips_example_non-defective_01" style={{ width: '48%' }} />
    <img src="/img/ai/one_ai_plugin/demos/potato_chip/chips_non-defective_02.jpg" alt="chips_example_non-defective_02" style={{ width: '48%' }} />
    <img src="/img/ai/one_ai_plugin/demos/potato_chip/chips_defective_01.jpg" alt="chips_example_defective_01" style={{ width: '48%' }} />
    <img src="/img/ai/one_ai_plugin/demos/potato_chip/chips_defective_02.jpg" alt="chips_example_defective_02" style={{ width: '48%' }} />
</div>

We created a modified version of this dataset with scaled down images. We also added annotation files that are compatible with the current version of the OneAI Extension. You can download the dataset [here](https://github.com/one-ware/OneAI_demo_datasets/blob/main/Pepsico%20RnD%20Potato%20Lab%20Dataset%20512x512.zip).

## Setting up the Project
First we need to create a new project by clicking on *File* > *New* > *Project*. To create a new AI Generator, click on *AI* > *Open AI Generator*, enter a name and select *Image Detection*.
To load the data, right click on the project folder and select *Open in File Manager*. Open the provided dataset folder and copy the folder ``Train/img`` into the folder ``[selected_name]/Dataset/Train``. Do the same for the test folder respectively.

Since we want to train a classification model, we need to change the *Mode* from *Annotation* to *Classification*. Because we don't have a predefined validation split, we let ONE AI create a validation split from the training data. The required settings are in the *Validation* tab but are already activated by default.

If you followed all the steps correctly, the images will show up in the *Train* and *Test* tab of the *Dataset* section. Make sure that the images have a green checkmark in the bottom left corner, which shows that they are annotated.

![loaded_dataset](/img/ai/one_ai_plugin/demos/potato_chip/chips_loaded_dataset.jpg)

## Filters and Augmentations
First we need to set up our data pipeline by specifying the filters and augmentations. Filters are applied once to every image and are the same every time. They are used to preprocess the images. Augmentations on the other hand contain random elements and are different for every image and epoch of the training. They are used to increase the size of the dataset without the need to record and annotate new data. Furthermore, augmentations can increase the model's robustness against variations in the data by intentionally reproducing these variations. OneWare Studio allows us to set up two sets of filters - one that is applied before the augmentations and one that is applied afterwards.

For this demo we are using a *Resize Filter* that is set to 12.5% to reduce the 512x512 images to 64x64. This allows us to reduce the size of the image and thus the required computations while still being able to distinguish key details. For this project, we don't need any further filters.

In addition, we use the following augmentations:
- Move Augmentation: This augmentation varies the image by shifting it. By using it, the model becomes more robust against shifts in the position of the potato chips. We set the amount of shift to ±15% in both directions.
- Rotate Augmentation: This augmentation rotates the image by a random amount that lies within a given range. Just like with the move augmentation, the rotate augmentation increases the model's robustness - this time against rotations instead of shifts. We set the rotation range to ±180°.
- Flip Augmentation: The flip augmentation randomly flips the image horizontally, vertically or in both dimensions. For this demo, we select both flips.
- Resize Augmentation: The resize augmentation varies the scale of the images. We set it from 80% to 120% in both dimensions.
- Color Augmentation: The color augmentation changes the brightness, contrast, saturation and hue of the image. It helps the model to be more robust against changes in lighting. We set the brightness adjustment to ±20, the contrast and saturation to (80, 120) and leave the hue unchanged at (0, 0).
- Noise Augmentation: The noise augmentation reduces the image quality by adding a noise. We reduce the settings of this augmentation to 0% and 5%.

Feel free to test around with the filter and augmentation settings. You can add additional filters and augmentations, remove them or change their parameters. Remember to set the checkmarks in the list of augmentations to enable them.

![augmentations](/img/ai/one_ai_plugin/demos/potato_chip/chips_augmentations.jpg)

## Model Settings
Now that we have set up our data processing pipeline, we configure the model settings. First, we need to specify the *Classification Type*. Since each image image has either the class *defective* or *non-defective*, we set it to *One Class per Image*. Next, we set the *Minimum FPS* to 20 and the *Maximum Memory Usage* to 10%.

Afterwards, we provide some additional information on the characteristics of the data. First, we estimate the area the model needs to analyze to make a decision. In our example, it is enough for the model to see the burnt part of the potato chip. There is no need to analyze the whole chip. Other applications might require the model to see the whole object or even to look at the area surrounding the objects. We set the surrounding area to (10, 10) for small objects and to (30, 30) for large objects.

Next we need to estimate the difference within the same class. There is some moderate variance between the chips and their burn marks but the differences aren't huge. To reflect this, we set the *Same Class Difference* to 40%. The next setting describes how much the background varies. Since there is very little variation in the background, we set the *Background Difference* to 5%. Next, we set the *Detect Simplicity* to 90% to reflect the complexity of the task. Afterwards, we need to tell the model the estimated sizes for small, average and large objects. We set those to (5, 5), (15, 15) and (30, 30). Finally we need to tell OneAI how many image features are relevant for the classification. Most defective chips contain one or two burn marks, but there are also chips with more burned areas. We thus set *Average Number of Features for Classification* to 1.5 and *Maximum Number of Features for Classification* to 8.

## Training the Model
Lastly, we set up the parameters for the hardware and the model training. In the *Hardware Settings* tab we select the *Altera™ Max® 10 16K* as the *Used Hardware*. If you want to deploy your model to a different kind of hardware, you can set it up here.

In the *Training* tab we need to click on *Sync* to upload our data to the ONE WARE servers. After that, we click on *Create* to create a new training pipeline. A training time of 30 minutes is sufficient for this task. We leave the patience at the default value of 30% to ensure that the model is fully trained. Since we want to export the model to an FPGA, we *Enable Quantization Optimization* to increase its performance.