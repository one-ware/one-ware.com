export type HardwareType =
  | 'fpga'
  | 'microcontroller'
  | 'embedded_soc'
  | 'cpu'
  | 'gpu_tpu_npu'
  | 'plc'
  | 'sbc'
  | 'ipc';

export type OperatingSystem = 'none' | 'windows' | 'linux' | 'mac';

export type IntegrationMethod = 'prebuilt_ui' | 'easy_integration' | 'fast_inference';

export interface ExportOption {
  format: string;
  toolchain?: string;
  docLink?: string;
  tutorialLink?: string;
  description?: string;
}

export interface VendorConfig {
  name: string;
  supportedOS: OperatingSystem[];
  integrations: {
    [key in IntegrationMethod]?: ExportOption[];
  };
}

export interface HardwareTypeConfig {
  label: string;
  vendors: Record<string, VendorConfig>;
}

export type PartnerFilterData = Record<HardwareType, HardwareTypeConfig>;

export const hardwareTypeLabels: Record<HardwareType, string> = {
  fpga: 'FPGA',
  microcontroller: 'Microcontroller',
  embedded_soc: 'Embedded SoC (Linux)',
  cpu: 'CPU',
  gpu_tpu_npu: 'GPU / TPU / NPU',
  plc: 'PLC (Industrial Control)',
  sbc: 'Single Board Computer',
  ipc: 'Industrial PC',
};

export const osLabelKeys: Record<OperatingSystem, { id: string; message: string }> = {
  none: { id: 'partnerwizard.os.none', message: 'No Operating System' },
  windows: { id: 'partnerwizard.os.windows', message: 'Windows' },
  linux: { id: 'partnerwizard.os.linux', message: 'Linux' },
  mac: { id: 'partnerwizard.os.mac', message: 'macOS' },
};

export const integrationLabelKeys: Record<IntegrationMethod, { id: string; message: string }> = {
  prebuilt_ui: { id: 'partnerwizard.integration.prebuiltUi', message: 'ONE WARE Studio' },
  easy_integration: { id: 'partnerwizard.integration.easyIntegration', message: 'Custom Software' },
  fast_inference: { id: 'partnerwizard.integration.fastInference', message: 'Custom Software' },
};

export const osLabels: Record<OperatingSystem, string> = {
  none: 'No Operating System',
  windows: 'Windows',
  linux: 'Linux',
  mac: 'macOS',
};

export const integrationLabels: Record<IntegrationMethod, string> = {
  prebuilt_ui: 'ONE WARE Studio',
  easy_integration: 'Custom Software',
  fast_inference: 'Custom Software',
};
