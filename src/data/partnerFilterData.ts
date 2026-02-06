import type { PartnerFilterData } from '../types/partnerFilterTypes';

export const partnerFilterData: PartnerFilterData = {
  fpga: {
    label: 'FPGA',
    vendors: {
      altera: {
        name: 'Altera',
        supportedOS: ['none'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'Direct integration in ONE WARE Studio',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'Intel FPGA AI Suite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'TF-Lite',
              toolchain: 'Intel FPGA AI Suite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'VHDL',
              toolchain: 'Quartus Prime',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
              tutorialLink: '/docs/one-ai/demos/overview',
            },
          ],
        },
      },
      amd: {
        name: 'AMD',
        supportedOS: ['none'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'Direct integration in ONE WARE Studio',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'Vitis AI',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'TF-Lite',
              toolchain: 'Vitis AI',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'VHDL',
              toolchain: 'Vivado / Vitis',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
            },
          ],
        },
      },
      lattice: {
        name: 'Lattice',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'sensAI Toolchain',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'VHDL',
              toolchain: 'Lattice Diamond / Radiant',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
            },
          ],
        },
      },
      microchip: {
        name: 'Microchip',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'VectorBlox Accelerator / Libero',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'VHDL',
              toolchain: 'Libero SoC',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
            },
          ],
        },
      },
      efinix: {
        name: 'Efinix',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'Efinity Toolchain',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'VHDL',
              toolchain: 'Efinity IDE',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
            },
          ],
        },
      },
      gowin: {
        name: 'Gowin',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'Gowin IDE',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'TF-Lite',
              toolchain: 'Gowin ML Toolchains',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'VHDL',
              toolchain: 'Gowin IDE',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
            },
          ],
        },
      },
      cologne_chip: {
        name: 'Cologne Chip',
        supportedOS: ['none'],
        integrations: {
          fast_inference: [
            {
              format: 'VHDL',
              toolchain: 'Cologne Chip Toolchain',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
            },
          ],
        },
      },
      other_fpga: {
        name: 'Other FPGA Vendors',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'Vendor-specific Tools',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'TF-Lite',
              toolchain: 'Vendor-specific Tools',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'VHDL',
              description: 'Universally applicable',
              docLink: '/docs/one-ai/documentation/integration/fpga-deployment',
            },
          ],
        },
      },
    },
  },

  microcontroller: {
    label: 'Microcontroller',
    vendors: {
      nxp: {
        name: 'NXP',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'eIQ Inference Engines',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      stmicroelectronics: {
        name: 'STMicroelectronics',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'STM32Cube.AI',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      texas_instruments: {
        name: 'Texas Instruments',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'TIDL',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      renesas: {
        name: 'Renesas',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'DRP-AI Translator / e² Studio (e-AI)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      other_mcu: {
        name: 'Other Vendors',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Vendor-specific Tools',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Vendor-specific Tools',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
    },
  },

  embedded_soc: {
    label: 'Embedded SoC (Linux)',
    vendors: {
      nxp: {
        name: 'NXP',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'eIQ',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      texas_instruments: {
        name: 'Texas Instruments',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'TIDL / Edge AI SDK',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      renesas: {
        name: 'Renesas',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'DRP-AI',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      stmicroelectronics: {
        name: 'STMicroelectronics',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'Linux (Yocto) / Neural ART',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      qualcomm: {
        name: 'Qualcomm',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'Qualcomm AI Engine SDK / QNN',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      other_soc: {
        name: 'Other Vendors',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'Vendor-specific Tools',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
    },
  },

  cpu: {
    label: 'CPU',
    vendors: {
      intel: {
        name: 'Intel',
        supportedOS: ['windows', 'linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'TF-Lite',
              toolchain: 'OpenVINO',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      amd_cpu: {
        name: 'AMD',
        supportedOS: ['windows', 'linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'ONNX Runtime (ROCm)',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'TF-Lite',
              toolchain: 'MIVisionX',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      arm: {
        name: 'ARM',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'TF-Lite Runtime',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'ONNX Runtime',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
          ],
        },
      },
      apple: {
        name: 'Apple',
        supportedOS: ['mac'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Core ML Converters / TF-Lite Runtime',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
          ],
        },
      },
      other_cpu: {
        name: 'Other Vendors',
        supportedOS: ['windows', 'linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'TF-Lite Runtime',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
    },
  },

  gpu_tpu_npu: {
    label: 'GPU / TPU / NPU',
    vendors: {
      nvidia: {
        name: 'NVIDIA (CUDA GPUs & Jetson)',
        supportedOS: ['linux', 'windows'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'ONNX Runtime',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'TensorRT',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      google_coral: {
        name: 'Google (Coral Edge TPU)',
        supportedOS: ['linux'],
        integrations: {
          fast_inference: [
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'Edge TPU Compiler',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      qualcomm_npu: {
        name: 'Qualcomm (Hexagon DSP / NPU)',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'QNN SDK',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'QNN SDK',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      other_gpu: {
        name: 'Other Vendors',
        supportedOS: ['linux', 'windows'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Vendor-specific AI SDKs',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
          ],
        },
      },
    },
  },

  plc: {
    label: 'PLC (Industrial Control)',
    vendors: {
      siemens: {
        name: 'Siemens',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'AI Model Deployer (TM NPU Modul)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      beckhoff: {
        name: 'Beckhoff',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'TwinCAT Machine Learning Server',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      rockwell: {
        name: 'Rockwell Automation',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Studio 5000',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Containerized Apps',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      mitsubishi: {
        name: 'Mitsubishi Electric',
        supportedOS: ['none'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'iQ Works / GX Works',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'iQ Works / GX Works',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      schneider: {
        name: 'Schneider Electric',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'EcoStruxure Control Expert',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Edge/IPC Container Apps',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      abb: {
        name: 'ABB',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Docker Container',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Docker Container (Automation Runtime)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      bosch_rexroth: {
        name: 'Bosch Rexroth',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Docker Container / ctrlX Store',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Docker Container / ctrlX Store',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      phoenix_contact: {
        name: 'Phoenix Contact (PLCnext)',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Docker Container / PLCnext Apps',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Docker Container / PLCnext Apps',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      wago: {
        name: 'WAGO',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Docker Container (WAGO Edge)',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Docker Container (WAGO Edge)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      other_plc: {
        name: 'Other Vendors',
        supportedOS: ['linux'],
        integrations: {
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Docker Container',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'Docker Container',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
    },
  },

  sbc: {
    label: 'Single Board Computer',
    vendors: {
      raspberry_pi: {
        name: 'Raspberry Pi',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build (exe or source)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      beaglebone: {
        name: 'BeagleBone / BeagleV',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build (exe or source)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      nvidia_jetson: {
        name: 'NVIDIA Jetson (Nano, Xavier, Orin)',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'ONNX',
              toolchain: 'ONNX Runtime',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'TF-Lite (quantized)',
              toolchain: 'TensorRT',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build (exe or source)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      other_sbc: {
        name: 'Other SBC Vendors',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build (exe or source)',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
    },
  },

  ipc: {
    label: 'Industrial PC',
    vendors: {
      mitsubishi_ipc: {
        name: 'Mitsubishi Electric IPCs',
        supportedOS: ['linux', 'windows'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'MELFA / iQ Solutions',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      rockwell_ipc: {
        name: 'Rockwell Automation IPCs',
        supportedOS: ['linux', 'windows'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'Studio 5000',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      omron: {
        name: 'OMRON IPCs',
        supportedOS: ['linux', 'windows'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      siemens_ipc: {
        name: 'Siemens IPCs / Industrial Edge',
        supportedOS: ['linux', 'windows'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              toolchain: 'AI Model Deployer / Industrial Edge Apps',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      beckhoff_ipc: {
        name: 'Beckhoff IPCs',
        supportedOS: ['linux', 'windows'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              toolchain: 'TwinCAT ML',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      bosch_rexroth_ipc: {
        name: 'Bosch Rexroth (ctrlX IPC)',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      phoenix_contact_ipc: {
        name: 'Phoenix Contact (PLCnext)',
        supportedOS: ['linux'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
      other_ipc: {
        name: 'Other IPC Vendors',
        supportedOS: ['linux', 'windows'],
        integrations: {
          prebuilt_ui: [
            {
              format: 'ONNX',
              description: 'ONE WARE Studio Integration',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
          easy_integration: [
            {
              format: 'TF-Lite',
              docLink: '/docs/one-ai/documentation/export',
            },
            {
              format: 'ONNX',
              description: 'Use in custom software',
              docLink: '/docs/one-ai/documentation/integration/deployment-overview',
            },
            {
              format: 'C++ Projekt',
              toolchain: 'Linux Build',
              docLink: '/docs/one-ai/documentation/export',
            },
          ],
        },
      },
    },
  },
};
