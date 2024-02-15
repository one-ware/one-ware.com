import React from 'react';
import { LinkedInEmbed } from 'react-social-media-embed';

export default function LinkedInEmbedWrapper({height, url, postUrl}) {
  return (
    <LinkedInEmbed 
    url={url}
    postUrl={postUrl}
    height={height}
    />
  );
}