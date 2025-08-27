const Task = require('../models/Task');


exports.createTask = async (req, res, next) => {
try {
const task = await Task.create(req.body);
res.status(201).json(task);
} catch (err) {
next(err);
}
};


exports.getTasks = async (req, res, next) => {
try {
const tasks = await Task.find().sort({ createdAt: -1 });
res.json(tasks);
} catch (err) {
next(err);
}
};


exports.getTaskById = async (req, res, next) => {
try {
const task = await Task.findById(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json(task);
} catch (err) {
next(err);
}
};


exports.updateTask = async (req, res, next) => {
try {
const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
new: true,
runValidators: true,
});
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json(task);
} catch (err) {
next(err);
}
};


exports.deleteTask = async (req, res, next) => {
try {
const task = await Task.findByIdAndDelete(req.params.id);
if (!task) return res.status(404).json({ message: 'Task not found' });
res.json({ message: 'Task deleted' });
} catch (err) {
next(err);
}
};