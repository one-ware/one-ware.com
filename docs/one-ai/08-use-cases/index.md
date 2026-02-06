---
id: use-cases
title: ONE AI Use Cases Overview
sidebar_label: Use Cases
---

import VideoShowcase from '@site/src/components/VideoShowcase';

Discover example use-cases where ONE AI outperforms universal AI models and even specialized solutions developed by scientists.

These demonstrations highlight how our automated architecture optimization achieves superior accuracy and efficiency, enabling high-performance AI on everything from low-power FPGAs to standard industrial PCs.

<VideoShowcase columns={2} items={[
  {
    title: "High Speed Image Classification",
    video: "/img/demos/chip.webm",
    image: "/img/ai/one_ai_plugin/use_cases/chip/defect.png",
    link: "https://cloud.one-ware.com/quick-start",
    metrics: {
      left: { value: 24, unit: " x", label: "Less Errors vs Universal AI" },
      center: { value: "Efficient", label: "AI Model" },
      right: { value: 1000, unit: " x", label: "Faster vs Universal AI", prefix: ">" },
    },
  },
  {
    title: "Video Object Detection",
    video: "/img/demos/drone.webm",
    image: "/img/demos/compare.jpg",
    link: "/docs/one-ai/use-cases/difference-detection",
    metrics: {
      left: { value: 10, unit: " x", label: "Less Errors vs YOLOv8" },
      center: { value: "Balanced", label: "AI Model" },
      right: { value: 8, unit: " x", label: "More Efficient vs YOLOv8" },
    },
  },
  {
    title: "Image Comparison AI",
    image: "/img/ai/one_ai_plugin/use_cases/pcb/pcb.png",
    link: "/docs/one-ai/use-cases/pcb",
    metrics: {
      left: { value: 6.4, unit: " x", label: "Less Errors vs Image Processing" },
      center: { value: "Advanced", label: "AI Model" },
      right: { value: 7.5, unit: " x", label: "Faster vs AI from Scientists" },
    },
  },
  {
    title: "AI with Small Dataset",
    video: "/img/demos/cup.webm",
    image: "/img/ai/one_ai_plugin/demos/tea_cup_print/demo.png",
    link: "/docs/one-ai/tutorials/teacup-print-detection",
    metrics: {
      left: { value: 100, unit: " %", label: "Accuracy" },
      center: { value: "Efficient", label: "AI Model" },
      right: { value: 16, unit: "", label: "Images for Training", startValue: 20000 },
    },
  },
  {
    title: "Simple Classification",
    video: "/img/demos/number.webm",
    image: "/img/ai/one_ai_plugin/demos/handwritten-digits/nist_sd19_examples.jpg",
    link: "https://cloud.one-ware.com/quick-start",
    metrics: {
      left: { value: 99, unit: " %", label: "Accuracy" },
      center: { value: "Efficient", label: "AI Model" },
      right: { value: 100, unit: " x", label: " Faster vs ResNet18", prefix: ">" },
    },
  },
  {
    title: "All-in-ONE Quality Control",
    image: "/img/ai/one_ai_plugin/use_cases/capture/preview.png",
    link: "/docs/one-ai/use-cases/camera-tool",
    metrics: {
      left: { value: 1, unit: "-Click", label: "Deployment", startValue: 50 },
      center: { value: "Any", label: "AI Model" },
      right: { value: 1, unit: " Day", label: "Development Time", startValue: 300, prefix: "<" },
    },
  },
]} />

## Overview

### Industry

#### [AI Quality Control in One Click](/docs/one-ai/use-cases/camera-tool)

Turn optimized AI models into a **production-ready quality control station** instantly using the Camera Tool.  
No custom UI, no hardware lock-in — just accurate AI decisions, seamless integration with cameras and PLCs, and continuous model improvement.


#### [High Speed and Efficient Edge AI](/docs/one-ai/use-cases/chip)

Use AI to detect defects in real time with extreme efficiency.  
Optimized models deployed on the Altera MAX® 10 FPGA achieve **99.5% accuracy, ultra-low latency, and minimal power consumption**, even outperforming modern GPUs.


#### [High Precision Computer Vision](/docs/one-ai/use-cases/pcb)

ONE AI's neural architecture search beats **hand-crafted neural networks** and traditional methods in PCB defect detection.  
With **98.4% accuracy** and over **7× faster inference**, ONE AI proves that smarter AI design delivers superior quality control at industrial scale.


#### [Reference-Based Object Detection](/docs/one-ai/use-cases/difference-detection)

ONE AI's **overlap difference** capability enables direct comparison between reference and test images for superior object detection.  
With **93.2% F1-Score** compared to YOLOv8's 56%, and a model **eight times smaller**, ONE AI demonstrates that multi-image comparison combined with automated architecture optimization provides significant advantages for quality control and surveillance applications.