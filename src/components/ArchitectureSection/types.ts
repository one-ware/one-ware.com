export interface LayerBlock {
  name: string;
  type: string;
  inputShape: string;
  outputShape: string;
  trainable?: boolean;
}

export interface ResidualBlock {
  mainBranch: LayerBlock[];
  skipBranch: LayerBlock[];
  merge: LayerBlock;
}

export type MainPathSegment = LayerBlock[] | ResidualBlock;

export function isResidualBlock(segment: MainPathSegment): segment is ResidualBlock {
  return !Array.isArray(segment) && 'mainBranch' in segment;
}
