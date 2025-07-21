const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// Create new task
const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { title, description, status, priority, dueDate, assignedTo, tags } = req.body;

    const task = new Task({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo: assignedTo || req.user._id,
      createdBy: req.user._id,
      tags
    });

    await task.save();
    await task.populate('assignedTo createdBy', 'username email profile');

    res.status(201).json({
      message: 'Task created successfully',
      task
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks
const getAllTasks = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      priority, 
      assignedTo, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    // Filter by status
    if (status) {
      query.status = status;
    }
    
    // Filter by priority
    if (priority) {
      query.priority = priority;
    }
    
    // Filter by assigned user
    if (assignedTo) {
      query.assignedTo = assignedTo;
    }
    
    // Search in title and description
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // If not admin, only show tasks assigned to or created by the user
    if (req.user.role !== 'admin') {
      query.$or = [
        { assignedTo: req.user._id },
        { createdBy: req.user._id }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const tasks = await Task.find(query)
      .populate('assignedTo createdBy', 'username email profile')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortOptions);

    const total = await Task.countDocuments(query);

    res.json({
      tasks,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get task by ID
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id)
      .populate('assignedTo createdBy', 'username email profile');
    
    if (!task) {
      return res.status(404).json({
        error: 'Task not found',
        details: 'The requested task does not exist'
      });
    }

    // Check if user has permission to view this task
    if (req.user.role !== 'admin' && 
        !task.assignedTo._id.equals(req.user._id) && 
        !task.createdBy._id.equals(req.user._id)) {
      return res.status(403).json({
        error: 'Access denied',
        details: 'You do not have permission to view this task'
      });
    }

    res.json({ task });
  } catch (error) {
    next(error);
  }
};

// Update task
const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation Error',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        error: 'Task not found',
        details: 'The requested task does not exist'
      });
    }

    // Check if user has permission to update this task
    if (req.user.role !== 'admin' && 
        !task.assignedTo.equals(req.user._id) && 
        !task.createdBy.equals(req.user._id)) {
      return res.status(403).json({
        error: 'Access denied',
        details: 'You do not have permission to update this task'
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('assignedTo createdBy', 'username email profile');

    res.json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({
        error: 'Task not found',
        details: 'The requested task does not exist'
      });
    }

    // Check if user has permission to delete this task
    if (req.user.role !== 'admin' && !task.createdBy.equals(req.user._id)) {
      return res.status(403).json({
        error: 'Access denied',
        details: 'You do not have permission to delete this task'
      });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get task statistics
const getTaskStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const overdueTasks = await Task.findOverdue();

    res.json({
      statusStats: stats,
      priorityStats,
      overdueCount: overdueTasks.length,
      totalTasks: await Task.countDocuments()
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
};
