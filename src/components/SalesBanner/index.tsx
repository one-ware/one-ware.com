import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface SalesBannerProps {
  subject?: string;
  customText?: string;
  customHeading?: string;
}

const SalesBanner: React.FC<SalesBannerProps> = ({
  subject = "ONE AI Sales Inquiry",
  customText,
  customHeading
}) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <div style={{
      background: isDarkMode
        ? 'linear-gradient(135deg, #1B2027, #1B2027)'
        : 'linear-gradient(135deg, rgba(0, 168, 138, 0.1), rgba(0, 168, 138, 0.05))',
      border: isDarkMode ? '1px solid #1B2027' : '1px solid rgba(0, 168, 138, 0.2)',
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
          src="/img/AboutUs/helmut.png"
          alt="Helmut Plötz - Vice President of Global Sales"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: isDarkMode ? '4px solid #1B2027' : '4px solid rgba(0, 168, 138, 0.4)'
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: '320px' }}>
        <h3 style={{ margin: '0 0 12px 0', color: isDarkMode ? '#e0e0e0' : '#1a1a1a', fontSize: '24px', fontWeight: 'bold' }}>
          {customHeading || "Ready to Transform Your Production?"}
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '18px', lineHeight: 1.6, color: isDarkMode ? '#e0e0e0' : '#374151' }}>
          {customText || (
            <>
              <strong>Helmut Plötz</strong> is our sales expert who takes care of projects of all kinds. Whether you need evaluations for ideas, custom quotes, or strategic consulting - Helmut is your go-to contact for business inquiries.
            </>
          )}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '20px', color: isDarkMode ? '#e0e0e0' : '#1a1a1a', fontWeight: 'bold' }}>Contact Sales:</span>
          <a href={`mailto:sales@one-ware.com?subject=${encodeURIComponent(subject)}`}
             style={{
               fontSize: '20px',
               color: isDarkMode ? '#00FFD1' : '#00a88a',
               fontWeight: 'bold',
               textDecoration: 'none',
               fontFamily: 'monospace'
             }}>
            sales@one-ware.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default SalesBanner;