const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const upload = require('../../middlewares/upload');
const auth = require('../../middlewares/auth');
const { param } = require('express-validator');
const { validateCreateUser, validateUserLogin } = require('./user.validator');

const handleValidationErrors = require('../../middlewares/handleValidationErrors');

// upload.single runs first: It grabs the file, saves it to disk, and adds the file object to the req.
router.post('/', upload.single('profile_picture'), validateCreateUser, userController.createUser);

router.post('/login', validateUserLogin, handleValidationErrors, userController.loginUser);

router.get('/', userController.getUsers);

router.get('/:id', param('id').isInt().withMessage('ID must be an integer'),handleValidationErrors, userController.getUserById);

router.put('/:id', auth, upload.single('profile_picture'), param('id').isInt().withMessage('ID must be an integer'), handleValidationErrors, userController.updateUser);

router.delete('/:id', auth, param('id').isInt().withMessage('ID must be an integer'), handleValidationErrors, userController.deleteUser);

module.exports = router;