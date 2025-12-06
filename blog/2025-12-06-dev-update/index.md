---
slug: december-2026-devupdate
title: "DEV Update: Upcoming Release 0.8 🎅🏻"
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

<video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto' }}>
  <source src={require('./img/drive.webm').default} type="video/webm" />
</video>

<!-- truncate -->

## Annotation Tool Changes

To boost efficiency, we added some shortcuts to make manual labeling much faster. Also it is now possible to select or create labels on the go, much faster than before.

You can use the following shortcuts now:

**→ Key**: Next Picture<br/>
**← Key**: Previous Picture<br/>
**↓  Key**: Next Label<br/>
**↑  Key**: Previous Label<br/>
**R  Key**: Rectangel Tool<br/>
**C  Key**: Cursor (Selection Mode)

![Annotation Tool](img/annotation.png)



## New Training Statistics

We replaced the old plotting library with a fancy new one, check it out:

![New Plotting](img/plot.png)

## New Filter System

Having fast and accurate Prefilters is one of our biggest priorities. Before we were struggeling with performance, which is why we always applied the prefilters to the preview only. This was working quite well but had some accuracy issues.
With update 0.8.0 we have a new System in place, swapping out the CPU Filters with Fancy GPU Rendered ones! This allows us to apply the filters with full accuracy while keeping a great performance!

<video autoPlay loop muted playsInline>
  <source src={require('./img/prefilters.webm').default} type="video/webm" />
</video>

**This is an 8k image applying filters in real time**

## Segmentation

## Warnings and Recommendations


Dataset used for this post was extracted from [here](https://www.pexels.com/video/aerial-shot-of-the-road-in-the-middle-of-the-forest-during-winter-6640865/) Thanks to Olia Danilevich!