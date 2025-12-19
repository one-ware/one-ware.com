import React, { type ReactNode } from 'react';
import type { Props } from '@theme/Footer/Copyright';
import Translate from '@docusaurus/Translate';
import { useCookieConsent } from '../../../context/CookieContext';

export default function FooterCopyright({ copyright }: Props): ReactNode {
  const { resetConsent } = useCookieConsent();

  return (
    <div className="footer__copyright text-sm text-gray-400 leading-relaxed">
      <div
        dangerouslySetInnerHTML={{ __html: copyright }}
      />

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

      <button
        onClick={resetConsent}
        className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.7)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 255, 209, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(0, 255, 209, 0.3)';
          e.currentTarget.style.color = '#00FFD1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
        }}
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <Translate id="cookies.settings">Cookie Settings</Translate>
      </button>
    </div>
  );
}
