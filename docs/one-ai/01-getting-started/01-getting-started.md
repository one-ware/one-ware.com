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

---

## 7. Model Settings
The ``Model Settings`` tab allows you to tune the model generation to your specific needs. You can make further specifications on the parameters you want to predict, e.g. whether you want to predict an objects position and size or whether you only need its position. For achieving the best results, you also need to make some estimates about your task, like specifying the expected size of objects or the overall complexity of the task.  
For a more detailed explanation, you can follow [this guide](/docs/one-ai/help/choosing-parameters-guide) on how to set the right parameters.

### Output Settings
<img src="/img/ai/one_ai_plugin/getting_started/model_settings_output.png" alt="Model Settings Output" style={{ width: '100%' }} /> 

#### For Classification Tasks
- ``Classification Type``: You can select whether an image can have only one class or whether it can have multiple. Furthermore, you can choose to predict whether at least on class is present or not.

#### For Object Detection Tasks
- ``Prediction Type``: You can choose from multiple different options what parameters your model needs to predict. If you need to predict fewer parameters, ONE AI is able to generate a simpler model that requires fewer computations.
    - ``Size, Position and Class of Objects``: The model predicts the size, position and class for each detected object.
    - ``Position and Class of Objects``: The model only predicts the position and class of detected objects. This setting is useful when you already know the size of the objects, e.g. because they are filmed on a conveyor belt and always have the same size.
    - ``All Present Object-Classes``: The model only predicts whether different objects are present in the image but provides no further information. This option might be used for quality control to detect the presence of different types of defects.
    - ``Class with Largest Combined Object Area``: The model predicts the object class that occupies the largest combined area within the image.
    - ``Class with Most Objects``: The model predicts the object class that appears in the image the most.
    - ``At Least One Object? (Y/N)``: The model predicts whether at least one object is present in the image or not.
- ``X/Y Precision (%)``: You can set a precision level for the predicting object position. Choosing a lower precision increases the speed of the model and helps it to generalize better. By reducing the precision, you effectively reduce the resolution of its predictions. For example, if you set the X/Y precision to 25%, only every fourth pixel can be chosen as the position of a detected object.
- ``Allow Overlap``: You can decide whether multiple objects that fall into the same grid cell are detected separately or merged together.
- ``Size Precision (%)``: By setting the size precision, you can directly control the amount of computations that are spent on predicting the object's size. A higher precision improves the predictions but increases the computational load.
- ``Prioritize Precision``: You can adjust the model's balance between false positives and false negatives. For example, if it is important for your use case to detect a defect in almost all cases and it's acceptable to have some false detections, you should lower this setting. If you want to have a balanced approach, you should set it to 50%.

#### Hardware Usage Settings
- ``Minimum FPS``: The minimum predictions per second the model needs to perform with hardware selected in the ``Hardware Settings`` tab.
- ``Maximum Memory Usage (%)``: You can limit the amount of memory that the predicted model will use.
- ``Maximum Multiplier Usage (%)``: You can also limit the amount of DSP elements that the predicted model can use. If you aren't using an FPGA this setting is ignored.
- ``FPGA Clock Speed (MHz)``: If you are using an FPGA, you need to provide its clock speed. Otherwise, this setting is ignored.
  
### Input Settings
To achieve the best results, you need to provide some additional information about your task. ONE AI will use this information to tailor the generated model to your individual use case.

<img src="/img/ai/one_ai_plugin/getting_started/model_settings_input_1.png" alt="Model Settings Input" style={{ width: '100%' }} />

- ``Estimated Surrounding Min Width (%)``: For this setting, you need to estimate the width of the area that the model needs to analyze to detect the smallest objects in your dataset. For classification tasks, this setting describes the width of the smallest area that the model needs to analyze to make the correct decision.
- ``Estimated Surrounding Min Height (%)``: Estimate the height of the area required to detect the smallest objects.
- ``Estimated Surrounding Max Width (%)``: Estimate the width of the area required to detect the largest objects.
- ``Estimated Surrounding Max Height (%)``: Estimate the height of the area required to detect the largest objects.
- ``Same Class Difference``: For this setting, you need to estimate how different the objects in one class are.
- ``Background Difference``: Estimate how much the backgrounds vary in the images.
- ``Detect Simplicity (%)``: Give an estimate for your task's overall difficulty.

#### For Classification Tasks
If you are training a classification model, you need to provide some additional information:

<img src="/img/ai/one_ai_plugin/getting_started/model_settings_input_2.png" alt="Model Settings Input" style={{ width: '100%' }} />

- ``Estimated Min Object Width (%)``: Estimate the width of the smallest area that the model needs to analyze to make the correct decision.
- ``Estimated Min Object Height (%)``: Estimate the height of the smallest area relevant for the classification.
- ``Estimated Average Object Width (%)``: Estimate the width of the average area relevant for the classification.
- ``Estimated Average Object Height (%)``: Estimate the height of the average area relevant for the classification.
- ``Estimated Max Object Width (%)``: Estimate the width of the largest area relevant for the classification.
- ``Estimated Max Object Height (%)``: Estimate the height of the largest area relevant for the classification.
- ``Maximum Number of Features for Classification``: This setting describes the maximum number of image features that may be relevant for a classification task.
- ``Average Number of Features for Classification``: The average number of relevant features used for the classification.
- ``Groups`` (also available for object detection tasks): This setting is intended for advanced users. We recommend leaving all classes in one group unless you know what you are doing. By splitting the classes into multiple groups, you can divide your task onto multiple sub-models. ONE AI will generate an individual sub-model for each group that only predicts the classes that belong to that group. The sub-models are then joined to create a single unified model. This approach is practical if you have objects with significantly different sizes, e.g. long scratches and small nicks. By dividing the task onto sub-models, one model can focus on the large defects while the other focuses on the tiny defects.

---

## 8. Hardware Settings
The ``Hardware Settings`` tab allows you to specify the target hardware that your model will be deployed on. You have the option to select a predefined hardware or to define custom hardware resources. ONE AI will create a model that is optimized for your hardware and will run within the constraints that were specified in the ``Model Settings``.

![Hardware](/img/ai/one_ai_plugin/getting_started/hardware_settings.webp)

The important settings are just the `Hardware Type`, the `Compute Capability` how fast your hardware can do calculations and the `Memory Limit` how much RAM is available for the calculations.
`Quantized Calculations` are important as well when you want to export to a microcontroller, TPU or FPGA. 

### Used Hardware
You have the option to select select a preconfigured hardware. If you want to use a different hardware, you can select ``Custom`` and enter the hardware specifications in the advanced settings.

### Advanced Settings
- ``Hardware Type``: Select the hardware type:
- ``Prioritize Speed Optimization``: Enable this if your hardware, such as a microcontroller, has limited computational capabilities and benefits from a prioritization of speed over memory usage.
- ``Compute Capability``: Specify the computational power of your hardware.
- ``Compute Capability Unit``: The unit you used to specify the ``Compute Capability``.
- ``8 Bit Multipliers (DSP Blocks)``: Define the amount of 8 bit multipliers of your FPGA.
- ``8 Bit Multipliers with Sum per DSP Block``: The amount of multipliers with sum that is available on your FPGA.
- ``Prioritize Memory Optimization``: Enable this if your hardware, such as an FPGA with limited internal RAM, requires efficient memory usage for higher accuracy with fewer model parameters.
- ``Memory Limit``: Define the amount of available memory. The type of memory depends on your hardware. For example, a GPU would use its VRAM while a CPU would use the system RAM. You can look at the tooltip for more information.
- ``Memory Limit Unit``: The unit you used to specify the ``Memory Limit``.
- ``Optimize for Parallel Execution``: Select this option if you plan to implement the AI as a parallel architecture on FPGAs or ASICs.  
- ``Quantized Calculations``: Enable quantization to boost performance. This can slightly reduce accuracy but significantly increases speed. For most applications, especially on microcontrollers, TPUs, FPGAs, or ASICs, quantization is highly recommended.
- ``Bits per Value``: Set the precision level for neural network calculations.  

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