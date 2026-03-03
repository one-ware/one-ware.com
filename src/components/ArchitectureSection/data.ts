import { TbGridPattern, TbArrowsSplit } from "react-icons/tb";
import type { LayerBlock, MainPathSegment } from "./types";

export const linearArch: LayerBlock[] = [
  { name: "input_1", type: "InputLayer", inputShape: "[(None, 36, 36, 1)]", outputShape: "[(None, 36, 36, 1)]" },
  { name: "quantize_layer", type: "QuantizeLayer", inputShape: "[(None, 36, 36, 1)]", outputShape: "[(None, 36, 36, 1)]" },
  { name: "quant_input_conv_1 (input_conv_1)", type: "QuantizeWrapperV2 (Conv2D)", inputShape: "[(None, 36, 36, 1)]", outputShape: "[(None, 36, 36, 12)]", trainable: true },
  { name: "quant_input_max_pooling_1 (input_max_pooling_1)", type: "QuantizeWrapperV2 (MaxPooling2D)", inputShape: "[(None, 36, 36, 12)]", outputShape: "[(None, 18, 18, 12)]" },
  { name: "quant_down_conv_1 (down_conv_1)", type: "QuantizeWrapperV2 (Conv2D)", inputShape: "[(None, 18, 18, 12)]", outputShape: "[(None, 18, 18, 16)]", trainable: true },
  { name: "quant_down_max_pooling_1 (down_max_pooling_1)", type: "QuantizeWrapperV2 (MaxPooling2D)", inputShape: "[(None, 18, 18, 16)]", outputShape: "[(None, 9, 9, 16)]" },
  { name: "quant_down_conv_2 (down_conv_2)", type: "QuantizeWrapperV2 (Conv2D)", inputShape: "[(None, 9, 9, 16)]", outputShape: "[(None, 9, 9, 24)]", trainable: true },
  { name: "down_max_pooling_2", type: "MaxPooling2D", inputShape: "[(None, 9, 9, 24)]", outputShape: "[(None, 4, 4, 24)]" },
  { name: "quant_output_1_flatten_1 (output_1_flatten_1)", type: "QuantizeWrapperV2 (Flatten)", inputShape: "[(None, 4, 4, 24)]", outputShape: "[(None, 384)]" },
  { name: "quant_output_1 (output_1)", type: "QuantizeWrapperV2 (Dense)", inputShape: "[(None, 384)]", outputShape: "[(None, 1)]", trainable: true },
];

export const multiInputShared: LayerBlock = {
  name: "input_1", type: "InputLayer", inputShape: "[(None, 540, 640, 3, 2)]", outputShape: "[(None, 540, 640, 3, 2)]"
};

export const multiInputMainSegments: MainPathSegment[] = [
  [
    { name: "tf.reshape", type: "TFOpLambda", inputShape: "[(None, 540, 640, 3, 2)]", outputShape: "[(None, 540, 640, 6)]" },
    { name: "input_conv_1", type: "Conv2D", inputShape: "[(None, 540, 640, 6)]", outputShape: "[(None, 540, 640, 12)]", trainable: true },
    { name: "input_normalization_2", type: "BatchNormalization", inputShape: "[(None, 540, 640, 12)]", outputShape: "[(None, 540, 640, 12)]", trainable: true },
    { name: "input_activation_1", type: "ReLU", inputShape: "[(None, 540, 640, 12)]", outputShape: "[(None, 540, 640, 12)]" },
    { name: "input_max_pooling_1", type: "MaxPooling2D", inputShape: "[(None, 540, 640, 12)]", outputShape: "[(None, 270, 320, 12)]" },
  ],
  {
    mainBranch: [
      { name: "down_conv_1", type: "Conv2D", inputShape: "[(None, 270, 320, 12)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
      { name: "down_normalization_2", type: "BatchNormalization", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
      { name: "down_activation_1", type: "ReLU", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]" },
      { name: "down_conv_2", type: "Conv2D", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
      { name: "down_normalization_4", type: "BatchNormalization", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
    ],
    skipBranch: [
      { name: "down_conv_3", type: "Conv2D", inputShape: "[(None, 270, 320, 12)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
    ],
    merge: { name: "down_add_1", type: "Add", inputShape: "[(None, 135, 160, 16)x2]", outputShape: "[(None, 135, 160, 16)]" },
  },
  [
    { name: "down_activation_2", type: "ReLU", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]" },
  ],
  {
    mainBranch: [
      { name: "down_conv_4", type: "Conv2D", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
      { name: "down_normalization_6", type: "BatchNormalization", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
      { name: "down_activation_3", type: "ReLU", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]" },
      { name: "down_conv_5", type: "Conv2D", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
      { name: "down_normalization_8", type: "BatchNormalization", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
    ],
    skipBranch: [],
    merge: { name: "down_add_2", type: "Add", inputShape: "[(None, 135, 160, 16)x2]", outputShape: "[(None, 135, 160, 16)]" },
  },
  [
    { name: "down_activation_4", type: "ReLU", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]" },
  ],
];

export const multiInputBranch: LayerBlock[] = [
  { name: "tf.split", type: "TFOpLambda", inputShape: "[(None, 540, 640, 3, 2)]", outputShape: "[(None, 540, 640, 3, 1)x2]" },
  { name: "tf.compat.v1.squeeze", type: "TFOpLambda", inputShape: "[(None, 540, 640, 3, 1)]", outputShape: "[(None, 540, 640, 3)]" },
  { name: "tf.compat.v1.squeeze_1", type: "TFOpLambda", inputShape: "[(None, 540, 640, 3, 1)]", outputShape: "[(None, 540, 640, 3)]" },
  { name: "in_connect_substract_1", type: "Subtract", inputShape: "[(None, 540, 640, 3)x2]", outputShape: "[(None, 540, 640, 3)]" },
  { name: "in_connect_avg_pooling_1", type: "AveragePooling2D", inputShape: "[(None, 540, 640, 3)]", outputShape: "[(None, 270, 320, 3)]" },
  { name: "in_connect_conv_1", type: "Conv2D", inputShape: "[(None, 270, 320, 3)]", outputShape: "[(None, 270, 320, 12)]", trainable: true },
  { name: "in_connect_normalization_2", type: "BatchNormalization", inputShape: "[(None, 270, 320, 12)]", outputShape: "[(None, 270, 320, 12)]", trainable: true },
  { name: "in_connect_activation_1", type: "ReLU", inputShape: "[(None, 270, 320, 12)]", outputShape: "[(None, 270, 320, 12)]" },
  { name: "in_connect_conv_2", type: "Conv2D", inputShape: "[(None, 270, 320, 12)]", outputShape: "[(None, 270, 320, 24)]", trainable: true },
  { name: "in_connect_normalization_4", type: "BatchNormalization", inputShape: "[(None, 270, 320, 24)]", outputShape: "[(None, 270, 320, 24)]", trainable: true },
  { name: "in_connect_activation_2", type: "ReLU", inputShape: "[(None, 270, 320, 24)]", outputShape: "[(None, 270, 320, 24)]" },
  { name: "in_connect_avg_pooling_2", type: "AveragePooling2D", inputShape: "[(None, 270, 320, 24)]", outputShape: "[(None, 135, 160, 24)]" },
];

export const multiInputMerged: LayerBlock[] = [
  { name: "in_connect_concat_1", type: "Concatenate", inputShape: "[(None,135,160,16), (None,135,160,24)]", outputShape: "[(None, 135, 160, 40)]" },
  { name: "output_1_conv_1", type: "Conv2D", inputShape: "[(None, 135, 160, 40)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
  { name: "output_1_conv_2", type: "Conv2D", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
  { name: "output_1_normalization_2", type: "BatchNormalization", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]", trainable: true },
  { name: "output_1_activation_1", type: "ReLU", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 16)]" },
  { name: "output_1_binary_conv_1", type: "Conv2D", inputShape: "[(None, 135, 160, 16)]", outputShape: "[(None, 135, 160, 1)]", trainable: true },
  { name: "output_1", type: "Reshape", inputShape: "[(None, 135, 160, 1)]", outputShape: "[(None, 135, 160, 1, 1)]" },
];

export const archModels = [
  { label: "Image Classification", labelId: "oneai.architecture.linear.label", image: "/img/ai/one_ai_plugin/benefits/3.webp", icon: TbGridPattern },
  { label: "Multi-Input", labelId: "oneai.architecture.multi.label", image: "/img/ai/one_ai_plugin/benefits/4.webp", icon: TbArrowsSplit },
];
