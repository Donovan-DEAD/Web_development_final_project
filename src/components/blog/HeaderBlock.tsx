"use client";

import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import '../../app/styles/blogpost/HeaderBlock.css';

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
    <Paper className="blog-header" elevation={0}>
      <Typography variant="h1" className="blog-header-title">
        {block.blog_title}
      </Typography>
      <Typography variant="h2" className="blog-header-subtitle">
        {block.blog_subtitle}
      </Typography>
      <Box className="blog-header-meta">
        <Typography variant="body2" className="blog-header-author-date">
          By {block.blog_author} | {block.blog_date}
        </Typography>
      </Box>
    </Paper>
  );
};

export default HeaderBlock;
