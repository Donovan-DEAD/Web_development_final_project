"use client";

import React from 'react';

interface PureContentBlockProps {
  block: {
    blog_paragraphs: string[];
  };
}

const PureContentBlock: React.FC<PureContentBlockProps> = ({ block }) => {
  return (
    <div className="pure-content">
      {block.blog_paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default PureContentBlock;
