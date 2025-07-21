import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';

const RegisterForm = () => {
  return (
    <Container maxWidth="sm" data-testid="register-form-container">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Registration form component - to be implemented
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterForm;
