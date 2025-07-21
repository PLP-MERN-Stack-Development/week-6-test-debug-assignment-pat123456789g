const express = require('express');
const { body } = require('express-validator');
const {
  registerUser,
  loginUser,
  getCurrentUser,
  updateProfile,
  getAllUsers
} = require('../controllers/userController');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const registerValidation = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const updateProfileValidation = [
  body('profile.firstName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('First name cannot exceed 50 characters'),
  body('profile.lastName')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Last name cannot exceed 50 characters'),
  body('profile.avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL')
];

// Public routes
router.post('/register', registerValidation, registerUser);
router.post('/login', loginValidation, loginUser);

// Protected routes
router.get('/me', authMiddleware, getCurrentUser);
router.put('/profile', authMiddleware, updateProfileValidation, updateProfile);

// Admin only routes
router.get('/', authMiddleware, adminMiddleware, getAllUsers);

module.exports = router;
