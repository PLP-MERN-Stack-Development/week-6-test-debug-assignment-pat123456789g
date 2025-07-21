describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear localStorage and visit the app
    cy.clearLocalStorage();
    cy.visit('/');
  });

  describe('User Registration', () => {
    it('should allow new user to register successfully', () => {
      // Navigate to register page
      cy.get('[data-testid="register-link"]').click();
      cy.url().should('include', '/register');

      // Fill registration form
      const uniqueEmail = `test${Date.now()}@example.com`;
      cy.get('[data-testid="username-input"] input').type('testuser');
      cy.get('[data-testid="email-input"] input').type(uniqueEmail);
      cy.get('[data-testid="password-input"] input').type('Password123');
      cy.get('[data-testid="confirm-password-input"] input').type('Password123');
      cy.get('[data-testid="firstname-input"] input').type('Test');
      cy.get('[data-testid="lastname-input"] input').type('User');

      // Submit form
      cy.get('[data-testid="register-button"]').click();

      // Should redirect to dashboard and show user is logged in
      cy.url().should('include', '/dashboard');
      cy.checkLoggedIn();
    });

    it('should show validation errors for invalid registration data', () => {
      cy.get('[data-testid="register-link"]').click();

      // Try to submit empty form
      cy.get('[data-testid="register-button"]').click();

      // Should show validation errors
      cy.contains('Username is required').should('be.visible');
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should validate password confirmation', () => {
      cy.get('[data-testid="register-link"]').click();

      cy.get('[data-testid="password-input"] input').type('Password123');
      cy.get('[data-testid="confirm-password-input"] input').type('DifferentPassword');
      cy.get('[data-testid="register-button"]').click();

      cy.contains('Passwords do not match').should('be.visible');
    });
  });

  describe('User Login', () => {
    beforeEach(() => {
      // Create a test user for login tests
      cy.createTestUser();
      cy.logout(); // Clear the auto-login from registration
    });

    it('should allow existing user to login successfully', () => {
      cy.visit('/login');

      // Fill login form
      cy.fillLoginForm('test@example.com', 'Password123');

      // Should redirect to dashboard
      cy.url().should('include', '/dashboard');
      cy.checkLoggedIn();
    });

    it('should show error for invalid credentials', () => {
      cy.visit('/login');

      // Try to login with wrong credentials
      cy.fillLoginForm('test@example.com', 'WrongPassword');

      // Should show error message
      cy.get('[data-testid="error-message"]').should('contain', 'Invalid credentials');
      cy.url().should('include', '/login');
    });

    it('should show validation errors for empty fields', () => {
      cy.visit('/login');

      // Try to submit empty form
      cy.get('[data-testid="login-button"]').click();

      // Should show validation errors
      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('should validate email format', () => {
      cy.visit('/login');

      cy.get('[data-testid="email-input"] input').type('invalid-email');
      cy.get('[data-testid="login-button"]').click();

      cy.contains('Invalid email address').should('be.visible');
    });
  });

  describe('Protected Routes', () => {
    it('should redirect unauthenticated user to login page', () => {
      // Try to access protected route
      cy.visit('/dashboard');

      // Should redirect to login
      cy.url().should('include', '/login');
      cy.checkLoggedOut();
    });

    it('should allow authenticated user to access protected routes', () => {
      // Login first
      cy.createTestUser();

      // Should be able to access dashboard
      cy.visit('/dashboard');
      cy.url().should('include', '/dashboard');
      cy.checkLoggedIn();

      // Should be able to access tasks
      cy.visit('/tasks');
      cy.url().should('include', '/tasks');
    });
  });

  describe('Logout', () => {
    beforeEach(() => {
      cy.createTestUser();
    });

    it('should logout user successfully', () => {
      cy.visit('/dashboard');
      cy.checkLoggedIn();

      // Click user avatar to open menu
      cy.get('[data-testid="user-avatar"]').click();

      // Click logout
      cy.get('[data-testid="logout-menu-item"]').click();

      // Should redirect to login and clear authentication
      cy.url().should('include', '/login');
      cy.checkLoggedOut();
    });

    it('should clear authentication state after logout', () => {
      cy.visit('/dashboard');

      // Logout
      cy.get('[data-testid="user-avatar"]').click();
      cy.get('[data-testid="logout-menu-item"]').click();

      // Try to access protected route - should redirect to login
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });
  });

  describe('Navigation', () => {
    it('should redirect root path to dashboard for authenticated users', () => {
      cy.createTestUser();
      
      cy.visit('/');
      cy.url().should('include', '/dashboard');
    });

    it('should show login/register links for unauthenticated users', () => {
      cy.visit('/');

      cy.get('[data-testid="login-link"]').should('be.visible');
      cy.get('[data-testid="register-link"]').should('be.visible');
    });

    it('should show navigation links for authenticated users', () => {
      cy.createTestUser();
      cy.visit('/');

      cy.get('[data-testid="dashboard-link"]').should('be.visible');
      cy.get('[data-testid="tasks-link"]').should('be.visible');
      cy.get('[data-testid="user-avatar"]').should('be.visible');
    });
  });

  describe('Session Persistence', () => {
    it('should maintain session across page refreshes', () => {
      cy.createTestUser();
      cy.visit('/dashboard');
      cy.checkLoggedIn();

      // Refresh page
      cy.reload();

      // Should still be logged in
      cy.checkLoggedIn();
      cy.url().should('include', '/dashboard');
    });

    it('should restore session from localStorage', () => {
      cy.createTestUser();
      
      // Visit login page (should redirect to dashboard)
      cy.visit('/login');
      cy.url().should('include', '/dashboard');
      cy.checkLoggedIn();
    });
  });
});
