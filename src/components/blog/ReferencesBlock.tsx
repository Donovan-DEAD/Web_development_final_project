"use client";

import React from 'react';
import { Paper, Typography, List, ListItem, Link } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import '../../app/styles/blogpost/ReferencesBlock.css';

interface Reference {
  blog_reference_apa: string;
  blog_reference_url: string;
}

interface ReferencesBlockProps {
  block: {
    blog_references: Reference[];
  };
}

const ReferencesBlock: React.FC<ReferencesBlockProps> = ({ block }) => {
  return (
    <Paper className="references" elevation={0}>
      <Typography variant="h3" className="references-title">
        Referencias
      </Typography>
      <List className="references-list">
        {block.blog_references.map((ref, index) => (
          <ListItem key={index} className="references-list-item">
            <LinkIcon className="references-list-icon" />
            <Link 
              href={ref.blog_reference_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="references-list-link"
            >
              {ref.blog_reference_apa}
            </Link>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ReferencesBlock;
