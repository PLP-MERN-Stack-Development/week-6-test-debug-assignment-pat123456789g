<<<<<<< HEAD
# MERN Testing Application

A comprehensive MERN stack application with full testing suite including unit tests, integration tests, and end-to-end tests.

## 🎯 Overview

This project demonstrates modern testing practices for a MERN (MongoDB, Express.js, React, Node.js) stack application. It includes:

- **Frontend**: React application with Material-UI components
- **Backend**: Express.js API with MongoDB database
- **Testing**: Comprehensive test suite with Jest, React Testing Library, Supertest, and Cypress
- **Features**: User authentication, task management, and profile management

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone [your-repo-url]
cd mern-testing

# Install all dependencies
npm run install-all

# Set up environment variables
cp server/.env.example server/.env
# Edit server/.env with your configuration

# Set up test database
npm run setup-test-db
```

### Development
```bash
# Start both client and server
npm run dev

# Start server only
npm run server:dev

# Start client only  
npm run client:dev
```

### Testing
```bash
# Run all tests
npm test

# Run tests by type
npm run test:unit
npm run test:integration
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 📁 Project Structure

```
mern-testing/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── tests/          # Frontend tests
│   │   └── App.jsx
│   ├── cypress/            # E2E tests
│   └── package.json
├── server/                 # Express backend
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   ├── tests/              # Backend tests
│   └── package.json
├── jest.config.js          # Test configuration
└── package.json            # Root package
```

## 🧪 Testing Strategy

### Unit Testing
- **Frontend**: React component testing with React Testing Library
- **Backend**: Model and utility function testing with Jest
- **Coverage Target**: 70%+ code coverage

### Integration Testing
- **API Testing**: Endpoint testing with Supertest
- **Database Testing**: MongoDB operations with test database
- **Authentication Testing**: Complete auth flow testing

### End-to-End Testing
- **User Flows**: Critical user journeys with Cypress
- **Cross-browser**: Testing across different browsers
- **Visual Testing**: UI component regression testing

## 🔧 Technologies Used

### Frontend
- React 18
- Material-UI
- React Router DOM
- React Hook Form
- React Query
- Axios

### Backend
- Express.js
- MongoDB/Mongoose
- JWT Authentication
- Bcrypt
- Express Validator

### Testing
- Jest
- React Testing Library
- Supertest
- Cypress
- MongoDB Memory Server
- MSW (Mock Service Worker)

## 🏗️ Architecture

### Frontend Architecture
```
src/
├── components/         # Reusable UI components
├── context/           # React context for state management
├── tests/             # Component and integration tests
└── App.jsx           # Main application component
```

### Backend Architecture
```
src/
├── controllers/       # Business logic
├── models/           # Data models
├── routes/           # API endpoints
├── middleware/       # Custom middleware
└── index.js         # Application entry point
```

## 🔐 Authentication

The application implements JWT-based authentication with:
- User registration and login
- Protected routes
- Token-based session management
- Role-based access control

## 📊 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user
- `PUT /api/users/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get user tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🧪 Test Coverage

Current test coverage includes:

### Unit Tests
- ✅ User model validation
- ✅ Password hashing and comparison
- ✅ React component rendering
- ✅ Form validation
- ✅ Authentication context

### Integration Tests
- ✅ User authentication API
- ✅ User registration flow
- ✅ Protected route access
- ⏳ Task CRUD operations
- ⏳ Error handling

### E2E Tests
- ✅ User registration flow
- ✅ Login/logout functionality
- ✅ Protected route navigation
- ⏳ Task management workflow
- ⏳ Error scenarios

## 🐛 Debugging Features

### Server-Side Debugging
- Structured logging with Morgan
- Custom error handling middleware
- Environment-specific error responses
- Request/response logging

### Client-Side Debugging
- React Developer Tools support
- Console logging for development
- Toast notifications for user feedback
- Error boundary components (planned)

## 🚀 Deployment

### Environment Variables
```bash
# Server (.env)
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/mern-testing
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:3000

# Client (.env)
REACT_APP_API_URL=http://localhost:5000
```

### Production Build
```bash
# Build client
cd client && npm run build

# Start production server
cd server && npm start
```

## 📈 Performance

### Optimization Techniques
- Code splitting with React.lazy
- Memoization with React.memo
- Efficient database queries
- Request/response compression
- Static asset optimization

## 🔄 CI/CD

### Test Pipeline
1. Unit tests execution
2. Integration tests with test database
3. E2E tests with test environment
4. Coverage report generation
5. Build verification

## 🤝 Contributing

### Development Workflow
1. Clone the repository
2. Create feature branch
3. Write tests for new features
4. Implement features
5. Ensure all tests pass
6. Submit pull request

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Jest for test coverage
- Husky for pre-commit hooks

## 📚 Learning Resources

- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Express.js Testing](https://expressjs.com/en/guide/testing.html)
- [MongoDB Testing](https://docs.mongodb.com/manual/testing/)

## 📄 License

This project is for educational purposes as part of the PLP MERN Stack Development course.

## 🆘 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review test logs for error details
3. Ensure all dependencies are installed
4. Verify environment setup
5. Check MongoDB connection

---

**Week 6 Assignment**: Testing and Debugging MERN Stack Applications
**Course**: PLP MERN Stack Development
=======
[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19962355&assignment_repo_type=AssignmentRepo)
# Testing and Debugging MERN Applications

This assignment focuses on implementing comprehensive testing strategies for a MERN stack application, including unit testing, integration testing, and end-to-end testing, along with debugging techniques.

## Assignment Overview

You will:
1. Set up testing environments for both client and server
2. Write unit tests for React components and server functions
3. Implement integration tests for API endpoints
4. Create end-to-end tests for critical user flows
5. Apply debugging techniques for common MERN stack issues

## Project Structure

```
mern-testing/
├── client/                 # React front-end
│   ├── src/                # React source code
│   │   ├── components/     # React components
│   │   ├── tests/          # Client-side tests
│   │   │   ├── unit/       # Unit tests
│   │   │   └── integration/ # Integration tests
│   │   └── App.jsx         # Main application component
│   └── cypress/            # End-to-end tests
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
└── package.json            # Project dependencies
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week6-Assignment.md` file
4. Explore the starter code and existing tests
5. Complete the tasks outlined in the assignment

## Files Included

- `Week6-Assignment.md`: Detailed assignment instructions
- Starter code for a MERN application with basic test setup:
  - Sample React components with test files
  - Express routes with test files
  - Jest and testing library configurations
  - Example tests for reference

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Basic understanding of testing concepts

## Testing Tools

- Jest: JavaScript testing framework
- React Testing Library: Testing utilities for React
- Supertest: HTTP assertions for API testing
- Cypress/Playwright: End-to-end testing framework
- MongoDB Memory Server: In-memory MongoDB for testing

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all required tests (unit, integration, and end-to-end)
2. Achieve at least 70% code coverage for unit tests
3. Document your testing strategy in the README.md
4. Include screenshots of your test coverage reports
5. Demonstrate debugging techniques in your code

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices) 
>>>>>>> 3441c4bbb8f37f79a8ca94e0b537a8141166d5b7
