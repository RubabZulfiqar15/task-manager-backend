const { body, param, validationResult } = require('express-validator');


const STATUS = ['Pending', 'In Progress', 'Completed'];


const validate = (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(400).json({ errors: errors.array() });
}
next();
};


exports.createTaskRules = [
body('title')
.trim()
.notEmpty().withMessage('Title is required')
.isLength({ max: 200 }).withMessage('Title too long (max 200)'),
body('description')
.optional()
.isLength({ max: 2000 }).withMessage('Description too long (max 2000)'),
body('status')
.optional()
.isIn(STATUS).withMessage(`Status must be one of: ${STATUS.join(', ')}`),
body('dueDate')
.optional()
.isISO8601().toDate().withMessage('dueDate must be a valid date'),
validate,
];


exports.updateTaskRules = [
body('title')
.optional()
.trim()
.notEmpty().withMessage('Title cannot be empty')
.isLength({ max: 200 }),
body('description')
.optional()
.isLength({ max: 2000 }),
body('status')
.optional()
.isIn(STATUS).withMessage(`Status must be one of: ${STATUS.join(', ')}`),
body('dueDate')
.optional()
.isISO8601().toDate().withMessage('dueDate must be a valid date'),
validate,
];


exports.idParamRule = [
param('id').isMongoId().withMessage('Invalid task id'),
validate,
];