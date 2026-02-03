---
id: camera-tool
title: Using OneWare Studio's Camera Tool
sidebar_label: Camera Tool
---
OneWare Studio has a ``Camera Tool`` that makes it possible to record images directly in OneWare Studio. It also has a ``Live Preview``, where you can test a trained model on live images from a connected camera. You can even use the ``Camera Tool`` as a quality control station.

## Adding and configuring cameras
You can access the ``Camera Tool`` by clicking on ``AI`` in the menu bar and selecting ``Camera Tool``. After you started the ``Camera Tool``, you need to add the cameras to your workspace. Select the camera that you want to use in the dropdown menu and click on the plus icon. You can add more than one camera to record multiple images simultaneously. By clicking on the play icon on the bottom of the camera window you can start and stop the live preview of that camera. To enter the camera configuration menu, you need to click on the gear icon.

![Camera Tool Selection](/img/ai/one_ai_plugin/getting_started/camera_tool/selection.webp)

The camera configuration menu allows you to customize your camera settings. In the example in the image below, we adjusted the white balance. This brightens the white background and makes it easier for the AI model to recognize the numbers. You are also able to crop the image. You can draw the area you are interested in onto the preview or set its coordinates at the bottom of the settings list by clicking on the `Change Crop` button. You can also resize your camera input after capture uniformly by either height or width, that can be seen in the capture tool.

![Camera Tool Configuration](/img/ai/one_ai_plugin/getting_started/camera_tool/configuration.webp)

You can create presets with different settings that can be exported and imported. This makes it easy to test out and share different settings. If the camera settings contain multiple presets, the ``Capture`` tool will record one image for each preset. You can use this to create multiple crops for the same image and record all of them with a single click.

You can also add a simulated camera when clicking on the ``Add simulated camera`` button on the upper right of the window. If you already have a dataset, you can simulate a camera that goes through your existing dataset with the configured FPS. This is helpful when you want to try out your trained model fast in the live preview instead of clicking through single images or if you want to apply the AI check with a rule.

## Capturing data
To record images, you need to go to the ``Capture`` tab. You can record images by clicking on the ``Capture`` Button with camera icon. This records an image from all cameras simultaneously and updates the preview showing thumbnail previews before saving. You need to select whether you want to add the image to the train, test or validation directory and click on the save icon to save them. The images are automatically named with the timestamp they were captured at, so you don't need to enter names manually. You have the option to add the images to a subdirectory and to add a suffix to the filename. You can also use "Save All" to save all captured images in the session at once.

![Capture](/img/ai/one_ai_plugin/getting_started/camera_tool/capture.webp)

### Using an AI model to generate labels
You can use an existing AI model to label the captured images as you record them. To do so, you need to export the trained model as an ONNX model. After downloading it, the model becomes available in OneWare Studio automatically. Next, you need to activate ``Enable AI Check`` in the top-right corner and select the model you want to use. After adding one model (or multiple models) with the plus icon, you can select the ``Minimum Confidence`` that the model needs to have in a prediction for it to be used. The ``Result Merging`` slider sets the threshold that determines if new predictions from the model are shown in case there is an overlapping already existing bounding box. During capture, AI predictions are executed automatically on each image and written as annotation files (.txt) alongside the images.


![capture select AI](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_select_ai.webp)

The predictions are visible in the preview and you can view them in detail in the ``Annotation Tool`` by clicking on the button next to the save icon.

![capture AI check](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_ai_check.webp)

Here, you can also correct any mistakes that were made by your model.

![capture AI prediction](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_ai_prediction.webp)

### Using the camera tool as a quality control station
The ``Camera Tool`` can be used as a quality control station. To do so, you need to select an AI model like in the previous section. You can add rules that specify when an image passes the quality control in the label list. You can use the button ``Add rule`` on the lower right of the window, to open a configuration window and add that specified rule. For each rule you can decide on which cameras and presets it is applied. After adding a new rule, you can see all rules in the table on the bottom and whether the current captures are valid as well as there are buttons to edit and delete a rule. After editing, you can press ``Retrigger`` to validate the current captures with the adapted rules. If you want to adapt your rules to the current captures you can click the ``Adjust`` button in the list for that rule and it automatically adapts the rule so that all the current captures are valid.

**Available validation rule types:**
- **Count:** Checks the number of detected objects (e.g., minimum 1, maximum 3).
- **Area:** Validates the total area covered by all detections. Useful for rejecting images where objects are too small or too large.
- **Weighted Count/Area:** Applies different validation criteria for different label classes (e.g., require at least 1 "product" but allow 0-5 "defects"). Use when different object types have different importance or frequency requirements.
- **Min Distance:** Enforces minimum distance between detected objects. Useful for quality control scenarios where proper spacing is required.

![capture AI check rules](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_ai_check_rules.webp)

In the above image, we added the rule that an image fails the AI check if there are more than two foreign objects. If there are more than two foreign objects, we get a red warning. We configured in total two rulesets for *All Cameras* and not the individual camera, so the rules are applied on all presets but each capture is validated on its own. By clicking on the ``fx`` button on a capture, you can see in detail which rules are valid for that specific image. In the rules overview table on the bottom, you can see the total validation.

If you want to use the AI check in a production line, you might prefer the fullscreen mode. You can access it by clicking on the icon in the top-right corner next to ``Enable AI Check``. Here, you have hotkeys for the different actions and can view the predictions directly in the preview, e.g. the ``Enter`` button for a simple capture.

![capture fullscreen](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_fullscreen.webp)

In the non-fullscreen mode you have subdirectory options a after you enabled the AI check, that you may use to sort your captures:

- **Save SubDirectory:** Optional subfolder for captures that **pass all validation rules** (e.g., class name for organization). Images that meet all configured validation criteria are automatically sorted into this directory, helping you organize high-quality captures.

- **Save SubDirectory Fail:** Captures that **fail validation rules** (e.g., wrong object count, insufficient area). When validation rules are configured and a capture doesn't meet the criteria, it's automatically sorted into this fail directory. This helps you separate images that don't meet quality standards without losing them completely - you can review them later or use them for different purposes.

- **Save SubDirectory False Detection:** Images manually marked as false positives during review. This is used in the fullscreen mode where your operators can save images with false detections in a separate subdirectory for further evaluation. This allows human operators to flag problematic predictions for model improvement.


## Testing models with the live preview
You can also use the ``Camera Tool`` to evaluate the performance of your model on live data. Like in the previous section, you need to export and download your model in the ONNX format. In the ``Live Preview`` tab, you can select the model that you want to use as well as the camera. You also need to select whether you are using a ``Classification`` or an ``Object Detection`` model in the ``Preview Mode``. After you click on the play button, the model will start running on your local machine. If you have an object detection task, the predicted bounding boxes will be drawn directly onto the preview. For classification tasks, the predicted class is displayed in the bottom right corner.

![Camera Tool Live Preview](/img/ai/one_ai_plugin/getting_started/camera_tool/live_preview.webp)

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Camera Tool Support" />