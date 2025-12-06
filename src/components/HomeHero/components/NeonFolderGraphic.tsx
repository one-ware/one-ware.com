import React from 'react';

interface NeonFolderGraphicProps {
  className?: string;
}

export default function NeonFolderGraphic({ className = '' }: NeonFolderGraphicProps) {
  return (
    <g className={className} transform="translate(0, 0) rotate(-90) scale(0.8)">
      <path
        d="M -20 -15 L -5 -15 L -2 -10 L -20 -10 Z"
        fill="none"
        stroke="var(--ifm-color-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect
        x="-20" y="-10"
        width="40" height="30"
        rx="3"
        fill="none"
        stroke="var(--ifm-color-primary)"
        strokeWidth="2"
      />
      <path d="M -10 0 H 10" stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M -10 8 H 0" stroke="var(--ifm-color-primary)" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}
