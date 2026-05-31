const express = require('express');
const router = express.Router();
const branchController = require('./branch.controller');
const auth = require('../../middlewares/auth');
const { param } = require('express-validator');
const {validateCreateBranch} = require('./branch.validator');
const upload = require('../../middlewares/upload');
const handleValidationErrors = require('../../middlewares/handleValidationErrors');


router.post(
  '/',
  upload.none(),
  validateCreateBranch,
  handleValidationErrors,
  branchController.createBranch
);

router.get(
  '/',
  branchController.getBranches
);

router.get(
  '/:id',
  upload.none(),
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
  handleValidationErrors,
  branchController.getBranchById
);

router.put(
  '/:id',
upload.none(),
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
  handleValidationErrors,
  branchController.updateBranch
);

router.delete(
  '/:id',
  param('id')
    .isInt()
    .withMessage('ID must be an integer'),
  handleValidationErrors,
  branchController.deleteBranch
);

module.exports = router;