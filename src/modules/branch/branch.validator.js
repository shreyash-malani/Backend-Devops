const validator = require('express-validator');

const validateCreateBranch = [

  validator.body('branch_name')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Branch name is required'),

  validator.body('branch_type')
    .trim()
    .notEmpty()
    .isString()
    .withMessage('Branch type is required')
];

module.exports = {
  validateCreateBranch
};