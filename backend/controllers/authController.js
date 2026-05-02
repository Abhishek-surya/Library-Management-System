const authService = require('../services/authService');

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User successfully registered! Redirecting...',
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authService.loginUser(email, password);
    res.json({
      success: true,
      message: 'Login successful!',
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
