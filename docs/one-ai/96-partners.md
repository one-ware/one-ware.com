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
| **NXP** | Export **TF-Lite (quantized)** or **C++ project (exe or source)**, integrate via **eIQ** on Linux or use **ONNX**. |
| **Texas Instruments** | Export **TF-Lite (quantized)** or **C++ project (exe or source)**, integrate via **TIDL / Edge AI SDK** or use **ONNX**. |
| **Renesas** | Export **TF-Lite (quantized)** or **C++ project (exe or source)**, integrate via **DRP-AI** or use **ONNX**. |
| **STMicroelectronics** | Export **TF-Lite (quantized)** or **C++ project (exe or source)** and run under **Linux (Yocto)** with TF-Lite runtime or use **ONNX**. |
| **Qualcomm** | Export **TF-Lite (quantized)** or **C++ project (exe or source)**, integrate via **Qualcomm AI Engine SDK / QNN** or use **ONNX**. |
| **Other vendors** | Export **TF-Lite (quantized)**, **C++ project (exe or source)**, **ONNX** or use vendor specific tools. |

### CPUs

| Supplier | Ways for Integration |
|---|---|
| **Intel** | Export **TF-Lite** or **C++ project (exe or source)**, integrate via **OpenVINO** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **AMD** | Export **TF-Lite** or **C++ project (exe or source)**, integrate via **MIVisionX** or **ONNX Runtime (ROCm)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Arm** | Export **TF-Lite** or **C++ project (exe or source)**, integrate via **TF-Lite Runtime** or **ONNX Runtime** on Linux SBCs (e.g. Raspberry Pi) or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Apple** | Export **TF-Lite** or **C++ project (exe or source)**, integrate via **Core ML converters** or **TF-Lite Runtime** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Other vendors** | Export **TF-Lite**, **ONNX**, or **C++ project**, integration via vendor-specific runtime or ONE WARE Studio. |

### GPUs / TPUs / NPUs

| Supplier | Ways for Integration |
|---|---|
| **NVIDIA (CUDA GPUs & Jetson)** | Export **TF-Lite (quantized)** or **C++ project (exe or source)**, integrate via **TensorRT** or ONNX Runtime or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Google (Coral Edge TPU)** | Export **TF-Lite (quantized)** or **C++ project** and compile with **Edge TPU Compiler**. |
| **Qualcomm (Hexagon DSP / NPU)** | Export **TF-Lite (quantized)** or **C++ project**, integrate via **QNN SDK** or use **ONNX**. |
| **Other vendors** | Export **TF-Lite**, **ONNX**, or **C++ project**, integration via vendor-specific AI SDKs. |

### Industrial Control (PLCs)

| Supplier | Ways for Integration |
|---|---|
| **Siemens** | Import **ONNX** models with **AI Model Deployer** and run directly on the TM NPU module inside the PLC. |
| **Beckhoff** | Export **ONNX** and execute via **TwinCAT Machine Learning Server**. |
| **Rockwell Automation** | Export **TF-Lite**, **C++ project (exe or source)** or **ONNX**, integrate via **Studio 5000** or as containerized apps on compatible controllers. |
| **Mitsubishi Electric** | Export **TF-Lite**, **C++ project (exe or source)** or **ONNX** and integrate via Mitsubishi’s software environment (iQ Works / GX Works). |
| **Schneider Electric** | Export **TF-Lite**, **C++ project (exe or source)** or **ONNX**, integrate via **EcoStruxure Control Expert** or as edge/IPC container apps. |
| **ABB** | Export **TF-Lite**, **C++ project (exe or source)** or **ONNX**, deploy as **Docker containers** on Linux-based Automation Runtime systems. |
| **Bosch Rexroth** | Export **TF-Lite**, **C++ project (exe or source)** or **ONNX**, package into a **Docker container** and deploy via the **ctrlX Store** on the Ubuntu Core–based controller. |
| **Phoenix Contact (PLCnext)** | Export **TF-Lite**, **C++ project (exe or source)** or **ONNX**, build a **Docker container** with the runtime (TF-Lite or ONNX Runtime) and integrate via **PLCnext apps** on the Linux-based controller. |
| **WAGO** | Export **TF-Lite**, **C++ project (exe or source)** or **ONNX**, run inside a **Docker container** with TF-Lite or ONNX Runtime and integrate through the Linux-based WAGO edge environment. |
| **Other vendors** | Export **TF-Lite**, **ONNX**, or **C++ project**, integration via vendor-specific tools or as docker container on Linux-based PLCs. |

### Single Board Computers (SBCs)

| Supplier / Platform | Ways for Integration |
|---|---|
| **Raspberry Pi (SBC)** | Export **TF-Lite** or **C++ project (exe or source)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **BeagleBone / BeagleV** | Export **TF-Lite** or **C++ project (exe or source)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **NVIDIA Jetson (Nano, Xavier, Orin)** | Export **TF-Lite (quantized)** or **C++ project (exe or source)**, integrate via **TensorRT** or **ONNX Runtime** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Other SBC vendors** | Export **TF-Lite** or **C++ project (exe or source)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |

### Industrial PCs (IPCs)

| Supplier | Ways for Integration |
|---|---|
| **Mitsubishi Electric IPCs** | Export **TF-Lite** or **C++ project (exe or source)**, integrate via MELFA / iQ solutions on Linux/Windows IPCs or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Rockwell Automation IPCs** | Export **TF-Lite** or **C++ project (exe or source)**, integrate via **Studio 5000**  or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **OMRON IPCs** | Export **TF-Lite** or **C++ project (exe or source)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Siemens IPCs / Industrial Edge** | Export **TF-Lite** or **C++ project (exe or source)**, deploy via **AI Model Deployer** or **Industrial Edge apps** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Beckhoff IPCs** | Export **TF-Lite** or **C++ project (exe or source)**, use **ONNX** in **TwinCAT ML** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Bosch Rexroth (ctrlX IPC)** | Export **TF-Lite** or **C++ project (exe or source)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Phoenix Contact IPC-like Controllers (PLCnext)** | Export **TF-Lite** or **C++ project (exe or source)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |
| **Other IPC vendors** | Export **TF-Lite** or **C++ project (exe or source)** or integrate using **ONNX** in your own software or **ONE WARE Studio**. |

## Partners

> **If you want to become a Partner of ONE WARE, please Contact us at [info@one-ware.com](mailto:info@one-ware.com).**

:::tip Our Technology Partners

### **Altera**
Technology collaboration around edge-AI on FPGAs, enablement for Quartus/NIOS V flows, reference designs and support of selected devkits.

### **Trenz Electronic**
Support of selected devkits and reference designs for edge-AI on FPGA.

:::

---

## Contact

Want to be listed here or accelerate enablement for your vendor/toolchain?  
👉 Contact us at **[info@one-ware.com](mailto:info@one-ware.com)**

---

### Legal

All product names, logos, and brands are property of their respective owners. Use of logos on this page requires prior written approval.

