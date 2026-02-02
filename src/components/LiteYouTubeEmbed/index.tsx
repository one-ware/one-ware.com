import React, { useState } from 'react';
import Translate from "@docusaurus/Translate";

interface LiteYouTubeEmbedProps {
  videoId: string;
  previewImage: string;
  title?: string;
}

export default function LiteYouTubeEmbed({ videoId, previewImage, title = "YouTube video player" }: LiteYouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsPlaying(true)}
      className="group"
      style={{
        position: 'relative',
        cursor: 'pointer',
        width: '100%',
        aspectRatio: '16/9',
        backgroundImage: `url(${previewImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
      
      {/* YouTube Play Button Style */}
      <div 
        className="relative z-10 transition-transform duration-300 group-hover:scale-110"
        style={{
          width: '68px',
          height: '48px',
          backgroundColor: '#FF0000',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        }}
      >
        <div style={{
          width: 0,
          height: 0,
          borderTop: '10px solid transparent',
          borderBottom: '10px solid transparent',
          borderLeft: '16px solid white',
          marginLeft: '4px'
        }} />
      </div>

      <div className="absolute bottom-2 left-0 right-0 text-center px-4 z-10">
        <span className="text-white text-[10px] sm:text-xs bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
          <Translate id="video.youtube.privacy">
            By playing this video, you agree to data being transferred to YouTube.
          </Translate>
        </span>
      </div>
    </div>
  );
}
