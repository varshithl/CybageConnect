
import { styled } from '@mui/material/styles';

// Styled Container for Article
export const Container = styled('div')({
  paddingTop: '40px',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
});

// Styled Card for Article
export const Card = styled('div')({
  maxWidth: '700px',
  width: '100%',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  padding: '20px',
  marginBottom:'10px',
  boxSizing: 'border-box',
});

// Styled Header for Article
export const Header = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

// Styled Title for Article
export const Title = styled('h1')({
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: '12px',
});

// Styled Author Info for Article
export const AuthorInfo = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

// Styled Author Name for Article
export const AuthorName = styled('span')({
  fontWeight: 'bold',
  marginRight: '8px',
});

// Styled Article Content
export const Content = styled('div')({
  marginBottom: '20px',
});


