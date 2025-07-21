import React from 'react';
import {
  Container,
  Typography,
  Box
} from '@mui/material';

const TaskList = () => {
  return (
    <Container maxWidth="lg" data-testid="task-list-container">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Tasks
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Task list component - to be implemented
        </Typography>
      </Box>
    </Container>
  );
};

export default TaskList;
