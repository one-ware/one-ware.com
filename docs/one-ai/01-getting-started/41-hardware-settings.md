---
id: hardware-settings
title: Hardware Settings
sidebar_label: Hardware Settings
---

The ``Hardware Settings`` tab allows you to specify the target hardware that your model will be deployed on. You have the option to select a predefined hardware or to define custom hardware resources. ONE AI will create a model that is optimized for your hardware and will run within the constraints that were specified in the ``Model Settings``.

![Hardware](/img/ai/one_ai_plugin/getting_started/hardware_settings.webp)

The important settings are just the `Hardware Type`, the `Compute Capability` how fast your hardware can do calculations and the `Memory Limit` how much RAM is available for the calculations.
`Quantized Calculations` are important as well when you want to export to a microcontroller, TPU or FPGA. 

### Used Hardware
You have the option to select select a preconfigured hardware. If you want to use a different hardware, you can select ``Custom`` and enter the hardware specifications in the advanced settings.

### Advanced Settings
- ``Hardware Type``: Select the hardware type:
- ``Prioritize Speed Optimization``: Enable this if your hardware, such as a microcontroller, has limited computational capabilities and benefits from a prioritization of speed over memory usage.
- ``Compute Capability``: Specify the computational power of your hardware.
- ``Compute Capability Unit``: The unit you used to specify the ``Compute Capability``.
- ``8 Bit Multipliers (DSP Blocks)``: Define the amount of 8 bit multipliers of your FPGA.
- ``8 Bit Multipliers with Sum per DSP Block``: The amount of multipliers with sum that is available on your FPGA.
- ``Prioritize Memory Optimization``: Enable this if your hardware, such as an FPGA with limited internal RAM, requires efficient memory usage for higher accuracy with fewer model parameters.
- ``Memory Limit``: Define the amount of available memory. The type of memory depends on your hardware. For example, a GPU would use its VRAM while a CPU would use the system RAM. You can look at the tooltip for more information.
- ``Memory Limit Unit``: The unit you used to specify the ``Memory Limit``.
- ``Optimize for Parallel Execution``: Select this option if you plan to implement the AI as a parallel architecture on FPGAs or ASICs.  
- ``Quantized Calculations``: Enable quantization to boost performance. This can slightly reduce accuracy but significantly increases speed. For most applications, especially on microcontrollers, TPUs, FPGAs, or ASICs, quantization is highly recommended.
- ``Bits per Value``: Set the precision level for neural network calculations.  

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Model Settings Support" />