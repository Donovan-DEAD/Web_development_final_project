"use client";

import React from 'react';
import Image from 'next/image';
import { Paper, Typography, Box } from '@mui/material';
import '../../app/styles/blogpost/ImgAndContentBlock.css';

interface ImgAndContentBlockProps {
  block: {
    img_url: string;
    img_footer: string;
    blog_paragraphs: string[];
    orientation: 'left' | 'right';
  };
}

const ImgAndContentBlock: React.FC<ImgAndContentBlockProps> = ({ block }) => {
  return (
    <Paper className={`img-and-content ${block.orientation}`} elevation={0}>
      <Box className="img-and-content-image-container">
        <Image 
          src={block.img_url} 
          alt={block.img_footer} 
          width={500} 
          height={300} 
          layout="responsive"
          className="img-and-content-img"
        />
        <Typography variant="caption" className="img-and-content-footer">
          {block.img_footer}
        </Typography>
      </Box>
      <Box className="img-and-content-text-container">
        {block.blog_paragraphs.map((paragraph, index) => (
          <Typography key={index} variant="body1" className="img-and-content-paragraph">
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default ImgAndContentBlock;
