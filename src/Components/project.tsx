
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const ProjectContainer = styled('div')({
  padding: '60px 20px',
});

export const ProjectCard = styled('div')({
  backgroundColor: '#FFFFFF',
  borderRadius: '8px',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  marginBottom: '40px',
  padding: '20px',
});

export const ProjectTitle = styled(Typography)({
  fontSize: '28px',
  fontWeight: 'bold',
  marginBottom: '20px',
});

export const Description = styled(Typography)({
  fontSize: '16px',
  lineHeight: '1.6',
  marginBottom: '20px',
});

export const Details = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

export const InfoLabel = styled(Typography)({
  fontWeight: 'bold',
  marginRight: '10px',
});

export const UserSection = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '20px',
});

export const UserInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '12px',
});
