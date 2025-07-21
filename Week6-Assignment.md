<<<<<<< HEAD
# Week 6 Assignment: Testing and Debugging MERN Stack Application

## 🎯 Objective
Implement comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, while also learning debugging techniques to identify and fix common issues.

## 📁 Project Structure
```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   ├── cypress/            # End-to-end tests
│   │   ├── e2e/           # E2E test files
│   │   └── support/       # Cypress support files
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── src/                # Server source code
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── tests/              # Server-side tests
│       ├── unit/           # Unit tests
│       └── integration/    # Integration tests
├── jest.config.js          # Jest configuration
└── package.json            # Root project dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn

### Installation
1. Clone your GitHub Classroom repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```
3. Set up environment variables:
   ```bash
   # Copy environment examples
   cp server/.env.example server/.env
   ```
4. Set up test database:
   ```bash
   npm run setup-test-db
   ```

### Running the Application
```bash
# Start both client and server in development mode
npm run dev

# Start server only
npm run server:dev

# Start client only
npm run client:dev
```

### Running Tests
```bash
# Run all tests
npm test

# Run only unit tests
npm run test:unit

# Run only integration tests
npm run test:integration

# Run only end-to-end tests
npm run test:e2e

# Run tests with coverage
npm run test:coverage
```

## 📋 Tasks

### Task 1: Setting Up Testing Environment ✅
**Status: Completed**

The testing environment has been set up with:
- ✅ Jest configured for both client and server
- ✅ React Testing Library for component testing
- ✅ Supertest for API endpoint testing
- ✅ MongoDB Memory Server for test database
- ✅ Cypress for end-to-end testing
- ✅ Test scripts in package.json

### Task 2: Unit Testing
**Requirements:**
- [ ] Write unit tests for utility functions in both client and server
- [ ] Test React components in isolation using mocks for dependencies
- [ ] Implement tests for Redux reducers and actions (if applicable)
- [ ] Create tests for custom hooks in React
- [ ] Test Express middleware functions
- [ ] Achieve at least 70% code coverage for unit tests

**Current Progress:**
- ✅ User model unit tests (server/tests/unit/user.model.test.js)
- ✅ Header component unit tests (client/src/tests/unit/Header.test.jsx)
- ✅ LoginForm component unit tests (client/src/tests/unit/LoginForm.test.jsx)
- [ ] Add more component tests
- [ ] Add utility function tests
- [ ] Add middleware tests
- [ ] Add custom hook tests

### Task 3: Integration Testing
**Requirements:**
- [ ] Write tests for API endpoints using Supertest
- [ ] Test database operations with a test database
- [ ] Implement integration tests for React components that interact with APIs
- [ ] Test authentication flows
- [ ] Create tests for form submissions and data validation

**Current Progress:**
- ✅ User routes integration tests (server/tests/integration/user.routes.test.js)
- [ ] Task routes integration tests
- [ ] Client-side API integration tests
- [ ] Authentication flow tests
- [ ] Form validation tests

### Task 4: End-to-End Testing
**Requirements:**
- [ ] Set up Cypress or Playwright for end-to-end testing
- [ ] Create tests for critical user flows (e.g., registration, login, CRUD operations)
- [ ] Test navigation and routing
- [ ] Implement tests for error handling and edge cases
- [ ] Create visual regression tests for UI components

**Current Progress:**
- ✅ Cypress configuration and setup
- ✅ Authentication flow E2E tests (client/cypress/e2e/auth.cy.js)
- [ ] Task management E2E tests
- [ ] Navigation E2E tests
- [ ] Error handling E2E tests

### Task 5: Debugging Techniques
**Requirements:**
- [ ] Use logging strategies for server-side debugging
- [ ] Implement error boundaries in React
- [ ] Use browser developer tools for client-side debugging
- [ ] Create a global error handler for the Express server
- [ ] Implement performance monitoring and optimization

**Current Progress:**
- ✅ Server-side logging middleware
- ✅ Global error handler for Express
- [ ] React error boundaries
- [ ] Client-side debugging tools
- [ ] Performance monitoring

## 🧪 Test Files Included

### Server Tests
- `server/tests/setup.js` - Test environment setup
- `server/tests/unit/user.model.test.js` - User model unit tests
- `server/tests/integration/user.routes.test.js` - User API integration tests

### Client Tests
- `client/src/setupTests.js` - Client test setup
- `client/src/tests/unit/Header.test.jsx` - Header component tests
- `client/src/tests/unit/LoginForm.test.jsx` - Login form tests

### E2E Tests
- `client/cypress/e2e/auth.cy.js` - Authentication flow tests

## 🛠️ Testing Tools Configuration

### Jest Configuration
- Root configuration in `jest.config.js`
- Separate configurations for client and server
- Coverage thresholds set to 70%
- MongoDB Memory Server for isolated testing

### React Testing Library
- Configured with Material-UI theme provider
- MSW (Mock Service Worker) for API mocking
- Custom render utilities for consistent testing

### Cypress Configuration
- E2E testing setup in `client/cypress.config.js`
- Custom commands for authentication flows
- Support for component testing

## 📊 Coverage Requirements
- **Minimum 70% code coverage** for unit tests
- Coverage reports generated in HTML and LCOV formats
- Exclude configuration files and test files from coverage

## 🐛 Debugging Tools Implemented

### Server-Side Debugging
- Morgan HTTP request logger
- Custom logging middleware
- Comprehensive error handling middleware
- Environment-specific error responses

### Client-Side Debugging
- React error boundaries (to be implemented)
- Console logging for development
- Toast notifications for user feedback

## 📝 Testing Best Practices

### Unit Testing
- Test components in isolation
- Mock external dependencies
- Test both success and error scenarios
- Use descriptive test names

### Integration Testing
- Test real API endpoints
- Use test database for data operations
- Test complete user workflows
- Verify error handling

### E2E Testing
- Test critical user journeys
- Use page objects for maintainable tests
- Test across different browsers
- Include visual regression testing

## 🎯 Success Criteria

### Required Deliverables
- [ ] Complete test suite with 70%+ coverage
- [ ] All unit tests passing
- [ ] All integration tests passing
- [ ] All E2E tests passing
- [ ] Documented testing strategy
- [ ] Screenshots of test coverage reports
- [ ] Working debugging tools and techniques

### Bonus Points
- [ ] Visual regression tests
- [ ] Performance testing
- [ ] Cross-browser E2E testing
- [ ] Automated test reporting
- [ ] CI/CD pipeline with tests

## 🚀 Next Steps

1. **Complete Unit Tests**: Add remaining component and utility tests
2. **Expand Integration Tests**: Add task routes and client API tests
3. **Enhance E2E Tests**: Add task management and error handling tests
4. **Implement Debugging Tools**: Add React error boundaries and monitoring
5. **Achieve Coverage Goals**: Ensure 70%+ test coverage across the application

## 📚 Resources
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://docs.mongodb.com/manual/testing/)

## 🤝 Support
If you encounter any issues:
1. Check the test output for detailed error messages
2. Review the configuration files for proper setup
3. Ensure all dependencies are installed correctly
4. Check that MongoDB is running for integration tests
5. Verify environment variables are set correctly
=======
# 🧪 Week 6: Testing and Debugging – Ensuring MERN App Reliability

## 🚀 Objective
Implement comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, while also learning debugging techniques to identify and fix common issues.

## 📂 Tasks

### Task 1: Setting Up Testing Environment
- Configure Jest as the testing framework for both client and server
- Set up testing utilities for React components (React Testing Library)
- Configure Supertest for API endpoint testing
- Create a separate test database for integration tests
- Implement test scripts in package.json for running different types of tests

### Task 2: Unit Testing
- Write unit tests for utility functions in both client and server
- Test React components in isolation using mocks for dependencies
- Implement tests for Redux reducers and actions (if applicable)
- Create tests for custom hooks in React
- Test Express middleware functions
- Achieve at least 70% code coverage for unit tests

### Task 3: Integration Testing
- Write tests for API endpoints using Supertest
- Test database operations with a test database
- Implement integration tests for React components that interact with APIs
- Test authentication flows
- Create tests for form submissions and data validation

### Task 4: End-to-End Testing
- Set up Cypress or Playwright for end-to-end testing
- Create tests for critical user flows (e.g., registration, login, CRUD operations)
- Test navigation and routing
- Implement tests for error handling and edge cases
- Create visual regression tests for UI components

### Task 5: Debugging Techniques
- Use logging strategies for server-side debugging
- Implement error boundaries in React
- Use browser developer tools for client-side debugging
- Create a global error handler for the Express server
- Implement performance monitoring and optimization

## 🧪 Expected Outcome
- A comprehensive test suite for a MERN stack application
- Well-documented testing strategies and methodologies
- High code coverage for critical application features
- Improved application reliability and stability
- Implementation of debugging tools and techniques

## 🛠️ Setup
1. Clone the starter code repository
2. Install dependencies for both client and server:
   ```
   # In the root directory
   npm run install-all
   ```
3. Set up the test database:
   ```
   # In the server directory
   npm run setup-test-db
   ```
4. Run the tests:
   ```
   # Run all tests
   npm test
   
   # Run only unit tests
   npm run test:unit
   
   # Run only integration tests
   npm run test:integration
   
   # Run only end-to-end tests
   npm run test:e2e
   ```

## ✅ Submission Instructions
1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Complete all the tasks in the assignment
4. Commit and push your code regularly to show progress
5. Include in your repository:
   - Complete test files for unit, integration, and end-to-end testing
   - Documentation of your testing strategy
   - Screenshots of test coverage reports
   - Examples of debugging techniques implemented
6. Your submission will be automatically graded based on the criteria in the autograding configuration
7. The instructor will review your submission after the autograding is complete 
>>>>>>> 3441c4bbb8f37f79a8ca94e0b537a8141166d5b7
