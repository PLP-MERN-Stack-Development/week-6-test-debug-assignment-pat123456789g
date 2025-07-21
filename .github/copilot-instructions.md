<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# MERN Testing Application - Copilot Instructions

## Project Overview
This is a MERN stack application focused on comprehensive testing strategies including unit testing, integration testing, and end-to-end testing. The application includes user authentication, task management, and demonstrates modern testing practices.

## Code Style and Conventions

### General Guidelines
- Use ES6+ modern JavaScript features
- Follow functional programming patterns where appropriate
- Prefer arrow functions for concise code
- Use async/await over promises for better readability
- Include proper error handling in all functions
- Write descriptive variable and function names

### React Guidelines
- Use functional components with hooks
- Implement proper prop validation with PropTypes or TypeScript
- Use React.memo for performance optimization when needed
- Follow the principle of component composition
- Keep components small and focused on single responsibility
- Use custom hooks for reusable logic

### Node.js/Express Guidelines
- Use middleware for cross-cutting concerns
- Implement proper input validation using express-validator
- Use async/await in route handlers
- Return consistent API response formats
- Implement proper error handling middleware
- Use proper HTTP status codes

### Testing Guidelines
- Write tests before or alongside implementation (TDD/BDD)
- Use descriptive test names that explain the behavior being tested
- Follow the AAA pattern: Arrange, Act, Assert
- Mock external dependencies in unit tests
- Use real databases for integration tests (with cleanup)
- Test both success and error scenarios
- Aim for high test coverage but focus on meaningful tests

## Testing Patterns

### Unit Testing
- Test individual functions and components in isolation
- Mock all external dependencies
- Test edge cases and error conditions
- Use data-testid attributes for reliable element selection
- Test component behavior, not implementation details

### Integration Testing
- Test API endpoints with real database operations
- Test complete user workflows
- Use test-specific data and clean up after tests
- Test authentication and authorization flows
- Verify error handling and validation

### E2E Testing
- Test critical user journeys from start to finish
- Use page object models for maintainable tests
- Test across different browsers and devices
- Include visual regression testing
- Test error scenarios and recovery

## Security Considerations
- Always validate and sanitize user input
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Use HTTPS in production
- Store sensitive data securely (environment variables)
- Implement rate limiting for API endpoints

## Performance Guidelines
- Optimize database queries with proper indexing
- Use pagination for large data sets
- Implement caching strategies where appropriate
- Optimize React components with React.memo and useMemo
- Use code splitting for better load times
- Monitor and profile application performance

## File Organization
- Group related files together
- Use descriptive folder names
- Keep test files close to the code they test
- Separate concerns (models, controllers, routes, etc.)
- Use barrel exports for cleaner imports

## Documentation
- Write clear and concise comments for complex logic
- Include JSDoc comments for functions and classes
- Update README files when adding new features
- Document API endpoints with proper examples
- Include setup and deployment instructions

## Debugging and Monitoring
- Use proper logging levels (debug, info, warn, error)
- Include request/response logging for API endpoints
- Implement health check endpoints
- Use environment-specific configurations
- Include performance monitoring in production

## Dependencies
- Keep dependencies up to date
- Use exact versions for production dependencies
- Regularly audit dependencies for security vulnerabilities
- Prefer smaller, focused libraries over large frameworks
- Document why specific dependencies are chosen

## Environment Configuration
- Use environment variables for configuration
- Provide example environment files
- Document all required environment variables
- Use different configurations for different environments
- Never commit sensitive information to version control

When generating code for this project, please follow these guidelines and prioritize writing testable, maintainable, and secure code.
