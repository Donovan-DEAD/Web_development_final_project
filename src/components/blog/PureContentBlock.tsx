"use client";

import React from 'react';
import { Paper, Typography } from '@mui/material';
import '../../app/styles/blogpost/PureContentBlock.css';

interface PureContentBlockProps {
  block: {
    blog_paragraphs: string[];
  };
}

const PureContentBlock: React.FC<PureContentBlockProps> = ({ block }) => {
  return (
    <Paper className="pure-content" elevation={0}>
      {block.blog_paragraphs.map((paragraph, index) => (
        <Typography key={index} variant="body1" className="pure-content-paragraph">
          {paragraph}
        </Typography>
      ))}
    </Paper>
  );
};

export default PureContentBlock;
