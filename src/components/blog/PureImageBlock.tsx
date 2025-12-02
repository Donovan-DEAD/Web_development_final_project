"use client";

import React from 'react';
import Image from 'next/image';
import { Paper, Typography, Box } from '@mui/material';
import '../../app/styles/blogpost/PureImageBlock.css';

interface PureImageBlockProps {
  block: {
    img_url: string;
    img_footer: string;
  };
}

const PureImageBlock: React.FC<PureImageBlockProps> = ({ block }) => {
  return (
    <Paper className="pure-image" elevation={0}>
      <Box className="pure-image-container">
        <Image 
          src={block.img_url} 
          alt={block.img_footer} 
          width={800} 
          height={400} 
          layout="responsive"
          className="pure-image-img"
        />
      </Box>
      <Typography variant="caption" className="pure-image-footer">
        {block.img_footer}
      </Typography>
    </Paper>
  );
};

export default PureImageBlock;
