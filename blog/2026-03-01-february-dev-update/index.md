---
slug: february-2026-dev-update
title: "Dev Update: Smart Labeling"
authors: [hmennen, mschanzenbach]
tags:
  [
    One AI,
    Developer,
    VisionAI,
    QualityControl,
    Update,
    SAM3,
    AIWizard,
    Segmentation,
    Dataset
  ]
---

Hello and welcome to the February dev update!

This February we have made huge progress in ONE AI with new features focused on making dataset creation and AI development faster and more intuitive.

<video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', marginBottom: '5px' }}>
  <source src={require('./img/sam-preview.webm').default} type="video/webm" />
</video>
**You can label datasets in ONE AI directly with a locally running Segment Anything Model!**

<!-- truncate -->

## Smart Labeling

By using Metas Open-Source Model SAM v3, you can create datasets much faster.
Simply open the SAM tool in the annotation window and type the object that you want to detect, and after a few seconds of processing you will have pixel perfect segmentations of them.
The SAM Models are executed directly on your machine, so we have multiple different models to chose from to fit your hardware. Alternatively you can select the smart fill brush, draw a
bounding box around your target and select the label. SAM will automatically detect the shape and draws the segmentation for you.

## AI Wizard

Building AI-powered workflows can sometimes feel overwhelming. To make the process smoother and more intuitive, we built the AI Wizard.


The AI Wizard is a guided setup experience inside OneWare Studio AI that helps you create and configure your AI project from start to finish.
Instead of navigating multiple menus or wondering which step comes next, the Wizard provides a clear path forward. It is divided into different sections, where
each section provides a report of the current progress, possible issues, guided actions and helpful documentation links. This helps new users to get started quickly and
get comfortable with the software. Independent of the experience, the user benefits from a guided way creating his powerful custom AI model 
as easy as possible.

### How to use the AI Wizard?

To access the AI Wizard, simply click on the "AI Wizard" button in the right sidebar.

![wizard_001](img/wizard_001.png)

The Wizard will appear initially with the Dataset section. If you are satisfied with
the progress report (or section in general) and don't have any issues, you can click on the "Next" button to move to the next section. The progress will be saved in your ONE AI
project location.

![wizard_002](img/wizard_002.png)

## ONNX Runtimes



## Segmentation Live Preview

With the new Semantic Segmentation Live Preview, you can instantly see your model in action using your camera.

Simply select a camera, and the system runs your segmentation model on the live video stream, displaying the predicted segmentation directly in real time. This allows you to quickly test how your model performs in real-world conditions without capturing or uploading images first.

To ensure a smooth and responsive experience, the preview uses advanced shaders for real-time rendering, enabling fast visualization even during continuous video processing.

The Live Preview makes it easy to validate results, spot issues early, and iterate faster while developing your computer vision project.

<video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', marginBottom: '5px' }}>
  <source src={require('./img/segmentation-live-preview.webm').default} type="video/webm" />
</video>

## Video Record Feature

Collecting image data for computer vision projects often requires multiple steps: recording footage, extracting frames, and uploading images to your dataset.

With the new Video Record feature, this process becomes much simpler.

You can record a video directly from your camera and automatically import its frames into your dataset. Once the recording is finished, the frames are extracted and added as images, ready to be reviewed and annotated.

This makes it easy to quickly capture real-world scenarios and turn them into training data without leaving the platform.

<video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', marginBottom: '5px' }}>
  <source src={require('./img/video-record-feature.webm').default} type="video/webm" />
</video>

## Dataset Bulk Actions

Managing datasets is one of the most time-consuming parts of building computer vision models. Large numbers of images need to be reviewed, labeled, organized, and cleaned before training can even begin.

To make this process faster and more efficient, we’re introducing Bulk Actions - a new feature that lets you perform common dataset operations on many images at once.

With Bulk Actions, you can:

+ Automatically label images using SAM or ONE AI
+ Move images between datasets or folders
+ Delete images
+ Remove annotations

By enabling automatic labeling with SAM and ONE AI, you can bootstrap annotations quickly and focus your effort where it matters most—improving models and building intelligent applications.

Bulk Actions are available now, helping you move from raw images to ready-to-train datasets faster than ever.

![bulk_actions_001](img/bulk-actions_001.png)