---
sidebar_label:  Partners and Supported Vendors
---

# Partners and Supported Vendors

:::important
 **ONE AI works with all chip vendors. Next to tailored AI model generation for dedicated hardware, we are also providing standard outputs (e.g., HDL, code, ONNX) that can be used in almost any toolchain.**
 If your chip vendor is not listed as supported vendor and you want to onboard quickly, please contact us at **[info@one-ware.com](mailto:info@one-ware.com)**.
 :::

## Supported Chip- and Hardware Vendors

### FPGAs

| Supplier | Ways for Integration |
|---|---|
| **Altera** | Export **VHDL** or export **ONNX/TF-Lite** and integrate via **Quartus Prime and Intel FPGA AI Suite**. |
| **AMD** | Export **VHDL** or export **ONNX/TF-Lite** and integrate via **Vitis AI**. |
| **Lattice** | Export **VHDL** or export **TF-Lite** models and integrate via the **sensAI toolchain**. |
| **Microchip** | Export **VHDL** or export **Quantized TF-Lite** models and integrate via **VectorBlox Accelerator / Libero**. |
| **Efinix** | Export **VHDL** or export **ONNX** and integrate via the **Efinity toolchain** and partner AI design flows. |
| **Gowin** | Export **VHDL** or export **ONNX/TF-Lite** and integrate via **Gowin IDE** and ML toolchains. |
| **Cologne Chip** | Export **VHDL**. |
| **Other FPGA vendors** | Export **VHDL** (universal) or export **ONNX/TF-Lite** and integrate via vendor-specific FPGA tools. |

### Microcontrollers & Edge SoCs

| Supplier | Ways for Integration |
|---|---|
| **NXP** | Export **TF-Lite** and deploy via **eIQ** inference engines. |
| **STMicroelectronics** | Export **ONNX** and import via **STM32Cube.AI**. |
| **Texas Instruments** | Export **TF-Lite** and integrate via **TIDL**. |
| **Renesas** | Export **ONNX** and integrate via **DRP-AI Translator** / **e² Studio (e-AI)**. |
| **Other vendors** | Integrate via vendor-specific tools that support TF-Lite or ONNX or contact us at **[info@one-ware.com](mailto:info@one-ware.com)** so we can add support for your chip. |

### Embedded SoCs (Linux-based Application Processors)

| Supplier | Ways for Integration |
|---|---|
| **NXP** | Export **TF-Lite (quantized)**,  integrate via **eIQ** or **C++ project (source)** on Linux or use **ONNX**. |
| **Texas Instruments** | Export **TF-Lite (quantized)**, integrate via **TIDL / Edge AI SDK** or use **ONNX**. |
| **Renesas** | Export **TF-Lite (quantized)**, integrate via **DRP-AI** or use **ONNX**. |
| **STMicroelectronics** | Export **TF-Lite (quantized)** or **C++ project (source)** and run under **Linux (Yocto)** with TF-Lite runtime or Neural ART or use **ONNX**. |
| **Qualcomm** | Export **TF-Lite (quantized)**, integrate via **Qualcomm AI Engine SDK / QNN** or use **ONNX**. |
| **Other vendors** | Export **TF-Lite (quantized)**, **C++ project (source)**, **ONNX** or use vendor specific tools. |

### CPUs

| Supplier | Ways for Integration |
|---|---|
| **Intel** | Export **TF-Lite**, integrate via **OpenVINO** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **AMD** | Export **TF-Lite**, integrate via **MIVisionX** or **C++ project (exe or source, Linux)** or **ONNX Runtime (ROCm)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Arm** | Export **TF-Lite**, integrate via **TF-Lite Runtime** or **ONNX Runtime** on Linux SBCs (e.g. Raspberry Pi) or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Apple** | Export **TF-Lite**, integrate via **Core ML converters** or **TF-Lite Runtime** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Other vendors** | Export **TF-Lite**, **ONNX**, or **C++ project** (Linux), integration via vendor-specific runtime or ONE WARE Studio. |

### GPUs / TPUs / NPUs

| Supplier | Ways for Integration |
|---|---|
| **NVIDIA (CUDA GPUs & Jetson)** | Export **TF-Lite (quantized)** and integrate via **TensorRT** or ONNX Runtime or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Google (Coral Edge TPU)** | Export **TF-Lite (quantized)** and compile with **Edge TPU Compiler**. |
| **Qualcomm (Hexagon DSP / NPU)** | Export **TF-Lite (quantized)** and integrate via **QNN SDK** or use **ONNX**. |
| **Other vendors** | Export **TF-Lite** or **ONNX**, integration via vendor-specific AI SDKs. |

### Industrial Control (PLCs)

| Supplier | Ways for Integration |
|---|---|
| **Siemens** | Import **ONNX** models with **AI Model Deployer** and run directly on the TM NPU module inside the PLC. |
| **Beckhoff** | Export **ONNX** and execute via **TwinCAT Machine Learning Server**. |
| **Rockwell Automation** | Export **TF-Lite** or **ONNX**, integrate via **Studio 5000** or as containerized apps on compatible controllers. |
| **Mitsubishi Electric** | Export **TF-Lite** or **ONNX** and integrate via Mitsubishi’s software environment (iQ Works / GX Works). |
| **Schneider Electric** | Export **TF-Lite** or **ONNX**, integrate via **EcoStruxure Control Expert** or as edge/IPC container apps. |
| **ABB** | Export **TF-Lite** or **ONNX**, deploy as **Docker containers** on Linux-based Automation Runtime systems. |
| **Bosch Rexroth** | Export **TF-Lite** or **ONNX**, package into a **Docker container** and deploy via the **ctrlX Store** on the Ubuntu Core–based controller. |
| **Phoenix Contact (PLCnext)** | Export **TF-Lite** or **ONNX**, build a **Docker container** with the runtime (TF-Lite or ONNX Runtime) and integrate via **PLCnext apps** on the Linux-based controller. |
| **WAGO** | Export **TF-Lite** or **ONNX**, run inside a **Docker container** with TF-Lite or ONNX Runtime and integrate through the Linux-based WAGO edge environment. |
| **Other vendors** | Export **TF-Lite** or **ONNX**, integration via vendor-specific tools or as docker container on Linux-based PLCs. |

### Single Board Computers (SBCs)

| Supplier / Platform | Ways for Integration |
|---|---|
| **Raspberry Pi (SBC)** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **BeagleBone / BeagleV** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **NVIDIA Jetson (Nano, Xavier, Orin)** | Export **TF-Lite (quantized)**, integrate via **TensorRT** or **C++ project (exe or source, Linux)** or **ONNX Runtime** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Other SBC vendors** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |

### Industrial PCs (IPCs)

| Supplier | Ways for Integration |
|---|---|
| **Mitsubishi Electric IPCs** | Export **TF-Lite**, integrate via MELFA / iQ solutions on Linux/Windows IPCs or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Rockwell Automation IPCs** | Export **TF-Lite**, integrate via **Studio 5000** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **OMRON IPCs** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Siemens IPCs / Industrial Edge** | Export **TF-Lite**, deploy via **AI Model Deployer** or **C++ project (exe or source, Linux)** or **Industrial Edge apps** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Beckhoff IPCs** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or use **ONNX** in **TwinCAT ML** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Bosch Rexroth (ctrlX IPC)** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Phoenix Contact IPC-like Controllers (PLCnext)** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Other IPC vendors** | Export **TF-Lite** or **C++ project (exe or source, Linux)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |

## Partners

> **If you want to become a Partner of ONE WARE, please Contact us at [info@one-ware.com](mailto:info@one-ware.com).**

:::tip Our Technology Partners

### **Altera**
Technology collaboration around edge-AI on FPGAs, enablement for Quartus/NIOS V flows, reference designs and support of selected devkits.

### **Trenz Electronic**
Support of selected devkits and reference designs for edge-AI on FPGA.

### **Rendered.ai**
[Rendered.ai](https://rendered.ai/) specializes in quality synthetic image data generation and can quickly provide a physically accurate, fully labeled dataset customized to your use case.

### Accelerat
Accelerat provides advanced embedded software solutions for guaranteeing high levels of safety and security on modern cyber-physical systems. Accelerat supports One Ware ecosystem with AI Bunker: technology to protect the IPs of AI Models from theft and unauthorised access once they are deployed at the edge.

### Digikey
ONE Ware is partner of Digikey’s Design Service Provider Program to enable customers on the full solution approach. With ONE WARE highly efficient AI models, customer can build AI applications in very short time with minimized risk and use latest AI technologies for development.
:::

---

## Contact

Want to be listed here or accelerate enablement for your vendor/toolchain?  
👉 Contact us at **[info@one-ware.com](mailto:info@one-ware.com)**

---

### Legal

All product names, logos, and brands are property of their respective owners. Use of logos on this page requires prior written approval.

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Partners Support" />

