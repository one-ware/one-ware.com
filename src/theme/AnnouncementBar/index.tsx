import React, { useState, useEffect } from 'react';
import Translate from '@docusaurus/Translate';
import {useThemeConfig} from '@docusaurus/theme-common';

type AnnouncementConfig = {
  announcementId: string;
  translateId: string;
  title: string;
  subtitle?: string;
  link: string;
  cta?: string;
};

type ThemeConfigWithCustom = {
  announcementConfigs?: Record<string, AnnouncementConfig>;
  activeAnnouncement?: string;
};

export default function AnnouncementBar() {
  const {
    announcementConfigs,
    activeAnnouncement,
  } = useThemeConfig() as ThemeConfigWithCustom;
  
  // Resolve which announcement to show
  const key: string = activeAnnouncement ?? 'default';
  const selected: AnnouncementConfig | undefined =
  announcementConfigs?.[key];
  
  // If no announcement configured, hide the bar
  if (!selected) {
    return null;
  }
  
  const {
    announcementId,
    translateId,
    title,
    subtitle,
    link,
    cta,
  } = selected;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner and when
    const dismissedData = localStorage.getItem(`docusaurus.announcement.${announcementId}.dismiss`);
    
    if (!dismissedData) {
      setIsVisible(true);
    } else {
      try {
        const dismissedTime = parseInt(dismissedData, 10);
        const oneDayInMs = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        const currentTime = Date.now();
        
        // Show banner again if more than 24 hours have passed
        if (currentTime - dismissedTime > oneDayInMs) {
          localStorage.removeItem(`docusaurus.announcement.${announcementId}.dismiss`);
          setIsVisible(true);
        }
      } catch {
        // If parsing fails, show the banner
        setIsVisible(true);
      }
    }
  }, []);

  const handleClose = () => {
    // Store the current timestamp instead of just 'true'
    localStorage.setItem(`docusaurus.announcement.${announcementId}.dismiss`, Date.now().toString());
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
            <Translate id={`announcement.${translateId}.title`}>
              {title}
            </Translate>
          </strong>
          {' - '}
          {subtitle && (
            <Translate id={`announcement.${translateId}.subtitle`}>
              {subtitle}
            </Translate>
          )}
          {' '}
          {link && cta && (
            <a 
              href={link}
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
              <Translate id={`announcement.${translateId}.cta`}>
                {cta}
              </Translate>
            </a>
          )}
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