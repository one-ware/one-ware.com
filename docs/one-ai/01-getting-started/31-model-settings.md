---
id: model-settings
title: The Model Settings
sidebar_label: Model Settings
---

The ``Model Settings`` tab allows you to tune the model generation to your specific needs. You can make further specifications on the parameters you want to predict, e.g. whether you want to predict an objects position and size or whether you only need its position. For achieving the best results, you also need to make some estimates about your task, like specifying the expected size of objects or the overall complexity of the task.  
For a more detailed explanation, you can follow [this guide](/docs/one-ai/help/choosing-parameters-guide) on how to set the right parameters.

## Output Settings
<img src="/img/ai/one_ai_plugin/getting_started/model_settings_output.png" alt="Model Settings Output" style={{ width: '100%' }} /> 

### For Classification Tasks
- ``Classification Type``: You can select whether an image can have only one class or whether it can have multiple. Furthermore, you can choose to predict whether at least on class is present or not.

### For Object Detection Tasks
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

### Hardware Usage Settings
- ``Minimum FPS``: The minimum predictions per second the model needs to perform with hardware selected in the ``Hardware Settings`` tab.
- ``Maximum Memory Usage (%)``: You can limit the amount of memory that the predicted model will use.
- ``Maximum Multiplier Usage (%)``: You can also limit the amount of DSP elements that the predicted model can use. If you aren't using an FPGA this setting is ignored.
- ``FPGA Clock Speed (MHz)``: If you are using an FPGA, you need to provide its clock speed. Otherwise, this setting is ignored.
  
## Input Settings
To achieve the best results, you need to provide some additional information about your task. ONE AI will use this information to tailor the generated model to your individual use case.

<img src="/img/ai/one_ai_plugin/getting_started/model_settings_input_1.png" alt="Model Settings Input" style={{ width: '100%' }} />

- ``Estimated Surrounding Min Width (%)``: For this setting, you need to estimate the width of the area that the model needs to analyze to detect the smallest objects in your dataset. For classification tasks, this setting describes the width of the smallest area that the model needs to analyze to make the correct decision.
- ``Estimated Surrounding Min Height (%)``: Estimate the height of the area required to detect the smallest objects.
- ``Estimated Surrounding Max Width (%)``: Estimate the width of the area required to detect the largest objects.
- ``Estimated Surrounding Max Height (%)``: Estimate the height of the area required to detect the largest objects.
- ``Same Class Difference``: For this setting, you need to estimate how different the objects in one class are.
- ``Background Difference``: Estimate how much the backgrounds vary in the images.
- ``Detect Simplicity (%)``: Give an estimate for your task's overall difficulty.

### For Classification Tasks
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