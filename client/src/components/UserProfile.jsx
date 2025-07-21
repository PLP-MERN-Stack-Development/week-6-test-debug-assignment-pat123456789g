import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';

const UserProfile = () => {
  return (
    <Container maxWidth="md" data-testid="user-profile-container">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          User profile component - to be implemented
        </Typography>
      </Box>
    </Container>
  );
};

export default UserProfile;
