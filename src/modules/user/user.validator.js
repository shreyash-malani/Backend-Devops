const validator = require('express-validator');

const validateCreateUser = [

    validator.body('full_name')
        .trim()
        .notEmpty()
        .withMessage('Please enter full name'), // this is used to check whether the fields are empty or not and also to remove the extra spaces from the input and give custom message

    validator.body('username')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Username should contain minimum 3 letters'),

    validator.body('email_id')
        .trim()
        .isEmail()
        .withMessage('Please enter valid email'),

    validator.body('primary_mobile')
        .trim()
        .isMobilePhone()
        .withMessage('Please enter valid mobile number'),

    validator.body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password should contain minimum 6 characters')
];

const validateUserLogin = [

    validator.body('username')
        .trim()
        .notEmpty()
        .withMessage('Username cannot be empty'), // this is used during login to check whether the username and password fields are not empty and give custom message

    validator.body('password')
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty')
];

module.exports = {
    validateCreateUser,
    validateUserLogin
};