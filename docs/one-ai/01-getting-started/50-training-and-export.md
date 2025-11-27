---
id: training-and-export
title: Training and Exporting your AI Model
sidebar_label: Training and Export
---

> For the following steps you need to be connected to the ONE AI Cloud

Ensure that your training data is uploaded, labeled, and properly prepared. This includes applying any necessary prefilters and selecting the most effective augmentations. Once your data is ready, double-check your model and hardware settings before starting the training process

## Training a new AI Model

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

After you press on `Start Training`, you see how many Credits the training will cost. If you use early stopping, the actual costs can be less than the anticipated cost, because the training might end early if there are no further improvements. The total time is always a bit higher than the training time, since the data needs to be uploaded and preprocessed, but you only pay for the time the AI is actually trained on the server.

![Train 4](/img/ai/Train.png)

During the training you can see the current training progress in the ``Statistics`` tab. You can stop the training manually if you see no further improvements after a longer time of training.

## Exporting a trained Model

In order to test your AI model or to use it in your application you can initiate a download by clicking on the `Export` button. You have the option to export it as a model file or readily embedded in a software project. If you are missing an export option that you need for your AI project, feel free to [contact](/docs/contact) us and we will see what we can do.

![Export 1](/img/ai/one_ai_plugin/getting_started/export_1.png)

Clicking the `Export` button opens the export window.

![Export 2](/img/ai/one_ai_plugin/getting_started/export_2.png)
![Export 2-1](/img/ai/one_ai_plugin/getting_started/export_2-1.png)

This allows you to configure different settings for the export:
- ``Export type``: You can choose whether you want to export just the model as a file (``model``) or to export it along with execution routines in various languages either compiled as an executable binary (``executable``) or as source code (``project``).
- ``Model type``: There are different model types that can be generated:
    - ``TensorFlow``: The standard TensorFlow model format.
    - ``TensorFlow Lite``: The TensorFlow Lite format is optimized for mobile and embedded devices. You can use this for microcontrollers, FPGAs with processors and other efficient AI implementation on processors.
    - ``ONNX``: The [Open Neural Network Exchange](https://onnx.ai/) format ensures compatibility across different frameworks. It is also used by OneWare Studio for running a live preview of the model and for auto-labeling data. Currently, the ONNX export doesn't support quantized models. If you export an ONNX model, the progress of the quantization aware training will be ignored.
    - ``VHDL``: A hardware description language output that is used for bare metal FPGA implementations.
- ``Platform``: Specify the target platform which should run the model. Currently only Linux and FPGA are supported, others are in development. For unsupported platforms please use the direct model export or contact us. This dropdown only appears if ``export type`` is ``executable`` or ``project``.
- ``Language``: Specify the programming language for the project or executable. Currently only C++ is supported, others are in development. This dropdown only appears if ``platform`` is ``Linux``.
- ``Hardware Processing Unit``: Specify the target Processing Unit. Currently only ``CPU`` is supported, others are in development. This dropdown only appears if ``platform`` is ``Linux``.
- ``Export with pre- and postprocessing``: If you select this option, the pre- and postprocessing layers are included in the exported model. This simplifies integrating the model in your existing processes and ensures consistency between training and inference.
- ``Export floating point instead of quantized model``: You have the option to always export a floating point model, even if you used quantization aware training. This means that any progress of the quantization aware training is ignored.
- ``Check last vs best model``: During the training, ONE AI saves two models: the latest and the one with the best validation metrics (excluding Non-Maximum Suppression). If you enable this option, ONE AI checks which of the two models performs best when all post-processing steps are applied. Furthermore, you are able to specify which metric you want to use for this comparison.
- ``Best model metric``: The metric that is used when comparing the best and the last model.

After the export is finished, the model can be download in the `Exports` tab by clicking on the green arrow.

![Export 3](/img/ai/one_ai_plugin/getting_started/export_3.png)

### Export Flavors

Below is a table with all currently available export options. Each line corresponds to one export configuration. If you are missing an export option that you need for your AI project, feel free to [contact](/docs/contact) us.

<table>
  <tr>
    <th>Export type</th>
    <th>Platform</th>
    <th>Model type</th>
    <th>Language</th>
    <th>Hardware Processing Unit</th>
  </tr>
  <tr>
       <td rowspan="3">Model</td>
       <td>-</td>
       <td>TensorFlow</td>
       <td>-</td>
       <td>-</td>
     </tr>
  <tr>
       <td>-</td>
       <td>TensorFlow Lite</td>
       <td>-</td>
       <td>-</td>
     </tr>
  <tr>
       <td>-</td>
       <td>ONNX</td>
       <td>-</td>
       <td>-</td>
     </tr>
  <tr>
       <td rowspan="2">Project</td>
       <td>FPGA</td>
       <td>VHDL</td>
       <td>-</td>
       <td>-</td>
     </tr>
  <tr>
       <td>Linux</td>
       <td>TensorFlow Lite</td>
       <td>C++</td>
       <td>CPU</td>
     </tr>
  <tr>
       <td rowspan="1">Executable</td>
       <td>Linux</td>
       <td>TensorFlow Lite</td>
       <td>C++</td>
       <td>CPU</td>
     </tr>
</table>


### Integration into your Setup

In order to run the AI within your setup everything needed is an inference engine within the software corresponding to the model type (e.g. Tensorflow or ONNX-runtime).
The following flow chart depicts a possible tool chain. The colorized parts are provided by One Ware.

![Export 4](/img/ai/one_ai_plugin/getting_started/export_model_embedding_stacked.png)

When exporting a model file you can integrate our AI into your existing software solution or create your own.
When exporting a project or binary we provide the necessary runtime along with the model. A project obtained this way can easily be adapted to your needs, see also our [documentation](/docs/one-ai/documentation/documentation-cpp-api).

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Training and Export Support" />
