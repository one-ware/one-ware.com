---
id: difference-image-demo
title: Difference Detection Demo
sidebar_label: Object Detection (Difference)
---
import Link from '@docusaurus/Link';

# Difference Detection Demo

## About this Demo
This demo showcases the usage of OneWare Studio and the OneAI Extension where two images are compared in order to detect objects in one image given a template.
If you are unfamiliar with the OneAI Extension, we recommend first taking a look at our guide [Getting Started with One AI](/docs/one-ai/getting-started).
We also recommend to read the [Potato Chip Classification Demo](/docs/one-ai/tutorials/potato-chip-demo), since it goes into more detail than this demo.

OneAI supports multiple images as input to a model and offers different ways to work with them. Overlap difference is one way that may be useful when images can be
compared to a reference or template by direct difference between the images. This may be a use case in anomaly detection or quality control when images are taken
from the same perspective and position.

## Dataset Overview
The dataset is artificially created with our own [Image Composition Tool](https://github.com/one-ware/OneAI_demo_datasets/blob/main/dataset_generator/create_dataset.ipynb) due to the lack of open-source datasets. Taking the overlap difference only
makes sense when we have a dataset with images that are spatially aligned, i.e. so similar that taking the difference of them is a benefit by cancelling out the
background and leaving only relevant parts.

If you want to follow the tutorial step by step, including the annotations and all the settings, you can download the dataset below. If you prefer to skip the setup steps, you can download the completed project and immediately start the training.

<div className="text--center" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
  <Link className="button button--primary button--lg" href="https://onewarecom.sharepoint.com/:u:/s/Public/IQA70X-wIDJrRJN24qAk3NkOAalYtZ6bA8bCLcjhWZYUl64?e=ztkGKH" target="_blank" rel="noopener noreferrer">
    <p className="m-0 p-0">Download Dataset</p>
  </Link>
  <Link className="button button--primary button--lg" href="https://onewarecom.sharepoint.com/:u:/s/Public/IQDN-ArnyVraQp6b99jjp7lSAV-erJCMPyuPQNzNPGu8viM?e=px9P02" target="_blank" rel="noopener noreferrer">
    <p className="m-0 p-0">Download Project</p>
  </Link>
</div>



The dataset is created using a time lapse video of a city skyline as background. For the objects to detect, we have two different bird images (one bright, one dark) and two different drone
images (one bright, one dark). The background images were taken from the skyline video by skipping some frames, leading to a total of 40 different backgrounds.
While one background image serves as reference template, the same background or one frame before/after is taken and 1-4 objects (birds or drones) are randomly placed on it.
The objects are 7-10% the size of the image to keep it realistic, and the drones and birds are placed either in the sky or in front of buildings.

In short, the dataset contains 259 image pairs (one template, one with objects) with overall 340 drones and 199 birds.
Here are a few examples from the dataset:

<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <img src="/img/ai/one_ai_plugin/demos/overlap-difference/image_000033_temp.png" alt="image_000033_temp" style={{ width: '48%' }} />
    <img src="/img/ai/one_ai_plugin/demos/overlap-difference/image_000033_test.png" alt="image_000033_test" style={{ width: '48%' }} />
    <img src="/img/ai/one_ai_plugin/demos/overlap-difference/image_000118_temp.png" alt="image_000118_temp" style={{ width: '48%' }} />
    <img src="/img/ai/one_ai_plugin/demos/overlap-difference/image_000118_test.png" alt="image_000118_test" style={{ width: '48%' }} />
</div>

<div style={{ marginTop: '1rem', textAlign: 'center', fontStyle: 'italic' }}>
    The images above show pairs of reference (template) images on the left and their corresponding test images with added objects on the right.
</div>

**Important note**: The overlap difference feature only works when the image and label files are correctly named. Images and labels are grouped together
by their base name (e.g. img1). The reference image is identified by the name extension **_temp** (e.g. img1_temp.jpg) and the image with objects is
identified by the name extension **_test** (img1_test.jpg). The label naming follows this scheme and since it belongs to the image with objects, the 
file also needs the **_test** extension (e.g. img1_test.txt). Example structure:

- **Dataset/**
  - **Train/**
    - `img1_temp.jpg` (reference image)
    - `img1_test.jpg` (test image with objects)
    - `img1_test.txt` (labels for test image)
    - `img2_temp.jpg`
    - `img2_test.jpg`
    - `img2_test.txt`
    - ...

## Setting up the Project
The setup process is similar to the [Potato Chip Demo](/docs/one-ai/tutorials/potato-chip-demo#setting-up-the-project-and-loading-the-data).
First, we create a new project and a new AI Generator.
Then we open the project folder in a file manager to copy the training data.
Since this demo deals with an object detection task, we leave the **Mode** at **Annotation**.
An important difference is to choose the **Fusion Type** as **Overlap Difference** instead of **Single Images** in the extra setting on the top-right corner
next to the **Import** Button.
In the **Validation** tab, we set up an auto-generated validation split that we set to **20%**.
We don't have a separate test set for this dataset, so we go to the **Test** tab and ensure that the **Validation Image Percentage** is set to **100%**.

We can verify that everything was set up correctly by checking the annotations of our train images.
It is expected that only the images with **_test** as file name ending have annotations, since the reference image with **_temp** extension does not have labels.
![loaded_dataset](/img/ai/one_ai_plugin/demos/overlap-difference/drones_birds_setup.png)

## Hardware Settings
Since the dataset for this demo is artificially created and it cannot be tested in a real application, we are not restricted to a specific FPGA or setup. The model needs to run on the user's hardware (e.g., laptop), and therefore we choose **GPU, Default** from **Select Predefined Hardware**. 
We set **Maximum Memory Usage** to **25%**.

## Filters and Augmentations
Now, we select the filters and augmentations that we want to use.
Though the objects are small, the image size is already relatively small with 648x432, and reducing its resolution would make the objects almost impossible to detect. So we do
not reduce the resolution and leave the **Resolution Filter** at **100%**.
Due to the details in the images, we don't want to use a lot of prefilters.
The first filter that we are going to use in the demo is a **Crop Filter**, which cuts the lower water part of the image since we know that there are no objects
to detect. Moreover, when trying out prefilters on the image, we can see that increasing the **Saturation** in the **Color Filter** to **180** improves the visibility of the drones and birds.

In addition, we use the following augmentations:
- **Move Augmentation**: We set the amount of shift to **±5%** in both directions.
- **Rotate Augmentation**: We set the **rotation** range of the rotate augmentation to **±5°** since rotational robustness doesn't have a major importance for this demo.
- **Flip Augmentation**: For this project, we only **select horizontal flips**. Since the skyline was taken from a bottom view, using vertical flips would change the perspective of the images.
- **Resize Augmentation**: We vary the size from **90% to 110%** in both dimensions to make the model more robust against changes in the object sizes.
- **Noise Augmentation**: We add a noise augmentation and reduce the settings to **0% and 8%**.

![prefilters](/img/ai/one_ai_plugin/demos/overlap-difference/birds_drones_crop.png)
![augmentation](/img/ai/one_ai_plugin/demos/overlap-difference/birds_drones_augmentations.png)

## Model Settings
Our next step is to configure the model settings.
Our goal is to detect and classify the birds and drones, so we select the **Prediction Type** to **Size, Position and Class of Objects**.
We prefer to have an accurate prediction but don't require it to be perfect, so we set the **Size Prediction Effort** to **25%** and the **Position Prediction Effort** to **25%**, which is a good start for many applications.
We don't want to prioritize precision nor recall, so we choose the balance with **Prioritize Precision** at **50%**.
Next, we can specify the performance requirements of the model. We set the **Minimum FPS** to **10**.


Further, we know how the dataset was created, so we know that the context around the objects is not important for detecting the object itself. Therefore, we set the **Surrounding Size Mode** to **Relative To Object** and the **Estimated Surrounding Min Size** to **150%** and **Estimated Surrounding Max Size** to **200%**. With these settings, we only set a small necessary surrounding size, since rotation and scaling of the objects may increase the required context.

Next, we need to estimate the difference within the same class.
This means here: "How different are the birds (or drones) compared to each other?" In this case, we have for each category one bright-colored and one dark-colored
object, but due to it being images simply dropped (with blending) on the image, there are no differing perspectives of them. So we set the **Same Class Difference** to **60%**.

Afterwards, we need to give an estimate for the background variance.
In full resolution, the city buildings and changing sky colors create a highly varying background with many details. However, since all images are taken from the same 
perspective, the effective background variance is reduced. The lower resolution simplifies some of the fine details while still preserving 
enough information for object detection.
Therefore, we choose a **Background Difference** of **70%**. Though at first glance the task may seem easy, especially the detection and correct classification of the small objects in front
of detailed buildings can be very challenging. So we can say the task is placed somewhere between a moderate and a high complexity, and we set the **Detect Simplicity** to **70%**.

In this case, we do not need to create different groups since the drones and birds are very similar in size, color and appearance. So we can leave both labels in the Default
Group 1.

## Training the Model
In the **Training** tab we need to click on **Sync** to synchronize our data and existing model trainings with the ONE WARE servers.
After that, we create a new training configuration.
Object detection tasks tend to need a lot more training than classification tasks, but with the overlap difference we give a lot of information that
makes it easier for the model to learn, so we set the **training time** to **10 minutes**.
The patience is set to **50%** to terminate the training early if there are no further improvements.
Since we don't plan to export the model to an FPGA, we don't need to **enable quantization**.

Finally, we click on the **Train** button in the top-right corner to start the training. You can monitor the training progress in the **Logs** and **Statistics** tabs.

## Testing the Model
Though the training shows us the validation metric **F1 score** as an indicator for the performance of the model, we can now test the model after training for a detailed view.
Therefore, we click on the **Test** Button in the top-right corner. We choose to visualize 5 images and set an IoU threshold of **40%** because we care a little more about 
the objects being found and correctly classified than the perfect bounding box, which is common for small objects as given here.
In order to receive a more detailed analysis of the performance, we choose **Show Metrics**, which gives us the mean average precision as well as the precision per class.

![test](/img/ai/one_ai_plugin/demos/overlap-difference/birds_drones_test.png)

This model receives with the given parameters an F1 score of **93.2%**. For comparison, we trained a YOLOv8 model on the same data, preprocessing, and augmentation for 30 epochs (10 minutes). However, since YOLOv8 cannot handle image pairs or compute overlap differences, it was only trained on the single test images containing the objects (without the template images), requiring it to detect small objects against a complex city background without the benefit of a reference template. With this approach, YOLOv8 achieved an F1 score of **56%**. This demonstrates that our model's overlap difference method is significantly superior for use cases where spatially aligned images are available, resulting in more than **10 times fewer errors** than YOLOv8.

The visualizations from the test process can be seen in the Cloud and reached either by clicking the **View Online** Button on the top-right corner or by clicking on the link given in the logs.
In the Cloud, the results can be viewed by navigating to the current project and model, then clicking on **tests**. The sample predictions and precision-recall curve can either be downloaded as a zip or simply viewed.
For the overlap difference, the results show only the **test** image with ground truth labels and predictions:

![result](/img/ai/one_ai_plugin/demos/overlap-difference/test1.png)
![result2](/img/ai/one_ai_plugin/demos/overlap-difference/test2.png)

## Export and AI Check
So far, you can export a multi-image input model but cannot use an exported onnx model as AI check or live preview. This is work in progress. 

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Tutorial Support" />