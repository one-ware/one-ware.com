---
slug: december-2026-devupdate
title: "December DEV Update 🎅🏻"
authors: [hmennen]
tags:
  [
    OneAI,
    OneWare,
    Developer,
    VisionAI,
    QualityControl,
    Update
  ]
---

import someVideo from './img/prefilters.webm';

Greetings and welcome to the first of many upcoming dev updates, where I show some of the features that we have been working on lately and the exciting features that will be **released next friday**.

<video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', marginBottom: '5px' }}>
  <source src={require('./img/drive.webm').default} type="video/webm" />
</video>

**This demo was trained by using just 25 frames from a [video](https://www.pexels.com/video/aerial-shot-of-the-road-in-the-middle-of-the-forest-during-winter-6640865/), extracted using our [camera tool](http://localhost:3000/docs/one-ai/getting-started/camera-tool/).**

<!-- truncate -->

## Annotation Tool Changes

To boost efficiency, we added some shortcuts to make manual labeling much faster. Also it is now possible to select or create labels on the go, much faster than before.

You can use the following hotkeys now:

**→ Key**: Next Picture<br/>
**← Key**: Previous Picture<br/>
**↓  Key**: Next Label<br/>
**↑  Key**: Previous Label<br/>
**R  Key**: Rectangel Tool<br/>
**C  Key**: Cursor (Selection Mode)

![Annotation Tool](img/annotation.png)

## GPU Accelerated Prefilters

Having fast and accurate Prefilters is one of our biggest priorities. Before we were struggeling with performance, which is why we always applied the prefilters to the preview only. This was working quite well but had some accuracy issues.
With update 0.8.0 we have a new System in place, swapping out the CPU Filters with Fancy GPU Rendered ones! This allows us to apply the filters with full accuracy while keeping a great performance!

<video autoPlay loop muted playsInline>
  <source src={require('./img/prefilters.webm').default} type="video/webm" />
</video>

**This is an 8k image applying filters in real time 🔥**

## Warnings and Recommendations

Since OneWare Studio is an IDE, we have options to show Warnings and Errors in real time.
We want to use that system for OneAI too, starting with a few simple warnings to help the user get started.

![Warnings](img/warnings.png)

This system will be massively improved in the coming weeks, giving you real time assistance and recommendations on how to improve your AI.

## Rule-Based Camera AI Check

We reworked the AI Check in the Camera Tool, allowing for more flexibility. It is possible to add rules to validate each capture. As of now you can automatically check for the following:

- **Count**: Define Min/Max Count of Objects
- **Area**: Define Min/Max Area (in pixels) for Detections
- **Weighted** Count: Same as Count but more advanced, allowing to set weights for each detection
- **Weighted** Area: Same as Area but more advanced, allowing to set weights for each detection
- **Min-Distance**: Ensures a Minimum Distance between Detections

![AI Check](img/ai-check.png)

The **remote-control** makes it possible to easily implement an automatic AI Check and even control external hardware, directly from our Software. If you are interested in this, need some additional features or would like to have a version that runs independently from OneWare Studio to be used in Production, please write us at <a href="mailto:info@one-ware.com">info@one-ware.com</a>

## New Training Statistics

We replaced the old plotting library with a fancy new one, check it out:

![New Plotting](img/plot.png)

## NEXT Dev Update: Segmentation

Stay tuned for another post next weekend where I showcase the new segmentation annotations.

![Segmentation](img/segmentation.png)
