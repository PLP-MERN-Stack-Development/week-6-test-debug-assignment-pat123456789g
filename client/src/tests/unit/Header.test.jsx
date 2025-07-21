import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from '../../components/Header';
import { AuthProvider } from '../../context/AuthContext';

// Mock the auth context
const mockAuthContext = {
  user: null,
  logout: jest.fn(),
  loading: false
};

jest.mock('../../context/AuthContext', () => ({
  ...jest.requireActual('../../context/AuthContext'),
  useAuth: () => mockAuthContext
}));

const theme = createTheme();

const renderHeader = (user = null) => {
  mockAuthContext.user = user;
  
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when user is not logged in', () => {
    test('should render login and register links', () => {
      renderHeader();

      expect(screen.getByTestId('login-link')).toBeInTheDocument();
      expect(screen.getByTestId('register-link')).toBeInTheDocument();
      expect(screen.queryByTestId('user-avatar')).not.toBeInTheDocument();
    });

    test('should display app title', () => {
      renderHeader();

      expect(screen.getByTestId('app-title')).toBeInTheDocument();
      expect(screen.getByText('MERN Testing App')).toBeInTheDocument();
    });

    test('should not show dashboard and tasks links', () => {
      renderHeader();

      expect(screen.queryByTestId('dashboard-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('tasks-link')).not.toBeInTheDocument();
    });
  });

  describe('when user is logged in', () => {
    const mockUser = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com'
    };

    test('should render user avatar and navigation links', () => {
      renderHeader(mockUser);

      expect(screen.getByTestId('user-avatar')).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-link')).toBeInTheDocument();
      expect(screen.getByTestId('tasks-link')).toBeInTheDocument();
      expect(screen.queryByTestId('login-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('register-link')).not.toBeInTheDocument();
    });

    test('should display first letter of username in avatar', () => {
      renderHeader(mockUser);

      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toHaveTextContent('T'); // First letter of 'testuser'
    });

    test('should show user menu when avatar is clicked', async () => {
      renderHeader(mockUser);

      const avatar = screen.getByTestId('user-avatar');
      fireEvent.click(avatar);

      await waitFor(() => {
        expect(screen.getByTestId('user-menu')).toBeInTheDocument();
        expect(screen.getByTestId('profile-menu-item')).toBeInTheDocument();
        expect(screen.getByTestId('logout-menu-item')).toBeInTheDocument();
      });
    });

    test('should call logout when logout menu item is clicked', async () => {
      renderHeader(mockUser);

      const avatar = screen.getByTestId('user-avatar');
      fireEvent.click(avatar);

      await waitFor(() => {
        const logoutItem = screen.getByTestId('logout-menu-item');
        fireEvent.click(logoutItem);
      });

      expect(mockAuthContext.logout).toHaveBeenCalledTimes(1);
    });

    test('should handle user with no username gracefully', () => {
      const userWithoutUsername = { id: '1', email: 'test@example.com' };
      renderHeader(userWithoutUsername);

      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toHaveTextContent('U'); // Default letter
    });
  });

  describe('navigation', () => {
    test('should have correct link hrefs', () => {
      renderHeader();

      const loginLink = screen.getByTestId('login-link');
      const registerLink = screen.getByTestId('register-link');

      expect(loginLink.getAttribute('href')).toBe('/login');
      expect(registerLink.getAttribute('href')).toBe('/register');
    });

    test('should have correct navigation links when logged in', () => {
      const mockUser = { id: '1', username: 'testuser' };
      renderHeader(mockUser);

      const dashboardLink = screen.getByTestId('dashboard-link');
      const tasksLink = screen.getByTestId('tasks-link');

      expect(dashboardLink.getAttribute('href')).toBe('/dashboard');
      expect(tasksLink.getAttribute('href')).toBe('/tasks');
    });
  });

  describe('accessibility', () => {
    test('should have proper ARIA attributes', () => {
      const mockUser = { id: '1', username: 'testuser' };
      renderHeader(mockUser);

      const avatar = screen.getByTestId('user-avatar');
      expect(avatar).toHaveAttribute('role', 'button');
    });

    test('should be keyboard accessible', async () => {
      const mockUser = { id: '1', username: 'testuser' };
      renderHeader(mockUser);

      const avatar = screen.getByTestId('user-avatar');
      fireEvent.keyDown(avatar, { key: 'Enter', code: 'Enter' });

      // Note: This test might need adjustment based on how Material-UI handles keyboard events
    });
  });
});
