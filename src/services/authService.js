import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear local storage and redirect to login
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  login: async (credentials) => {
    try {
      // For development/testing, simulate API call
      if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (credentials.email && credentials.password) {
              const userData = {
                id: '1',
                name: 'Test User',
                email: credentials.email,
                token: 'fake-jwt-token',
              };
              localStorage.setItem('token', userData.token);
              resolve({ data: userData });
            } else {
              throw new Error('Invalid credentials');
            }
          }, 1000);
        });
      }

      // Real API call
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      // For development/testing, simulate API call
      if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (userData.email && userData.password) {
              const newUser = {
                id: '1',
                name: userData.name,
                email: userData.email,
                token: 'fake-jwt-token',
              };
              localStorage.setItem('token', newUser.token);
              resolve({ data: newUser });
            } else {
              throw new Error('Invalid registration data');
            }
          }, 1000);
        });
      }

      // Real API call
      const response = await api.post('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // For development/testing, simulate API call
      if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => {
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            resolve(true);
          }, 500);
        });
      }

      // Real API call
      await api.post('/auth/logout');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Clean up local storage even if API call fails
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      // For development/testing, simulate API call
      if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => {
          setTimeout(() => {
            const token = localStorage.getItem('token');
            if (token) {
              resolve({
                data: {
                  id: '1',
                  name: 'Test User',
                  email: 'test@example.com',
                },
              });
            } else {
              throw new Error('No token found');
            }
          }, 500);
        });
      }

      // Real API call
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      // For development/testing, simulate API call
      if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { message: 'Reset link sent successfully' } });
          }, 1000);
        });
      }

      // Real API call
      const response = await api.post('/auth/forgot-password', { email });
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      // For development/testing, simulate API call
      if (process.env.NODE_ENV === 'development') {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ data: { message: 'Password reset successfully' } });
          }, 1000);
        });
      }

      // Real API call
      const response = await api.post('/auth/reset-password', {
        token,
        password: newPassword,
      });
      return response;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },
};

export default authService;