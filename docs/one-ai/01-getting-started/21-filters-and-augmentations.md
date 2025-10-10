---
id: filters-and-augmentations
title: Using Filters and Augmentations
sidebar_label: Filters and Augmentations
---

## Prefilters
You can add prefilters before or after applying augmentations to process your dataset and boost model performance.

![Prefilter View](/img/ai/one_ai_plugin/getting_started/filter_view.png)

On the right, you can see the settings for the selected prefilter as well as a preview on how it will affect the image. The image on the bottom left shows a preview of your complete prefilter pipeline.

### The Steps in the Data Processing Pipeline
- ``Begin``: The filters ``Initial Resize`` and ``Resolution Filter`` are used to bring all images to the same size and optionally scale them down.
- ``Before Augmentation``: You can choose from a varied selection of filters that are applied before augmentation is applied to the images. Typical examples are the ``Color Filter`` for applying color correction or the ``Crop Filter`` for cropping the images to the relevant area.
- ``Static Augmentations``: The augmentations are divided into two groups. The static augmentations are applied first and have a fixed order.
- ``Dynamic Augmentations``: The order of the dynamic augmentations can be changed and you can even apply the same augmentation multiple times. 
- ``After Augmentation``: You have the option to add additional filters that are applied after the images are augmented. For example, you could use a ``Frequency Filter`` to reduce noise or apply a ``Threshold Filter`` to convert your images to a binary representation.
- ``End``: In the last step, you have the option to remove individual color channels with the ``Channel Filter``.

### Image Resolution

#### Initial Resize
![Initial Resize](/img/ai/one_ai_plugin/getting_started/filter_initial_resize.png)

The ``Initial Resize`` filter resizes all images to the same size. You can decide between stretching images that have a different size or applying a black padding. You can set the size manually or use the button on the right of ``Begin`` to automatically select the size of the largest image.


#### Resolution Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/filter_resolution_50.png" alt="Resolution Filter" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/getting_started/filter_resolution_10.png" alt="Resolution Filter" style={{ width: '30%' }} />
</div>

The ``Resolution Filter`` allows you to reduce the resolution of your images. This will reduce the prediction time and may even improve the accuracy if the AI struggles with unnecessary details. You need to keep the resolution large enough to preserve key details.

### Basic Prefilters

#### Crop Filter

![Crop Filter](/img/ai/one_ai_plugin/getting_started/filter_crop.png)

You can use the ``Crop Filter`` to crop your images to the area of interest. For example, if your images show objects on a conveyor belt, you can use the crop filter to remove any surrounding areas that are also captured by the camera.

#### Frequency Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/filter_low_pass.png" alt="Low-pass Filter" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/getting_started/filter_high_pass.png" alt="High-pass Filter" style={{ width: '30%' }} />
</div>

You can use the ``Frequency Filter`` to apply low-pass and high-pass filters.
- Low-pass filters allow low frequencies to pass while reducing high frequencies. This removes sharp edges and results in a blurred image.
- High-pass filters do the opposite. They remove areas of uniform color and can be used to highlight edges in images.

#### Sharpen Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/filter_sharpen_1.png" alt="Sharpen Filter before" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/getting_started/filter_sharpen_2.png" alt="Sharpen Filter after" style={{ width: '30%' }} />
</div>

You can use the ``Sharpen Filter`` to increase the sharpness of the image and emphasize object edges for an easier detection.

#### Color Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/filter_color_1.png" alt="Color Filter" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/getting_started/filter_color_2.png" alt="Color Filter" style={{ width: '30%' }} />
</div>

The ``Color Filter`` allows you to alter the brightness, contrast, saturation, hue and gamma of your images. You can use it for color correction or for creating a clearer visual separation between objects and background.

### Advanced Prefilter Options
#### Normalize Filter
This filter rescales the image's brightness so that the darkest pixels become black and the brightest pixels become white

#### Inverse Filter
This filter can be used to compute the inverse of images. For example, you can use it to convert black text on a white background to white text on a black background. This might be useful to you, since neural networks tend to be slightly better at detecting light objects on a dark background than the other way around.

#### RGB to HSV Filter
The ``RGB to HSV Filter`` converts the images from an RGB to an HSV representation. This can be used to apply further filters to the HSV representation before converting the image back to RGB. For example, you can use a ``Threshold Filter`` that is applied based on the hue value. This makes it possible to extract objects of a certain color from an image.

#### HSV to RGB Filter
This is the counterpart to the ``RGB to HSV Filter`` and can be used to convert HSV images back to RGB.

#### Threshold Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/filter_threshold_1.png" alt="Threshold Filter" style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/getting_started/filter_threshold_2.png" alt="Threshold Filter" style={{ width: '30%' }} />
</div>

The ``Threshold Filter`` removes image areas based on a threshold. You can use this to remove background areas if they can be clearly separated from the objects.  
You have the option to apply the following operations:
- ``Binary``: Pixels below the threshold are set to black and pixels above the threshold to white.
- ``To Zero``: Pixels below the threshold are set to black.
- ``To One``: Pixels below the threshold are set to white.
- ``To Zero Inverted``: Pixels above the threshold are set to black.
- ``To One Inverted``: Pixels above the threshold are set to white.

You can select the option to use two thresholds. This changes the operations in the following way:
- ``Binary``: Pixels between the thresholds are set to white. Pixels below the first threshold or above the second threshold are set to black.
- ``To Zero`` and ``To One``: The operation is applied to pixels below the first threshold or above the second threshold.
- ``To Zero Inverted`` and ``To One Inverted``: The operation is applied to pixels between the thresholds.

It is possible to check whether the average of all channels is below the threshold or to only use a single channel for the decision. If you use a single channel, you can decide whether the operation is only applied to that channel or all channels. This combines nicely with the ``RGB to HSV Filter``. You can convert your images to HSV and then only keep areas where the hue lies within a set value range.

#### Channel Filter
<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/filter_channel_1.png" alt="Channel Filter 1 " style={{ width: '30%' }} />
    <img src="/img/ai/one_ai_plugin/getting_started/filter_channel_2.png" alt="Channel Filter 2" style={{ width: '30%' }} />
</div>

The ``Channel Filter`` can be used to remove or isolate specific color channels. This can be used when one of the channels doesn't contain any useful information or contains too much noise.

---

## Augmentations

Augmentations are applied during the training with random values within specified ranges. Their purpose is to increase the diversity of the training data, helping the AI to generalize better. By varying the training data, it is possible to increase the size of the dataset without the need to record or annotate additional data. Furthermore, it is possible to make the AI model more robust against certain variations in the data by intentionally reproducing these variations with augmentations.

### Move Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_move.png" alt="Move Augmentation" style={{ width: '40%' }} />

The ``Move Augmentation`` shifts the image along the X and Y axes within a specified range. This makes the model more robust against positional variability.

### Rotate Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_rotate.png" alt="Rotate Augmentation" style={{ width: '40%' }} />

The ``Rotate Augmentation`` randomly rotates your images. This helps the model to also recognize objects when they are rotated.

### Flip Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_flip.png" alt="Flip Augmentation" style={{ width: '40%' }} />

This augmentation can be used to randomly flips the images horizontally and vertically.

### Resize Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_resize.png" alt="Resize Augmentation" style={{ width: '40%' }} />

The ``Resize Augmentation`` scales the image up or down. This makes the model more robust against changes in the object size.

### Color Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_color.png" alt="Color Augmentation" style={{ width: '40%' }} />

This augmentation varies the image's brightness, contrast, saturation, hue and gamma values. It can be used to mimic varying lighting conditions.

### Frequency Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_frequency.png" alt="Frequency Augmentation" style={{ width: '40%' }} />

The ``Frequency Augmentation`` uses a low-pass filter to blur the images by a random amount. By using it, the model is trained to also make correct predictions when the image is slightly out of focus.

### Sharpen Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_sharpen.png" alt="Sharpen Augmentation" style={{ width: '40%' }} />

The ``Sharpen Augmentation`` randomly sharpens the images and has a similar effect as the ``Frequency Augmentation``.

### Noise Augmentation
<img src="/img/ai/one_ai_plugin/getting_started/augmentation_noise.png" alt="Noise Augmentation" style={{ width: '40%' }} />

This augmentation adds a random noise to the images to help the model become robust against real-world image imperfections.

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Filters and Augmentations Support" />
