import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

export const BlogContainer = styled('div')({
  padding: '60px 20px',
});

export const BlogPostCard = styled('div')({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '40px',
});

export const BlogFeaturedImage = styled('img')({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

export const BlogTitle = styled(Typography)({
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '20px 0',
});

export const BlogContent = styled(Typography)({
  fontSize: '16px',
  lineHeight: '1.6',
  padding: '0 20px',
});

export const BlogAuthorInfo = styled('div')({
  display: 'flex',
  marginBottom:'20px',
  alignItems: 'center',
  marginTop: '20px',
  padding: '0 20px',
});

export const BlogAuthorAvatar = styled(Avatar)({
  marginRight: '12px',
});
 
