import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('AuthContext: Initializing, token exists:', !!token);
    if (token) {
      // Verify token and get user profile
      console.log('AuthContext: Verifying token...');
      authAPI.getProfile()
        .then(response => {
          console.log('AuthContext: Profile loaded:', response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.error('AuthContext: Token verification failed:', error);
          localStorage.removeItem('token');
        })
        .finally(() => {
          console.log('AuthContext: Setting loading to false');
          setLoading(false);
        });
    } else {
      console.log('AuthContext: No token, setting loading to false');
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      console.log('AuthContext: Attempting login with:', credentials);
      const response = await authAPI.login(credentials);
      console.log('AuthContext: Login response:', response.data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      console.log('AuthContext: User set to:', user);
      return user;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      console.log('Attempting registration with:', userData);
      const response = await authAPI.register(userData);
      console.log('Registration response:', response.data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};