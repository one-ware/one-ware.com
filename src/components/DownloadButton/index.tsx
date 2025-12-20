import React, { useState, useEffect } from 'react';
import { trackEvent } from '../../utils/tracking';
import Translate from '@docusaurus/Translate';

interface DownloadButtonProps {
  os: 'windows' | 'mac-intel' | 'mac-arm';
  className?: string;
}

export default function DownloadButton({ os, className }: DownloadButtonProps) {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/one-ware/OneWare/releases/latest');
        const data = await response.json();
        
        setVersion(data.tag_name);

        let assetName = '';
        if (os === 'windows') {
          assetName = '-win-x64.msi';
        } else if (os === 'mac-intel') {
          assetName = '-osx-x64.dmg';
        } else if (os === 'mac-arm') {
          assetName = '-osx-arm64.dmg';
        }

        const asset = data.assets.find((a: any) => a.name.endsWith(assetName));
        if (asset) {
          setDownloadUrl(asset.browser_download_url);
        }
      } catch (error) {
        console.error('Error fetching latest release:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, [os]);

  const handleDownload = () => {
    if (downloadUrl) {
      trackEvent('download_start', { label: `OneWareStudio ${version} (${os})` });
      window.location.href = downloadUrl;
    }
  };

  if (loading) {
    return <span className="inline-block px-4 py-2 text-gray-500">Loading...</span>;
  }

  if (!downloadUrl) {
    return <span className="inline-block px-4 py-2 text-red-500">Download not available</span>;
  }

  return (
    <button
      onClick={handleDownload}
      className={`button button--primary ${className || ''}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      <span>
        <Translate id="download.button">Download</Translate> {version}
      </span>
    </button>
  );
}
