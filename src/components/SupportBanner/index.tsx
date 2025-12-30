import React from 'react';

interface SupportBannerProps {
  subject?: string;
  customText?: string;
}

const SupportBanner: React.FC<SupportBannerProps> = ({ 
  subject = "ONE AI Support Request",
  customText
}) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(0, 255, 209, 0.1), rgba(0, 255, 209, 0.05))',
      border: '1px solid rgba(0, 255, 209, 0.2)',
      borderRadius: 0,
      padding: '32px',
      margin: '24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      flexWrap: 'wrap'
    }}>
      <div style={{ flexShrink: 0 }}>
        <img 
          src="/img/support_christopher.webp"
          alt="Christopher - Development Support"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid rgba(0, 255, 209, 0.4)'
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: '320px' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#e0e0e0', fontSize: '24px', fontWeight: 'bold' }}>
          Need Help? We're Here for You!
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '18px', lineHeight: 1.6, color: '#e0e0e0' }}>
          {customText || (
            <>
              <strong>Christopher</strong> from our development team is ready to help with any questions about ONE AI usage, troubleshooting, or optimization. 
              Don't hesitate to reach out!
            </>
          )}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '20px', color: '#e0e0e0', fontWeight: 'bold' }}>Our Support Email:</span>
          <a href={`mailto:support@one-ware.com?subject=${encodeURIComponent(subject)}`}
             style={{ 
               fontSize: '20px', 
               color: '#00FFD1', 
               fontWeight: 'bold', 
               textDecoration: 'none',
               fontFamily: 'monospace'
             }}>
            support@one-ware.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportBanner;