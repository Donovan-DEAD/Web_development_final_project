"use client";

import React from 'react';
import Image from 'next/image';

interface ImgAndContentBlockProps {
  block: {
    img_url: string;
    img_footer: string;
    blog_paragraphs: string[];
    orientation: 'left' | 'right'; // Assuming these are the only two orientations
  };
}

const ImgAndContentBlock: React.FC<ImgAndContentBlockProps> = ({ block }) => {
  return (
    <div className={`img-and-content ${block.orientation}`}>
      <div className="image-container">
        {/* Using Next.js Image component for optimization */}
        <Image src={block.img_url} alt={block.img_footer} width={500} height={300} layout="responsive" />
        <p className="img-footer">{block.img_footer}</p>
      </div>
      <div className="text-container">
        {block.blog_paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default ImgAndContentBlock;
