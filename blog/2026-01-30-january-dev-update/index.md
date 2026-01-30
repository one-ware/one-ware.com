---
slug: january-2026-dev-update
title: "Getting Started with OneAI never was easier!"
authors: [hmennen]
tags:
  [
    OneAI,
    OneWare,
    Developer,
    VisionAI,
    QualityControl,
    Update,
    EasyMode,
    QuickStart
  ]
---

Hello and welcome to the first dev update of this year! As you read in the title, we made getting started with One AI much easier!

<video autoPlay loop muted playsInline style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 auto', marginBottom: '5px' }}>
  <source src={require('./img/quick-start.webm').default} type="video/webm" />
</video>

**Using the new Quick-Start feature, you can get started with One AI in just three steps!**

1. [Create an OneWare Account](https://cloud.one-ware.com/Account/Register?ReturnUrl=%2Fquick-start)
1. [Follow the Instructions](https://one-ware.com/docs/one-ai/getting-started/installation#1-download-and-install-oneware-studio) to install OneWare Studio
2. [Chose a quick start project](https://cloud.one-ware.com/quick-start) and Click on **Open in OneWare Studio**

<!-- truncate -->

After that you should have OneWare Studio, the OneAI Extension and everything ready to get started! Explore the project, try out some settings and start creating your own models.

## Create Projects quicker with Light Mode

Since many of the OneAI Settings can make getting started difficult, we decided to implement a light mode. This will be the default for new projects, but its also possible to **switch back to Expert Mode** anytime from the menu at `AI` -> `Capability Mode`

![Capability Mode](img/capability-mode.png)

This new mode replaces many of the complicated settings for fewer, caerfully selected and easy to understand options.

## Monthly Credits

As you may have noticed already, **everyone now has 5000 Free Monthly Credits**. These expire at the end of each month, so we recommend to use them wisely 😉

![Monthly Credits](img/monthly.png)

## Support for Linux-Arm

We just released OneWare Studio and our OneAI Extension for the linux-arm64 platform on both [Flatpak](https://flathub.org/en/apps/com.one_ware.OneWare) aswell as [Snap](https://snapcraft.io/oneware).

[![Get it from Flathub](https://flathub.org/api/badge?locale=en)](https://flathub.org/apps/com.one_ware.OneWare)
[![Get it from the Snap Store](https://snapcraft.io/static/images/badges/en/snap-store-black.svg)](https://snapcraft.io/oneware)

To celebrate this, I used my lunch break to create a quick **Rasperry Detection on my Rasperry Pie**.

![Rasperry Detection on Rasperry Pie](img/setup.webp)
**This demo was trained using just 14 captures from the Rasperry Pie camera, captured directly in OneWare Studio using the [camera tool](/docs/one-ai/getting-started/dataset/camera-tool/).**

:::success Quick Tip
Sometimes you don't need a fancy and expensive setup, a simple cardboard box can be enough to create a nice camera booth. 📹
:::

Since OneWare Studio now runs on linux-arm64, you can simply get it from Flatpak and run it there.

![Screenshot](img/screenshot.png)
**Even when using a loopback camera, the Rasperry PI is powerful enough to run this Demo at up to 60FPS just using the CPU (or maybe OneAI Models are just very quick 🔥).**

## Video Import Tool

To help you with creating your own dataset, it is now possible to import a video file directly from your project.

![Video Import Tool](img/videoimport.png)

Simply select **Import Video** from the Import Button in your Dataset Tab.
![Video Import Tool Selection](img/import-selection.png)



