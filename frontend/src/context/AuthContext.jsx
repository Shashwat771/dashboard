import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Initialize auth from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('dashboardUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('dashboardUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call with validation
      setTimeout(() => {
        if (!email || !password) {
          const error = 'Email and password are required';
          setAuthError(error);
          reject(new Error(error));
          return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          const error = 'Invalid email format';
          setAuthError(error);
          reject(new Error(error));
          return;
        }

        if (password.length < 6) {
          const error = 'Password must be at least 6 characters';
          setAuthError(error);
          reject(new Error(error));
          return;
        }

        // Success
        const userData = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };

        setUser(userData);
        setAuthError('');
        localStorage.setItem('dashboardUser', JSON.stringify(userData));
        resolve(userData);
      }, 800);
    });
  };

  const signup = (email, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validation
        if (!email || !password || !confirmPassword) {
          const error = 'All fields are required';
          setAuthError(error);
          reject(new Error(error));
          return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          const error = 'Invalid email format';
          setAuthError(error);
          reject(new Error(error));
          return;
        }

        if (password.length < 6) {
          const error = 'Password must be at least 6 characters';
          setAuthError(error);
          reject(new Error(error));
          return;
        }

        if (password !== confirmPassword) {
          const error = 'Passwords do not match';
          setAuthError(error);
          reject(new Error(error));
          return;
        }

        // Success
        const userData = {
          id: Date.now(),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };

        setUser(userData);
        setAuthError('');
        localStorage.setItem('dashboardUser', JSON.stringify(userData));
        resolve(userData);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    setAuthError('');
    localStorage.removeItem('dashboardUser');
  };

  const clearError = () => {
    setAuthError('');
  };

  const value = {
    user,
    loading,
    authError,
    login,
    signup,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
