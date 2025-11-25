"use client";

import React from 'react';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface BlogPost {
  blog_id: string; // Assuming blog_id is a string, typically ObjectId from MongoDB
  img_url: string;
  title: string;
  description: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Card className="card">
      <CardMedia
        component="img"
        height="140" // You might want to adjust this or make it responsive
        image={post.img_url}
        alt="Blog post image"
        className="card__image"
      />
      <CardContent className="card__content">
        <Typography gutterBottom variant="h5" component="div" className="card__title">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="card__description">
          {post.description}
        </Typography>
        <Link href={`/blog/${post.blog_id}`} passHref>
          <Button size="small" className="card__button">
            Leer más
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
