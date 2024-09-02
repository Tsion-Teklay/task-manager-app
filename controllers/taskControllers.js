const Task = require('../models/taskModel');

// Create a task
exports.createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        const userId = req.user.userId;

        const task = new Task({ title, description, priority, userId });
        await task.save();

        res.status(201).json({ task });
    } catch (error) {
        res.status(400).json({ error: 'Task creation failed', details: error.message });
    }
};

// Get tasks for a user
exports.loadTasks = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tasks = await Task.find({ userId });

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ error: 'Failed to load tasks', details: error.message });
    }
};

// Get all tasks (Admin only)
exports.loadAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId', 'name email');
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(400).json({ error: 'Failed to load tasks', details: error.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority } = req.body;

        // Find the task by ID
        const task = await Task.findById(id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Check if the user is authorized (either task owner or admin)
        if (task.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to update this task' });
        }

        // Update the task
        task.title = title || task.title;
        task.description = description || task.description;
        task.priority = priority || task.priority;

        await task.save();

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};


// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the task by ID
        const task = await Task.findById(id);

        // Check if task exists
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Check if the user is authorized (either task owner or admin)
        if (task.userId.toString() !== req.user.userId && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this task' });
        }

        await task.deleteOne();

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error', details: error.message });
    }
};

