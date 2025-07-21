import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const quickStats = [
    { title: 'Total Tasks', value: '12', color: 'primary.main' },
    { title: 'Completed', value: '8', color: 'success.main' },
    { title: 'Pending', value: '3', color: 'warning.main' },
    { title: 'Overdue', value: '1', color: 'error.main' }
  ];

  return (
    <Container maxWidth="lg" data-testid="dashboard-container">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome back, {user?.profile?.firstName || user?.username}!
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Here's an overview of your tasks and activities.
        </Typography>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card data-testid={`stat-card-${index}`}>
                <CardContent>
                  <Typography color="text.secondary" gutterBottom variant="body2">
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Paper sx={{ p: 3, mb: 3 }} data-testid="quick-actions">
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              component={Link}
              to="/tasks/new"
              data-testid="create-task-button"
            >
              Create New Task
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/tasks"
              data-testid="view-tasks-button"
            >
              View All Tasks
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/profile"
              data-testid="edit-profile-button"
            >
              Edit Profile
            </Button>
          </Box>
        </Paper>

        {/* Recent Activity */}
        <Paper sx={{ p: 3 }} data-testid="recent-activity">
          <Typography variant="h6" gutterBottom>
            Recent Activity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No recent activity to display.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
