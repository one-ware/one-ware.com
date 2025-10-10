---
id: hardware-settings
title: Hardware Settings
sidebar_label: Hardware Settings
---

In the ``Hardware Settings``, you need to specify the target hardware that your model will be deployed on. You have the option to select a predefined hardware or to define a custom hardware. ONE AI will create a model that is optimized for your hardware and runs within the constraints that were specified in the ``Model Settings``.

## Installing hardware extensions
By default, the OneAI Extension allows you to select the hardware types ``CPU``, ``GPU`` and ``TPU``, but you have the option to install extensions for a growing list of hardware. To do so, you need to open  the ``Extension Manager`` by clicking on ``Extras`` > ``Extensions``.

![Extension Installation](/img/ai/one_ai_plugin/getting_started/installation/extension_installation.webp)

Here you need to go to the section ``Hardware`` > ``OneAI Support``, where you can install extensions for different pieces of hardware. If there is no extension for the hardware that you are using, you can contact us at info@one-ware.com, so we know which hardware to add next.

![hardware extensions](/img/ai/one_ai_plugin/getting_started/installation/hardware_extensions.png)

## Selecting a preconfigured hardware
To select a preconfigured hardware, you need to click on the button ``Open configuration dialog`` and choose the hardware configuration that you want to use. Some pieces of hardware are available with different configurations, which can be selected with the second dropdown menu. For example, there are different versions of the Altera™ Max® 10 with differing amounts of DSP blocks and memory.

![hardware extensions](/img/ai/one_ai_plugin/getting_started/hardware_settings/hardware_configuration.png)

## Specifying custom hardware
If there is no configuration available for you hardware, you can use the ``Advanced`` settings to define a custom hardware.

![advanced settings](/img/ai/one_ai_plugin/getting_started/hardware_settings/advanced_settings.png)

Here you need to specify the following characteristics of your hardware:
- ``Hardware Type``: Select the type of hardware that you are using, e.g. CPU, GPU or FPGA.
- ``Prioritize Speed Optimization``: Enable this if your hardware, such as a microcontroller, has limited computational capabilities and benefits from a prioritization of speed over memory usage.
- ``Compute Capability``: Specify the computational power of your hardware.
- ``Compute Capability Unit``: The unit you used to specify the ``Compute Capability``.
- ``8 Bit Multipliers (DSP Blocks)``: Enter the amount of 8 bit multipliers of your FPGA.
- ``8 Bit Multipliers with Sum per DSP Block``: The amount of multipliers with sum that is available on your FPGA.
- ``Prioritize Memory Optimization``: Enable this if your hardware, such as an FPGA with limited internal RAM, requires efficient memory usage for higher accuracy with fewer model parameters.
- ``Memory Limit``: Define the amount of available memory. The type of memory depends on your hardware. For example, a GPU would use its VRAM while a CPU would use the system RAM. You can look at the tooltip for more information.
- ``Memory Limit Unit``: The unit you used to specify the ``Memory Limit``.
- ``Optimize for Parallel Execution``: Select this option if you plan to implement the AI as a parallel architecture on FPGAs or ASICs.  
- ``Quantized Calculations``: Enable quantization to boost performance. This can slightly reduce accuracy but significantly increases speed. For most applications, especially on microcontrollers, TPUs, FPGAs, or ASICs, quantization is highly recommended.
- ``Bits per Value``: Set the precision level for neural network calculations.  

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Model Settings Support" />