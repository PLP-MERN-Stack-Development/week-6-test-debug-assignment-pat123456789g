import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';

const TaskForm = () => {
  return (
    <Container maxWidth="md" data-testid="task-form-container">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Task
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Task form component - to be implemented
        </Typography>
      </Box>
    </Container>
  );
};

export default TaskForm;
