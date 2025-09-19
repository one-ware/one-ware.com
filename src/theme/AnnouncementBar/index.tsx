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
        padding: '12px 16px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1000,
        width: '100%',
        margin: '0',
      }}
    >
      <div style={{ 
        maxWidth: 'calc(100vw - 32px)', 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        flexWrap: 'wrap', 
        gap: '12px',
        padding: '0 16px'
      }}>
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
              padding: '6px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginLeft: '12px',
              display: 'inline-block',
              transition: 'all 0.3s ease'
            }}
          >
            <Translate id="announcement.arrow.cta">
              Register Now
            </Translate>
          </a>
        </div>
        <button
          onClick={handleClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#000000',
            padding: '6px',
            lineHeight: 1,
            transition: 'opacity 0.3s ease',
            opacity: 0.8
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
          aria-label="Close banner"
        >
          ×
        </button>
      </div>
    </div>
  );
}