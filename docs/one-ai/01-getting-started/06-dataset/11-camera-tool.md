---
id: camera-tool
title: Using OneWare Studio's Camera Tool
sidebar_label: Camera Tool
---
OneWare Studio has a ``Camera Tool`` that makes it possible to record images directly in OneWare Studio. It also has a ``Live Preview``, where you can test a trained model on live images from a connected camera. You can even use the ``Camera Tool`` as a quality control station.

## Adding and configuring cameras
You can access the ``Camera Tool`` by clicking on ``AI`` in the menu bar and selecting ``Camera Tool``. After you started the ``Camera Tool``, you need to add the cameras to your workspace. Select the camera that you want to use in the dropdown menu and click on the plus icon. You can add more than one camera to record multiple images simultaneously. By clicking on the play icon on the bottom of the camera window you can start and stop the live preview of that camera. To enter the camera configuration menu, you need to click on the gear icon.

![Camera Tool Selection](/img/ai/one_ai_plugin/getting_started/camera_tool/selection.png)

The camera configuration menu allows you to customize your camera settings. In the example in the image below, we increased the camera's brightness and contrast. This brightens the white background and makes it easier for the AI model to recognize the numbers. You are also able to crop the image. You can draw the area you are interested in onto the preview or set its coordinates at the bottom of the settings list by clicking on the `Change Crop` button. You can also resize your camera input after capture uniformly by either height or width, that can be seen in the capture tool.

![Camera Tool Configuration](/img/ai/one_ai_plugin/getting_started/camera_tool/configuration.png)

You can create presets with different settings that can be exported and imported. This makes it easy to test out and share different settings. If the camera settings contain multiple presets, the ``Capture`` tool will record one image for each preset. You can use this to create multiple crops for the same image and record all of them with a single click.

:::tip Creating Dataset Variance
Create minimum 3-5 presets per camera with different crops and scales to increase dataset diversity. Use varying resize settings across presets to help the model generalize to different image sizes. Different crops help the model learn to recognize objects at various positions in the frame.
:::

You can also add a simulated camera when clicking on the ``Add simulated camera`` button on the upper right of the window. If you already have a dataset, you can simulate a camera that goes through your existing dataset with the configured FPS. This is helpful when you want to try out your trained model fast in the live preview instead of clicking through single images or if you want to apply the AI check with a rule.


## Capturing data
To record images, you need to go to the ``Capture`` tab. You can record images by clicking on the ``Capture`` Button with camera icon. This records an image from all cameras simultaneously and updates the preview showing thumbnail previews before saving. You need to select whether you want to add the image to the train, test or validation directory and click on the save icon to save them. The images are automatically named with the timestamp they were captured at, so you don't need to enter names manually. You have the option to add the images to a subdirectory and to add a suffix to the filename. You can also use "Save All" to save all captured images in the session at once.

:::tip Batch Processing Workflow
Collect multiple captures in a session (20-50 images) before saving. Review preview thumbnails to assess capture quality, delete invalid captures using the X-button on individual thumbnails, then save all approved captures at once with "Save All" for efficiency.
:::

![Capture](/img/ai/one_ai_plugin/getting_started/camera_tool/capture.png)

### Using an AI model to generate labels
You can use an existing AI model to label the captured images as you record them. To do so, you need to export the trained model as an ONNX model. After downloading it, the model becomes available in OneWare Studio automatically. Next, you need to activate ``Enable AI Check`` in the top-right corner and select the model you want to use. After adding one model (or multiple models) with the plus icon, you can select the ``Minimum Confidence`` that the model needs to have in a prediction for it to be used. During capture, AI predictions are executed automatically on each image and written as annotation files (.txt) alongside the images.

:::info Manual Annotation
Captured images can be manually annotated directly, even without a trained model. Use this approach when no AI model exists yet, when AI Check results are unsatisfactory, or when you need precise human-verified annotations for critical quality data.
:::

![capture select AI](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_select_ai.png)

The predictions are visible in the preview and you can view them in detail in the ``Annotation Tool`` by clicking on the button next to the save icon.

![capture AI check](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_ai_check.png)

Here, you can also correct any mistakes that were made by your model.

![capture AI prediction](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_ai_prediction.png)

### Using the camera tool as a quality control station
The ``Camera Tool`` can be used as a quality control station. To do so, you need to select an AI model like in the previous section. You can add rules that specify when an image passes the quality control in the label list. You can use the button ``Add rule`` on the lower right of the window, to open a configuration window and add that specified rule. For each rule you can decide on which cameras and presets it is applied. After adding a new rule, you can see all rules in the table on the bottom and whether the current captures are valid as well as there are buttons to edit and delete a rule.

**Available validation rule types:**
- **Count:** Checks the number of detected objects (e.g., minimum 1, maximum 3). Use this to ensure the captured scene contains the expected number of items.
- **Area:** Validates the total area covered by all detections. Useful for rejecting images where objects are too small or too large.
- **Weighted Count/Area:** Applies different validation criteria for different label classes (e.g., require at least 1 "product" but allow 0-5 "defects"). Use when different object types have different importance or frequency requirements.
- **Min Distance:** Enforces minimum distance between detected objects. Useful for quality control scenarios where proper spacing is required.
- **Adjust function:** After capturing the first images, validation rule parameters can be automatically optimized based on the actual detection values from those captures.

:::tip Configuring Validation Rules
Start without rules to understand baseline detection behavior. After initial captures, use the automatic "Adjust" function to optimize rule parameters. Then iterate: adjust rules → test captures → review results → refine rules. Combine multiple rule types (Count + Area + Min Distance) for comprehensive validation.
:::

![capture AI check rules](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_ai_check_rules.png)

In the above image, we added the rule that an image fails the AI check if at least one foreign object is visible. Since there are two foreign objects, we get a red warning. You might wonder why the image has a green border. This is because we only configured a ruleset for *All Cameras* and not the individual camera. Since the check for the individual camera is passing, its border is green instead of red.

If you want to use the AI check in a production line, you might prefer the fullscreen mode. You can access it by clicking on the icon in the top-right corner that was marked in the previous image. Here, you have hotkeys for the different actions and can view the predictions directly in the preview.

![capture fullscreen](/img/ai/one_ai_plugin/getting_started/camera_tool/capture_fullscreen.png)

You might have noticed that additional subdirectory options are now available in the ``Capture`` tab after you enabled the AI check:

- **Save SubDirectory:** Optional subfolder for captures that **pass all validation rules** (e.g., class name for organization). Images that meet all configured validation criteria are automatically sorted into this directory, helping you organize high-quality captures.

- **Save SubDirectory Fail:** Captures that **fail validation rules** (e.g., wrong object count, insufficient area). When validation rules are configured and a capture doesn't meet the criteria, it's automatically sorted into this fail directory. This helps you separate images that don't meet quality standards without losing them completely - you can review them later or use them for different purposes.

- **Save SubDirectory False Detection:** Images manually marked as false positives during review. This is used in the fullscreen mode where your operators can save images with false detections in a separate subdirectory for further evaluation. This allows human operators to flag problematic predictions for model improvement.


## Testing models with the live preview
You can also use the ``Camera Tool`` to evaluate the performance of your model on live data. Like in the previous section, you need to export and download your model in the ONNX format. In the ``Live Preview`` tab, you can select the model that you want to use as well as the camera. You also need to select whether you are using a ``Classification`` or an ``Object Detection`` model in the ``Preview Mode``. After you click on the play button, the model will start running on your local machine. If you have an object detection task, the predicted bounding boxes will be drawn directly onto the preview. For classification tasks, the predicted class is displayed in the bottom right corner.

![Camera Tool Live Preview](/img/ai/one_ai_plugin/getting_started/camera_tool/live_preview.png)

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Camera Tool Support" />