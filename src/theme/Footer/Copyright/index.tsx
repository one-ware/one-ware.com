import React, { type ReactNode } from 'react';
import type { Props } from '@theme/Footer/Copyright';

export default function FooterCopyright({ copyright }: Props): ReactNode {
  return (
    <div className="footer__copyright text-sm text-gray-400 leading-relaxed">
      {/* Existing copyright (Docusaurus-safe HTML) */}
      <div
        dangerouslySetInnerHTML={{ __html: copyright }}
      />

      {/* 🧩 Google reCAPTCHA compliance notice */}
      <p className="mt-2 opacity-70 text-xs">
        This site is protected by reCAPTCHA and the Google{' '}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#00FFD1] transition-colors"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#00FFD1] transition-colors"
        >
          Terms of Service
        </a>{' '}
        apply.
      </p>
    </div>
  );
}
