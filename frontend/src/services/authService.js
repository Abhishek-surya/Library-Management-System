import api from './api';

const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.success) {
    localStorage.setItem('lumina_user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('lumina_user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('lumina_user'));
};

const authService = {
  login,
  signup,
  logout,
  getCurrentUser,
};

export default authService;
