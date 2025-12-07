---
id: documentation-fpga
title: Running ONE AI on an FPGA
sidebar_label: FPGA
---
import Link from '@docusaurus/Link';
import SupportBanner from '@site/src/components/SupportBanner';

# Running ONE AI on an FPGA

AI models created with One Ware Studio integrate seamlessly into FPGA-based systems and can be deployed in several flexible ways, depending on your performance and resource requirements. Three possible solutions are presented in the following sections.

## Vendor Tools

If your FPGA vendor offers specialized tools for AI acceleration the best way is to try and utilize those.
One Ware Studio supports [model exports](/docs/one-ai/getting-started/export) to TensorFlow Lite and ONNX, which should integrate directly with your FPGA vendor’s own toolchains. The [advanced hardware setting](/docs/one-ai/getting-started/hardware-settings#specifying-custom-hardware) options in One Ware Studio can help you to find a model best suitable for the chosen FPGA model and its capabilities. This way you can make use of their optimized integradion for the chosen hardware, while still benefiting from One Ware Studio’s model design and training capabilities. 

## VHDL Export

Through the [hardware setting](/docs/one-ai/getting-started/hardware-settings) One Ware Studio makes sure to find the best fitting model for your application. This usually leads to small and efficient models optimized for maximum performance and energy efficiency. For these models, One Ware Studio offers a dedicated VHDL export option. This generates custom hardware implementations tailored to your specific model, allowing highly parallel, low-latency inference directly in the FPGA fabric. This path is ideal for edge, real-time, or resource-constrained applications where every milliwatt and microsecond counts.

For a detailed tutorial on how to obtain and use the VHDL model check out the [VHDL Demo](/docs/one-ai/tutorials/vhdl-demo). Further implementation help for integration into your FPGA project can be found in the [VHDL documentation](/docs/one-ai/getting-started/export/FPGA/documentation-vhdl).

## Soft Core CPU

For very large or complex AI models, One Ware Studio might not be able to find a suitable model for your hardware constraints. In those cases you have the option to deploy the AI through a softcore CPUs implemented inside the FPGA. This approach lets you execute advanced models that do not fit comfortably as pure hardware accelerators, while still benefiting from the flexibility and integration advantages of FPGA-based systems. You can combine the software-style execution on softcores with custom logic around it for pre- and post-processing, signal handling, or system control.

<SupportBanner subject="ONE AI Tutorial Support" />