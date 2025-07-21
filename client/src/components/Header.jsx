import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" data-testid="header">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link 
            to={user ? "/dashboard" : "/"} 
            style={{ textDecoration: 'none', color: 'inherit' }}
            data-testid="app-title"
          >
            MERN Testing App
          </Link>
        </Typography>

        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/dashboard"
              data-testid="dashboard-link"
            >
              Dashboard
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/tasks"
              data-testid="tasks-link"
            >
              Tasks
            </Button>
            
            <Avatar
              onClick={handleMenuOpen}
              sx={{ cursor: 'pointer', bgcolor: 'secondary.main' }}
              data-testid="user-avatar"
            >
              {user.username?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              data-testid="user-menu"
            >
              <MenuItem onClick={handleProfileClick} data-testid="profile-menu-item">
                Profile
              </MenuItem>
              <MenuItem onClick={handleLogout} data-testid="logout-menu-item">
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/login"
              data-testid="login-link"
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/register"
              data-testid="register-link"
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
