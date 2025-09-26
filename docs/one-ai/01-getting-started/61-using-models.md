---
id: using-models
title: Using Your Model in OneWare Studio
sidebar_label: Using Your Model
---

## Evaluating the Model on Live Data
You can use the ``Camera Tool`` to evaluate the performance of your model on live data. To do so, you need to export the trained model as an ONNX model. After downloading it, the model becomes available in OneWare Studio automatically. Now, you need to open the ``Camera Tool`` by clicking on ``AI`` in the menu bar and selecting ``Camera Tool``.  
In the ``Live Preview`` tab, you can select the model that you want to use as well as the camera. You also need to select whether you are using a ``Classification`` or an ``Object Detection`` model in the ``Preview Mode``. After you click on the play button, the model will start running on your local machine. If you have an object detection task, the predicted bounding boxes will be drawn directly onto the preview. For classification tasks, the predicted class is displayed in the bottom right corner.

![Camera Tool Live Preview](/img/ai/one_ai_plugin/getting_started/camera_tool_live_preview.png)

## Using the Model to Annotate New Data
You can use a trained model to predict the annotations for new images, which greatly speeds up the annotation process. To use this feature, you need to export your export and download your trained model as an ONNX model. Next, you go to the ``Dataset`` tab and click on an image to open the annotation tool. There, you click on the arrow in the top-right corner, select your model and click on the plus icon. Here, you can also configure a ``Minimum Confidence`` that is required for the predictions to be applied. Only classes and objects whose predicted confidence exceed this setting are added to the annotations.

![Generating New Annotations](/img/ai/one_ai_plugin/getting_started/auto_labeling.png)

To predict the annotation for the current image, you need to click on the ``AI`` button in the top-right corner. This automatically applies the prediction, but you can discard it by pressing the ``Reset`` button. If the model makes a wrong prediction you can correct it afterwards, which still might be faster than doing the annotation completely manually.

One common approach for speeding up the annotation process is to only annotate a part of the dataset manually. This data is used to train a model, which in turn is used to aid in the annotation of the remaining data. Depending on the size of your dataset you might even repeat these steps multiple times to improve the predicted annotations as the model is trained with more and more data.