const { body, param } = require('express-validator');
const mongoose = require('mongoose');
const createTaskRules = [
body('title').trim().notEmpty().withMessage('Title is required').isLength({
max: 120 }),
body('description').optional().trim().isLength({ max: 2000 }),
body('status').optional().isIn(['Pending', 'In Progress', 'Completed']),
body('dueDate').optional().isISO8601().toDate(),
];
const updateTaskRules = [
body('title').optional().trim().notEmpty().isLength({ max: 120 }),
body('description').optional().trim().isLength({ max: 2000 }),
body('status').optional().isIn(['Pending', 'In Progress', 'Completed']),
body('dueDate').optional().isISO8601().toDate(),
];
const idParamRule = [
param('id')
.custom((value) => mongoose.Types.ObjectId.isValid(value))
.withMessage('Invalid task id'),
];
module.exports = { createTaskRules, updateTaskRules, idParamRule };