import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner
    const isDismissed = localStorage.getItem('docusaurus.announcement.arrow_webinar_2025.dismiss');
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('docusaurus.announcement.arrow_webinar_2025.dismiss', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      role="banner"
      style={{
        backgroundColor: '#00FFD1',
        color: '#000000',
        padding: '8px 16px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <strong>
            <Translate id="announcement.arrow.title">
              FREE Worldwide Workshop on ONE AI for Altera FPGAs
            </Translate>
          </strong>
          {' - '}
          <Translate id="announcement.arrow.subtitle">
            Learn FPGA development • Build ultra-efficient AI • Win a development board
          </Translate>
          {' '}
          <a 
            href="/docs/one-ai/seminars/arrow-agilex3"
            style={{ 
              backgroundColor: '#000000',
              color: '#00FFD1',
              padding: '4px 12px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginLeft: '8px'
            }}
          >
            <Translate id="announcement.arrow.cta">
              Register Now →
            </Translate>
          </a>
        </div>
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#000000',
            padding: '4px',
            lineHeight: 1,
          }}
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
}