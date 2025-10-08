---
id: getting-started
title: Getting Started with ONE AI
sidebar_label: Getting Started
---

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Getting Started Support" />

## 1. What is ONE AI and why should I use it?
ONE AI is a tool that allows you to create a custom AI model that is tailored to your individual needs. With ONE AI you can configure your AI in minutes without the need to be an expert in AI development. This allows everyone to benefit from the potential of AI.

You don't need any powerful hardware to use ONE AI. You configure your AI model in our open source software and run the hardware intensive training on our servers. Our neural architecture prediction algorithm is designed to take your deployment hardware into account when generating the model. This means that the generated models will be a lot faster than generic models and run even on the smallest hardware.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/img/ai/one_ai_plugin/use_cases/capture/preview.png" alt="Use Case" style={{ width: '50%' }} />
</div>

### How does ONE AI work?

<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <div style={{ flex: 1 }}>
    <p>
      ONE AI starts by analyzing the requirements of your task. It takes into account your configurations, the data and its labels, the hardware constraints and the required performance. For example, it analyzes the size of the different objects in the images.
    </p>
  </div>
  <img src="/img/ai/Input.webp" alt="input" style={{ width: '200px', flexShrink: 0 }} />
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <img src="/img/ai/Prediction.webp" alt="prediction" style={{ width: '200px', flexShrink: 0 }} />
  <div style={{ flex: 1 }}>
    <p>
      ONE AI then uses its knowledge about existing AI research and previously optimized AI models to predict the needed features for the AI model architecture. For example, if you have large objects, your AI model needs to look at a larger area in the images.
    </p>
  </div>
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <div style={{ flex: 1 }}>
    <p>
      ONE AI takes the predicted features and uses them to build a custom neural network architecture that fits your needs. Then the AI is trained on the dataset. Since the model is customized to your data, it only learns the relevant information and is a lot less prone to overfitting than generic models.
    </p>
  </div>
  <img src="/img/ai/Architecture.webp" alt="architecture" style={{ width: '200px', flexShrink: 0 }} />
</div>

<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
  <img src="/img/ai/Export.webp" alt="export" style={{ width: '200px', flexShrink: 0}} />
  <div style={{ flex: 1 }}>
    <p>
      Since ONE AI handles all the complexity of hardware optimization automatically, the AI can be deployed across FPGAs, microcontrollers, GPUs, and CPUs without further modification.
    </p>
  </div>
</div>

In order to run the AI within your software everything needed is an inference engine corresponding to the model type (e.g. Tensorflow or ONNX-runtime). When exporting a project or binary we provide the necessary runtime along with the model.

![Export 4](/img/ai/one_ai_plugin/getting_started/export_model_embedding_sidebyside.png)

## 2. Setup
To use ONE AI you need to install OneWare Studio with the OneAI Extension and create an account for the OneWare Cloud. We have a dedicated [guide](/docs/one-ai/getting-started/installation) that walks you through the setup step by step. New users receive a welcome bonus of 25.000 credits worth 500 € for free. All you need to do is to create an account and enter your address to complete the registration process. You won't be charged any fees.


## 3. Create a new AI project
The first step to creating your own AI model is to create a new project in OneWare Studio. To do so you need to click on ``AI`` in the menu bar and select ``Open AI Generator``.

![New AI](/img/ai/one_ai_plugin/getting_started/new_ai.webp)

Enter your ``Project Name`` and choose the ``AI Type``. 

![AI Generator](/img/ai/one_ai_plugin/getting_started/ai_generator.png)

**Note:** Currently, only “Image Detection” is available as the AI type.


## 4. Dataset preparation

Next, you need to prepare the data that your model is trained on. For the training, you need a set of images as well as annotations that tell ONE AI what the expected output for those images looks like. If you don't have any annotations for your dataset yet, you can label your data directly in OneWare Studio.

You can find more in depth information about handling your dataset in [this guide](/docs/one-ai/getting-started/dataset).

:::tip Training with synthetic image data
If you do not have a viable training dataset, you can generate quality synthetic image data through our partner [Rendered.ai](https://rendered.ai/). The Rendered.ai team can quickly provide a physically accurate, fully labeled dataset customized to your use case for any computer vision sensor modality on a [project basis](https://rendered.ai/synthetic-data-as-a-service/), or you can create synthetic data yourself at scale with Rendered.ai’s [tools and workflows](https://rendered.ai/platform/). All synthetic data generated via these means is fully annotated at creation and immediately accessible to merge with existing datasets and import into your ONE AI workspace.
:::

### Load your images
To load your images into OneWare Studio, you need to go to the **Dataset** tab in your ONE AI workspace. There you have a button at the top-right that allows you to import your data.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/img/ai/one_ai_plugin/getting_started/training_data_view.png" alt="Training Data View" style={{ width: '70%' }} />
</div>

You have the option to import datasets with existing annotations or just load the images. You can also use the ``Camera Tool`` to record images or the ``Spectrogram Generator`` to convert audio or time series data to images.

### Choose the annotation mode
The next step is to choose what kind of predictions you want your model to make, because this decision also determines how you need to annotate your data. Your model can either predict classes that apply to the whole image or detect individual objects. You can change the annotation mode in the top-right corner, next to the ``Import`` button.

![Label Mode](/img/ai/one_ai_plugin/getting_started/label_mode.png)

Here are some examples for the two types of predictions:
- **Classes**: predicting whether a product is defective or not, predicting which number is visible in an image
- **Objects**: marking individual defects, detecting objects on a conveyor belt

### Label your data
If your data isn't annotated yet, you can use OneWare Studio's ``Annotation Tool`` to create annotations. First you need to go to the ``Labels`` tab to create the different labels that you want to annotate. Then you need to click on an image to open the ``Annotation Tool``. Here, you can assign classes to the image or draw boxes around the objects depending on the annotation mode.

![Annotation Tool](/img/ai/one_ai_plugin/getting_started/annotation_tool_objects_1.png)


## 5. Prefilters
Prefilters are used to process your images and can introduce a wide variety of changes. For example you can crop your images, do color correction or apply a blur. You can add prefilters before or after applying augmentations to tune the data processing pipeline to your individual needs.

![Prefilter View](/img/ai/one_ai_plugin/getting_started/filter_view.png)

On the right, you can see the settings for the selected prefilter as well as a preview on how it will affect the image. The image on the bottom left shows a preview of your complete prefilter pipeline. If you want to learn more about prefilters, you can check out our [guide on filters and augmentations](/docs/one-ai/getting-started/filters-and-augmentations#prefilters).


## 6. Augmentations
Augmentations are applied during the training with random values within a specified range. Their purpose is to increase the diversity of the training data, helping the AI to generalize better. By varying the training data, it is possible to increase the size of the dataset without the need to record or annotate additional data. Furthermore, it is possible to make the AI model more robust against certain variations in the data by intentionally reproducing these variations with augmentations.  
Below, you'll find some examples for augmentations that are supported by ONE AI.

<div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
  <figure style={{ margin: 0, width: '49%', textAlign: 'center' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/augmentation_rotate.png" alt="Rotate Augmentation" style={{ width: '90%', display: 'block', margin: '0 auto' }} />
    <figcaption style={{ marginTop: '0.5em', fontSize: '0.9rem' }}>
      The ``Rotate Augmentation`` randomly rotates your images.
    </figcaption>
  </figure>
  <figure style={{ margin: 0, width: '49%', textAlign: 'center' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/augmentation_resize.png" alt="Resize Augmentation" style={{ width: '90%', display: 'block', margin: '0 auto' }} />
    <figcaption style={{ marginTop: '0.5em', fontSize: '0.9rem' }}>
      The ``Resize Augmentation`` scales the image up or down.
    </figcaption>
  </figure>
  <figure style={{ margin: 0, width: '49%', textAlign: 'center' }}>
    <img src="/img/ai/one_ai_plugin/getting_started/augmentation_color.png" alt="Color Augmentation" style={{ width: '90%', display: 'block', margin: '0 auto' }} />
    <figcaption style={{ marginTop: '0.5em', fontSize: '0.9rem' }}>
      The ``Color Augmentation`` varies the image's brightness, contrast, saturation, hue and gamma values. It can be used to mimic varying lighting conditions.
    </figcaption>
  </figure>
  <figure style={{ margin: 0, width: '49%', textAlign: 'center', }}>
    <img src="/img/ai/one_ai_plugin/getting_started/augmentation_noise_padded.png" alt="Noise Augmentation" style={{ width: '90%', display: 'block', margin: '0 auto' }} />
    <figcaption style={{ marginTop: '0.5em', fontSize: '0.9rem' }}>
      The ``Noise Augmentation`` adds a random noise to the images to help the model become robust against real-world image imperfections.
    </figcaption>
  </figure>
</div>

You can learn more about augmentations in uur [guide on filters and augmentations](/docs/one-ai/getting-started/filters-and-augmentations#augmentations).


## 7. Model settings
The ``Model Settings`` tab allows you to tune the model generation to your specific needs. You can specify the parameters you want to predict, which parameters you want to prioritize and how many resources your model may use. For achieving the best results, you also need to make some estimates about your task, like estimating the expected size of objects or the overall complexity of the task.  
For a more detailed explanation, you can check out our [guide on model settings](/docs/one-ai/getting-started/model-settings) or you can take a look at [this guide](/docs/one-ai/help/choosing-parameters-guide) on how to set the right parameters.

<img src="/img/ai/one_ai_plugin/getting_started/model_settings_input_1.png" alt="Model Settings" style={{ width: '100%' }} />


## 8. Hardware settings
In the ``Hardware Settings`` tab, you can specify the target hardware that your model will be deployed on. You have the option to select a predefined hardware or to define custom hardware resources. ONE AI will create a model that is optimized for your hardware and will run within the constraints that were specified in the ``Model Settings``.  
You can find more details about the hardware settings in [this guide](/docs/one-ai/getting-started/hardware-settings).


## 9. Training a model
You can create multiple model instances in the ``Training Tab``. This allows you to train new models with different settings while still keeping the old version. Be careful, as old models are automatically removed after seven days.  
To add a new instance click on ``Create Model`` and enter a name.

![Train](/img/ai/one_ai_plugin/getting_started/train_1.webp)

After you've clicked on the ``Train`` button and entered your training settings, you can watch the training process live in the ``Statistics`` tab. This allows you to stop the training manually if you aren't happy with the progress and want to change the parameters. The same preview is available in the ``Projects`` tab in the OneWare Cloud.

![Train 4](/img/ai/Train.png)

If you want to know more about the different training options, you can look into our [guide on training and exporting AI models](/docs/one-ai/getting-started/training-and-export#training-a-new-ai-model).


## 10. Model export
To test your AI model, you can export it by clicking on the ``Export`` button and download it afterwards. ONE AI supports a variety of different export formats to ensure the best possible compatibility with your hardware. For example, you can download your model as a standard TensorFlow model or in the widely used [ONNX](https://onnx.ai/) format. Alternatively you can download a TensorFlow Lite model for your microcontroller or VHDL code if you are working with an FPGA. You even have the option to convert your model to an executable binary or to source code.

![Export 1](/img/ai/one_ai_plugin/getting_started/export_1.png)

After the export is finished, the model can be download in the `Exports` tab by clicking on the green arrow.

![Export 3](/img/ai/one_ai_plugin/getting_started/export_3.png)

If you need more information about the export options, you can look into this [guide](/docs/one-ai/getting-started/training-and-export#exporting-a-trained-model).


## 11. Using your model in OneWare Studio
You can use your trained model directly in OneWare Studio by exporting it as an ONNX model.

The ``Camera Tool`` allows you to run your model on live data from a connected camera. This allows you to easily test how the model will perform in your production environment. Furthermore, the model can be used to generate labels for newly recorded data or as a quality control station. Check out our [guide](/docs/one-ai/getting-started/camera-tool) on the ``Camera Tool`` to learn more.

![Camera Tool Live Preview](/img/ai/one_ai_plugin/getting_started/camera_tool/live_preview.png)

You can also use a trained model in the ``Annotation Tool`` to assist you with labeling new data. It is a common approach to label only a part of the dataset, train a first model on this data and use the model to label the rest of the dataset. The predictions of this model won't be perfect, but they can speed up the annotation process significantly. After the next portion of the dataset is labeled, you can train a new model with better performance. You can learn more about using your model to annotate your data [here](/docs/one-ai/getting-started/dataset#5-using-a-trained-model-to-annotate-new-data).

![Generating New Annotations](/img/ai/one_ai_plugin/getting_started/auto_labeling.png)


## 12. Where to go next
We have a growing list of guides and tutorials on our website to help you become an expert in ONE AI. If you are interested in a specific topic, you can check out the other articles in the getting started section. You might also be interested in typical [use cases](/docs/one-ai/use-cases/) for ONE AI, but you can also use ONE AI for many tasks beyond what is listed there.

We also have a list of demos, that teach you how to use ONE AI to solve a specific task:
1. [A quality control of potato chips](/docs/one-ai/tutorials/potato-chip-demo)
2. [A detection of handwritten digits](/docs/one-ai/tutorials/handwritten-digits-demo)
3. [An object detection of dice](/docs/one-ai/tutorials/dice-demo)

Don't hesitate to ask our team for help if you have any questions. You can reach us via mail at support@one-ware.com or you can join our [Discord Server for ONE WARE Studio and ONE AI](https://discord.com/invite/NCN9VAh). Your feedback is appreciated and helps us to decide which features and tutorials we should work on next.