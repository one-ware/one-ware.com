import { TbGridPattern, TbArrowsSplit } from "react-icons/tb";
import type { LayerBlock, MainPathSegment } from "./types";

export const linearArch: LayerBlock[] = [
  { label: "Input" },
  { label: "Quantization" },
  { label: "Convolution", trainable: true },
  { label: "Max Pooling" },
  { label: "Convolution", trainable: true },
  { label: "Max Pooling" },
  { label: "Convolution", trainable: true },
  { label: "Max Pooling" },
  { label: "Flatten" },
  { label: "Dense", trainable: true },
];

export const multiInputShared: LayerBlock = {
  label: "Input",
};

export const multiInputMainSegments: MainPathSegment[] = [
  [
    { label: "Reshape" },
    { label: "Convolution", trainable: true },
    { label: "Batch Norm", trainable: true },
    { label: "ReLU" },
    { label: "Max Pooling" },
  ],
  {
    mainBranch: [
      { label: "Convolution", trainable: true },
      { label: "Batch Norm", trainable: true },
      { label: "ReLU" },
      { label: "Convolution", trainable: true },
      { label: "Batch Norm", trainable: true },
    ],
    skipBranch: [
      { label: "Convolution", trainable: true },
    ],
    merge: { label: "Add" },
  },
  [
    { label: "ReLU" },
  ],
  {
    mainBranch: [
      { label: "Convolution", trainable: true },
      { label: "Batch Norm", trainable: true },
      { label: "ReLU" },
      { label: "Convolution", trainable: true },
      { label: "Batch Norm", trainable: true },
    ],
    skipBranch: [],
    merge: { label: "Add" },
  },
  [
    { label: "ReLU" },
  ],
];

export const multiInputBranch: LayerBlock[] = [
  { label: "Split" },
  { label: "Squeeze" },
  { label: "Squeeze" },
  { label: "Subtract" },
  { label: "Avg Pooling" },
  { label: "Convolution", trainable: true },
  { label: "Batch Norm", trainable: true },
  { label: "ReLU" },
  { label: "Convolution", trainable: true },
  { label: "Batch Norm", trainable: true },
  { label: "ReLU" },
  { label: "Avg Pooling" },
];

export const multiInputMerged: LayerBlock[] = [
  { label: "Concatenate" },
  { label: "Convolution", trainable: true },
  { label: "Convolution", trainable: true },
  { label: "Batch Norm", trainable: true },
  { label: "ReLU" },
  { label: "Convolution", trainable: true },
  { label: "Reshape" },
];

export const archModels = [
  { label: "Image Classification", labelId: "oneai.architecture.linear.label", image: "/img/ai/one_ai_plugin/benefits/3.webp", icon: TbGridPattern },
  { label: "Multi-Input", labelId: "oneai.architecture.multi.label", image: "/img/ai/one_ai_plugin/benefits/4.webp", icon: TbArrowsSplit },
];
