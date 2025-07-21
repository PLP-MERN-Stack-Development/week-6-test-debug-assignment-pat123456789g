import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import LoginForm from '../../components/LoginForm';

// Mock the auth context
const mockLogin = jest.fn();
const mockAuthContext = {
  login: mockLogin,
  user: null,
  loading: false
};

jest.mock('../../context/AuthContext', () => ({
  useAuth: () => mockAuthContext
}));

// Mock react-router-dom navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

const theme = createTheme();

const renderLoginForm = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('LoginForm Component', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('should render login form with all elements', () => {
      renderLoginForm();

      expect(screen.getByTestId('login-form-container')).toBeInTheDocument();
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByTestId('email-input')).toBeInTheDocument();
      expect(screen.getByTestId('password-input')).toBeInTheDocument();
      expect(screen.getByTestId('login-button')).toBeInTheDocument();
      expect(screen.getByTestId('register-link')).toBeInTheDocument();
    });

    test('should have correct initial state', () => {
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const passwordInput = screen.getByTestId('password-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');

      expect(emailInput.value).toBe('');
      expect(passwordInput.value).toBe('');
      expect(submitButton).not.toBeDisabled();
    });

    test('should focus email input on mount', () => {
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      expect(emailInput).toHaveFocus();
    });
  });

  describe('Form Validation', () => {
    test('should show error for invalid email format', async () => {
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      
      await user.type(emailInput, 'invalid-email');
      await user.tab(); // Trigger blur event

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    test('should show error for empty email', async () => {
      renderLoginForm();

      const submitButton = screen.getByTestId('login-button');
      
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email is required')).toBeInTheDocument();
      });
    });

    test('should show error for empty password', async () => {
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');
      
      await user.type(emailInput, 'test@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Password is required')).toBeInTheDocument();
      });
    });

    test('should show error for short password', async () => {
      renderLoginForm();

      const passwordInput = screen.getByTestId('password-input').querySelector('input');
      
      await user.type(passwordInput, '123');
      await user.tab(); // Trigger blur event

      await waitFor(() => {
        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
      });
    });

    test('should accept valid email format', async () => {
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      
      await user.type(emailInput, 'test@example.com');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText('Invalid email address')).not.toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    const validFormData = {
      email: 'test@example.com',
      password: 'password123'
    };

    test('should call login function with correct data on valid submission', async () => {
      mockLogin.mockResolvedValue({ success: true });
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const passwordInput = screen.getByTestId('password-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');

      await user.type(emailInput, validFormData.email);
      await user.type(passwordInput, validFormData.password);
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith(validFormData.email, validFormData.password);
      });
    });

    test('should navigate to dashboard on successful login', async () => {
      mockLogin.mockResolvedValue({ success: true });
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const passwordInput = screen.getByTestId('password-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');

      await user.type(emailInput, validFormData.email);
      await user.type(passwordInput, validFormData.password);
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    test('should show error message on failed login', async () => {
      const errorMessage = 'Invalid credentials';
      mockLogin.mockResolvedValue({ success: false, error: errorMessage });
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const passwordInput = screen.getByTestId('password-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');

      await user.type(emailInput, validFormData.email);
      await user.type(passwordInput, validFormData.password);
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
      });
    });

    test('should disable submit button during loading', async () => {
      // Mock a delayed response
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve({ success: true }), 100)));
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const passwordInput = screen.getByTestId('password-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');

      await user.type(emailInput, validFormData.email);
      await user.type(passwordInput, validFormData.password);
      await user.click(submitButton);

      expect(submitButton).toBeDisabled();
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    test('should not submit form with invalid data', async () => {
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');

      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      // Login should not be called due to validation errors
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  describe('Navigation Links', () => {
    test('should have correct register link', () => {
      renderLoginForm();

      const registerLink = screen.getByTestId('register-link');
      expect(registerLink).toHaveAttribute('href', '/register');
      expect(registerLink).toHaveTextContent('Don\'t have an account? Sign Up');
    });
  });

  describe('Accessibility', () => {
    test('should have proper form labels', () => {
      renderLoginForm();

      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    test('should associate errors with form fields', async () => {
      renderLoginForm();

      const submitButton = screen.getByTestId('login-button');
      await user.click(submitButton);

      await waitFor(() => {
        const emailInput = screen.getByTestId('email-input').querySelector('input');
        expect(emailInput).toHaveAttribute('aria-invalid', 'true');
      });
    });

    test('should support keyboard navigation', async () => {
      renderLoginForm();

      const emailInput = screen.getByTestId('email-input').querySelector('input');
      const passwordInput = screen.getByTestId('password-input').querySelector('input');
      const submitButton = screen.getByTestId('login-button');

      // Tab through form elements
      expect(emailInput).toHaveFocus();
      
      await user.tab();
      expect(passwordInput).toHaveFocus();
      
      await user.tab();
      expect(submitButton).toHaveFocus();
    });
  });
});
