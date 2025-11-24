"use client";

import React from 'react';
import Image from 'next/image';

interface PureImageBlockProps {
  block: {
    img_url: string;
    img_footer: string;
  };
}

const PureImageBlock: React.FC<PureImageBlockProps> = ({ block }) => {
  return (
    <div className="pure-image">
      {/* Using Next.js Image component for optimization */}
      <Image src={block.img_url} alt={block.img_footer} width={800} height={400} layout="responsive" />
      <p className="img-footer">{block.img_footer}</p>
    </div>
  );
};

export default PureImageBlock;
