---
id: getting-started
title: Getting Started with ONE AI
sidebar_label: Getting Started
---

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

<div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
  <img src="/img/ai/Export.webp" alt="export" style={{ width: '200px', flexShrink: 0 }} />
  <div style={{ flex: 1 }}>
    <p>
      Finally the AI can be deployed across FPGAs, microcontrollers, GPUs, and CPUs without modification. ONE AI handles all the complexity of hardware optimization and implementation automatically.
    </p>
  </div>
</div>

## 2. Setup
To use ONE AI you need to create an account for the OneWare Cloud and install OneWare Studio and the OneAI Extension. We have a dedicated [guide](/docs/one-ai/getting-started/installation) that walks you through the setup step by step. New users receive a welcome bonus of 25.000 credits worth 500 € for free. All you need to do is to create an account and enter your address to complete the registration process. You won't be charged with any fees.

## 3. Create a new AI project
The first step to creating your own AI model is to create a new project in OneWare Studio. To do so you need to click on ``AI`` in the menu bar and select ``Open AI Generator``.

![New AI](/img/ai/one_ai_plugin/getting_started/new_ai.webp)

Enter your ``Project Name`` and choose the ``AI Type``. 

![AI Generator](/img/ai/one_ai_plugin/getting_started/ai_generator.png)

**Note:** Currently, only “Image Detection” is available as the AI type.

---

## 4. Dataset Preparation

Next, you need to prepare the data that your model is trained on. For the training, you need a set of images as well as annotations that tell ONE AI what the expected output for those images looks like. If you don't have any annotations for your dataset yet, you can label your data directly in OneWare Studio.

You can find more in depth information about handling your dataset in [this guide](/docs/one-ai/getting-started/dataset).

### Load Your Images
To load your images into OneWare Studio, you need to go to the **Dataset** tab in your ONE AI workspace. There you have a button at the top-right that allows you to import your data.

<div style={{ display: 'flex', justifyContent: 'center' }}>
  <img src="/img/ai/one_ai_plugin/getting_started/training_data_view.png" alt="Training Data View" style={{ width: '70%' }} />
</div>

You have the option to import datasets with existing annotations or just load the images. You can also use the ``Camera Tool`` to record images or the ``Spectrogram Generator`` to convert audio or time series data to images.

### Choose the Annotation Mode
The next step is to choose what kind of predictions you want your model to make, because this decision also determines how you need to annotate your data. Your model can either predict classes that apply to the whole image or detect individual objects. You can change the annotation mode in the top-right corner, next to the ``Import`` button.

![Label Mode](/img/ai/one_ai_plugin/getting_started/label_mode.png)

Here are some examples for the two types of predictions:
- **Classes**: predicting whether a product is defective or not, predicting which number is visible in an image
- **Objects**: marking individual defects, detecting objects on a conveyor belt

### Label Your Data
If your data isn't annotated yet, you can use OneWare Studio's ``Annotation Tool`` to create annotations. First you need to go to the ``Labels`` tab to create the different labels that you want to annotate. Then you need to click on an image to open the ``Annotation Tool``. Here, you can assign classes to the image or draw boxes around the objects depending on the annotation mode.

![Annotation Tool](/img/ai/one_ai_plugin/getting_started/annotation_tool_objects_1.png)

---

## 5. Prefilters
Prefilters are used to process your images and can introduce a wide variety of changes. For example you can crop your images, do color correction or apply a blur. You can add prefilters before or after applying augmentations to tune the data processing pipeline to your individual needs.

![Prefilter View](/img/ai/one_ai_plugin/getting_started/filter_view.png)

On the right, you can see the settings for the selected prefilter as well as a preview on how it will affect the image. The image on the bottom left shows a preview of your complete prefilter pipeline. If you want to learn more about prefilters, you can check out our [guide on filters and augmentations](/docs/one-ai/getting-started/filters-and-augmentations#prefilters).

---

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

---

## 7. Model Settings
The ``Model Settings`` tab allows you to tune the model generation to your specific needs. You can specify the parameters you want to predict, which parameters you want to prioritize and how many resources your model may use. For achieving the best results, you also need to make some estimates about your task, like estimating the expected size of objects or the overall complexity of the task.  
For a more detailed explanation, you can check out our [guide on model settings](/docs/one-ai/getting-started/model-settings) or you can take a look at [this guide](/docs/one-ai/help/choosing-parameters-guide) on how to set the right parameters.

<img src="/img/ai/one_ai_plugin/getting_started/model_settings_input_1.png" alt="Model Settings" style={{ width: '100%' }} />

---

## 8. Hardware Settings
In the ``Hardware Settings`` tab, you can specify the target hardware that your model will be deployed on. You have the option to select a predefined hardware or to define custom hardware resources. ONE AI will create a model that is optimized for your hardware and will run within the constraints that were specified in the ``Model Settings``.  
You can find more details about the hardware settings in [this guide](/docs/one-ai/getting-started/hardware-settings).

---

## 9. Training

> For these steps you need to be connected to the ONE AI Cloud

Ensure that your training data is uploaded, labeled, and properly prepared. This includes applying any necessary prefilters and selecting the most effective augmentations. Once your data is ready, double-check your model and hardware settings before starting the training process

### Training a new AI Model

You can create new AI model instances, so you can save old trained models and try out new ones.

![Train](/img/ai/one_ai_plugin/getting_started/train_1.webp)

Select the model you want to train with the current data and settings. Then click on the `Train` button.

![Train 2](/img/ai/one_ai_plugin/getting_started/train_2.webp)

First, you need to specify for how long you want to train your model. A detailed guide what training time works best can be found [here](/docs/one-ai/help/choosing-parameters-guide#training). You can also use early stopping to end the training early if the model doesn't improve any more. To do so you need to set the ``Patience for Early Stopping``. For example, if you set the training time to an hour and the patience to 10%, the training is stopped early if the model doesn't improve for six minutes.  
If you want to export a quantized model, you should ``Enable Quantization Optimization``. Quantization reduces the amount of bits that are used to represent the model weights. This reduces the size of the model and increases its speed while only slightly decreasing its accuracy. This is a huge advantage if you intend to run your model on an FPGA or a microcontroller.  
If you enable quantization, you can use the ``Percentage Quantization Optimization`` setting to control the percentage of training time that is dedicated to fine-tuning quantized calculations. While quantization aware training improves the performance of quantized models, it also slows down training, so it is a good idea to start the training normally and switch to quantization aware training later on. A good tradeoff between training time and model performance is at 30%, but if you want the best performing model, you should set the percentage to 100%.  
The next setting allows you to choose whether you only want to train your model on images that contain objects. This allows the model to learn faster how objects look and how to detect them, but the model also spends less time learning how to correctly identify the background.  
Finally, if you selected a model that was already trained before, you can decide whether you want to continue its training or override the existing model. If you are training the model for the first time, this setting is ignored.

![Train 3](/img/ai/one_ai_plugin/getting_started/train_3.webp)

After you press on `Start Training`, you see how many Credits the training will cost. If you use early stopping, the costs can be less than that, because the training might end early if there are no further improvements. The total time is always a bit higher than the training time, since the data needs to be uploaded and preprocessed, but you only pay for the time the AI is actually trained on the server.

![Train 4](/img/ai/Train.png)

During the training you can see the current training progress in the ``Statistics`` tab. You can stop the training manually if you see no further improvements after a longer time of training.

### Exporting a trained Model

To test your AI model, you can export it as an AI model or as a complete project by clicking on the `Export` button.

![Export 1](/img/ai/one_ai_plugin/getting_started/export_1.png)

This opens the export window, which allows you to configure different settings for the export:
- ``Export type``: You can choose whether you want to export just the model as a file (``model``) or to export it along with execution routines in various languages either compiled as an executable binary (``executable``) or as source code (``project``).
- ``Model type``: There are different model types that can be generated:
    - ``TensorFlow``: The standard TensorFlow model format.
    - ``TensorFlow Lite``: The TensorFlow Lite format is optimized for mobile and embedded devices. You can use this for microcontrollers, FPGAs with processors and other efficient AI implementation on processors.
    - ``ONNX``: The [Open Neural Network Exchange](https://onnx.ai/) format ensures compatibility across different frameworks. It is also used by OneWare Studio for running a live preview of the model and for auto-labeling data. Currently, the ONNX export doesn't support quantized models. If you export an ONNX model, the progress of the quantization aware training will be ignored.
    - ``VHDL``: A hardware description language output that is used for bare metal FPGA implementations.
- ``Export with pre- and postprocessing``: If you select this option, the pre- and postprocessing layers are included in the exported model. This simplifies integrating the model in your existing processes and ensures consistency between training and inference.
- ``Export floating point instead of quantized model``: You have the option to always export a floating point model, even if you used quantization aware training. This means that any progress of the quantization aware training is ignored.
- ``Check last vs best model``: During the training, ONE AI saves two models: the latest and the one with the best validation metrics (excluding Non-Maximum Suppression). If you enable this option, ONE AI checks which of the two models performs best when all post-processing steps are applied. Furthermore, you are able to specify which metric you want to use for this comparison.
- ``Best model metric``: The metric that is used when comparing the best and the last model.

![Export 2](/img/ai/one_ai_plugin/getting_started/export_2.png)

After the export is finished, the model can be download in the `Exports` tab by clicking on the green arrow.

![Export 3](/img/ai/one_ai_plugin/getting_started/export_3.png)

## 10. Using Your Model in OneWare Studio
### Evaluating the Model on Live Data
You can use the ``Camera Tool`` to evaluate the performance of your model on live data. To do so, you need to export the trained model as an ONNX model. After downloading it, the model becomes available in OneWare Studio automatically. Now, you need to open the ``Camera Tool`` by clicking on ``AI`` in the menu bar and selecting ``Camera Tool``.  
In the ``Live Preview`` tab, you can select the model that you want to use as well as the camera. You also need to select whether you are using a ``Classification`` or an ``Object Detection`` model in the ``Preview Mode``. After you click on the play button, the model will start running on your local machine. If you have an object detection task, the predicted bounding boxes will be drawn directly onto the preview. For classification tasks, the predicted class is displayed in the bottom right corner.

![Camera Tool Live Preview](/img/ai/one_ai_plugin/getting_started/camera_tool_live_preview.png)

### Using the Model to Annotate New Data
You can use a trained model to predict the annotations for new images, which greatly speeds up the annotation process. To use this feature, you need to export your export and download your trained model as an ONNX model. Next, you go to the ``Dataset`` tab and click on an image to open the annotation tool. There, you click on the arrow in the top-right corner, select your model and click on the plus icon. Here, you can also configure a ``Minimum Confidence`` that is required for the predictions to be applied. Only classes and objects whose predicted confidence exceed this setting are added to the annotations.

![Generating New Annotations](/img/ai/one_ai_plugin/getting_started/auto_labeling.png)

To predict the annotation for the current image, you need to click on the ``AI`` button in the top-right corner. This automatically applies the prediction, but you can discard it by pressing the ``Reset`` button. If the model makes a wrong prediction you can correct it afterwards, which still might be faster than doing the annotation completely manually.

One common approach for speeding up the annotation process is to only annotate a part of the dataset manually. This data is used to train a model, which in turn is used to aid in the annotation of the remaining data. Depending on the size of your dataset you might even repeat these steps multiple times to improve the predicted annotations as the model is trained with more and more data.

## 11. Examples

Check out our examples like:
1. [A quality control of potato chips](/docs/one-ai/tutorials/potato-chip-demo)
2. [A detection of handwritten digits](/docs/one-ai/tutorials/handwritten-digits-demo)
3. [An object detection of dice](/docs/one-ai/tutorials/dice-demo)

If you have any questions: Don't hesitate to ask our team for help via mail: support@one-ware.com or you can ask in our [Discord for ONE WARE Studio and ONE AI](https://discord.com/invite/NCN9VAh).
This helps us as well, because we then know what tutorials we can do next. 