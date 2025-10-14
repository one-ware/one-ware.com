import React from 'react';

interface SalesBannerProps {
  subject?: string;
  customText?: string;
}

const SalesBanner: React.FC<SalesBannerProps> = ({ 
  subject = "ONE AI Sales Inquiry",
  customText
}) => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1B2027, #1B2027)',
      border: '1px solid #1B2027',
      borderRadius: '20px',
      padding: '32px',
      margin: '24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      flexWrap: 'wrap'
    }}>
      <div style={{ flexShrink: 0 }}>
        <img 
          src="/img/AboutUs/Leo.png"
          alt="Leo Wiegand - Sales Representative"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '4px solid #1B2027'
          }}
        />
      </div>
      <div style={{ flex: 1, minWidth: '320px' }}>
        <h3 style={{ margin: '0 0 12px 0', color: '#e0e0e0', fontSize: '24px', fontWeight: 'bold' }}>
          Ready to Transform Your Production?
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: '18px', lineHeight: 1.6, color: '#e0e0e0' }}>
          {customText || (
            <>
              <strong>Leo Wiegand</strong> is our sales expert who takes care of projects of all kinds. Whether you need evaluations for ideas, custom quotes, or strategic consulting - Leo is your go-to contact for business inquiries.
            </>
          )}
        </p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '20px', color: '#e0e0e0', fontWeight: 'bold' }}>Contact Sales:</span>
          <a href={`mailto:sales@one-ware.com?subject=${encodeURIComponent(subject)}`}
             style={{ 
               fontSize: '20px', 
               color: '#00FFD1', 
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