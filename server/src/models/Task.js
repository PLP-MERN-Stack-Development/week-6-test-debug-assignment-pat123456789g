const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value > new Date();
      },
      message: 'Due date must be in the future'
    }
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must be assigned to a user']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Task must have a creator']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Update completed status and timestamp when status changes to completed
taskSchema.pre('save', function(next) {
  if (this.isModified('status')) {
    if (this.status === 'completed') {
      this.completed = true;
      this.completedAt = new Date();
    } else {
      this.completed = false;
      this.completedAt = null;
    }
  }
  next();
});

// Static method to find tasks by status
taskSchema.statics.findByStatus = function(status) {
  return this.find({ status });
};

// Static method to find overdue tasks
taskSchema.statics.findOverdue = function() {
  return this.find({
    dueDate: { $lt: new Date() },
    status: { $ne: 'completed' }
  });
};

// Virtual for checking if task is overdue
taskSchema.virtual('isOverdue').get(function() {
  return this.dueDate && this.dueDate < new Date() && this.status !== 'completed';
});

// Instance method to mark as completed
taskSchema.methods.markCompleted = function() {
  this.status = 'completed';
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

module.exports = mongoose.model('Task', taskSchema);
