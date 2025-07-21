import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import UserProfile from './components/UserProfile';

// Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Create Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? children : <Navigate to="/login" />;
};

// Public Route component (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <div className="App">
              <Header />
              <main style={{ marginTop: '64px', padding: '20px' }}>
                <Routes>
                  <Route 
                    path="/login" 
                    element={
                      <PublicRoute>
                        <LoginForm />
                      </PublicRoute>
                    } 
                  />
                  <Route 
                    path="/register" 
                    element={
                      <PublicRoute>
                        <RegisterForm />
                      </PublicRoute>
                    } 
                  />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/tasks" 
                    element={
                      <ProtectedRoute>
                        <TaskList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/tasks/new" 
                    element={
                      <ProtectedRoute>
                        <TaskForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/tasks/:id/edit" 
                    element={
                      <ProtectedRoute>
                        <TaskForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <UserProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
              </main>
              <Toaster position="top-right" />
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
