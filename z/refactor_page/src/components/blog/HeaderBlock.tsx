"use client";

import React from 'react';

interface HeaderBlockProps {
  block: {
    blog_title: string;
    blog_subtitle: string;
    blog_author: string;
    blog_date: string;
  };
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ block }) => {
  return (
    <div className="blog-header">
      <h1>{block.blog_title}</h1>
      <h2>{block.blog_subtitle}</h2>
      <p>By {block.blog_author} | {block.blog_date}</p>
    </div>
  );
};

export default HeaderBlock;
