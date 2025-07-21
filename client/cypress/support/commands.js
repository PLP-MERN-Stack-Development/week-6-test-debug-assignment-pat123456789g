// Custom commands for authentication
Cypress.Commands.add('login', (email = 'test@example.com', password = 'Password123') => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/users/login`,
    body: { email, password }
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
    return response.body;
  });
});

Cypress.Commands.add('register', (userData) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/users/register`,
    body: userData
  }).then((response) => {
    window.localStorage.setItem('token', response.body.token);
    return response.body;
  });
});

Cypress.Commands.add('logout', () => {
  window.localStorage.removeItem('token');
});

// Custom command to create a test user
Cypress.Commands.add('createTestUser', (userData = {}) => {
  const defaultUserData = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'Password123',
    profile: {
      firstName: 'Test',
      lastName: 'User'
    },
    ...userData
  };

  return cy.register(defaultUserData);
});

// Custom command to create a test task
Cypress.Commands.add('createTestTask', (taskData = {}) => {
  const defaultTaskData = {
    title: 'Test Task',
    description: 'This is a test task',
    priority: 'medium',
    status: 'pending',
    ...taskData
  };

  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiUrl')}/api/tasks`,
    body: defaultTaskData,
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  });
});

// Custom command to wait for page to load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('[data-testid="app-title"]', { timeout: 10000 }).should('be.visible');
});

// Custom command to fill and submit login form
Cypress.Commands.add('fillLoginForm', (email, password) => {
  cy.get('[data-testid="email-input"] input').type(email);
  cy.get('[data-testid="password-input"] input').type(password);
  cy.get('[data-testid="login-button"]').click();
});

// Custom command to check if user is logged in
Cypress.Commands.add('checkLoggedIn', () => {
  cy.get('[data-testid="user-avatar"]').should('be.visible');
  cy.get('[data-testid="dashboard-link"]').should('be.visible');
});

// Custom command to check if user is logged out
Cypress.Commands.add('checkLoggedOut', () => {
  cy.get('[data-testid="login-link"]').should('be.visible');
  cy.get('[data-testid="register-link"]').should('be.visible');
});

// Type definitions would go in a separate .d.ts file for TypeScript projects
