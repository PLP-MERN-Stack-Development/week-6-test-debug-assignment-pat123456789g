const express = require('express');
const { body } = require('express-validator');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');

const router = express.Router();

// Validation rules
const createTaskValidation = [
  body('title')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim(),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be one of: pending, in-progress, completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be one of: low, medium, high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Due date must be in the future');
      }
      return true;
    }),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Assigned to must be a valid user ID'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Each tag must be between 1 and 20 characters')
];

const updateTaskValidation = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
    .trim(),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be one of: pending, in-progress, completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be one of: low, medium, high'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Due date must be a valid date'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Assigned to must be a valid user ID'),
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  body('tags.*')
    .optional()
    .isString()
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Each tag must be between 1 and 20 characters')
];

// Routes
router.post('/', createTaskValidation, createTask);
router.get('/', getAllTasks);
router.get('/stats', getTaskStats);
router.get('/:id', getTaskById);
router.put('/:id', updateTaskValidation, updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
