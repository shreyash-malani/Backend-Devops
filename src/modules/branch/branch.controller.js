const branchData = require('./branch.data');

exports.createBranch = async (req, res) => {

  try {

    const branchId = await branchData.createBranch(req.db, req.body);

    res.status(201).json({
      message: 'Branch created successfully',
      branchId
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.getBranches = async (req, res) => {

  try {

    const branches = await branchData.getBranches(req.db);

    res.json(branches);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.getBranchById = async (req, res) => {

  try {

    const branch = await branchData.getBranchById(req.db, req.params.id);

    if (!branch) {
      return res.status(404).json({
        message: 'Branch not found'
      });
    }

    res.json(branch);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.updateBranch = async (req, res) => {

  try {

    const affectedRows = await branchData.updateBranch(
      req.db,
      req.params.id,
      req.body
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        message: 'Branch not found'
      });
    }

    const updatedBranch = await branchData.getBranchById(
      req.db,
      req.params.id
    );

    res.json({
      message: 'Branch updated successfully',
      branch: updatedBranch
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.deleteBranch = async (req, res) => {

  try {

    const affectedRows = await branchData.deactivateBranch(
      req.db,
      req.params.id
    );

    if (affectedRows === 0) {
      return res.status(404).json({
        message: 'Branch not found'
      });
    }

    res.json({
      message: 'Branch deleted successfully'
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};