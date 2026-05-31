async function createBranch(db, branchData) {
  const sql = `
    INSERT INTO branch_management 
    (branch_name, branch_type, is_active)
    VALUES (?, ?, ?)
  `;

  const values = [
    branchData.branch_name,
    branchData.branch_type,
    branchData.is_active ?? true
  ];

  const [result] = await db.execute(sql, values);

  return result.insertId;
}

async function getBranches(db) {

  const sql = `
    SELECT * 
    FROM branch_management
    WHERE is_active = 1
  `;

  const [rows] = await db.execute(sql);

  return rows;
}

async function getBranchById(db, id) {

  const sql = `
    SELECT *
    FROM branch_management
    WHERE branch_id = ? AND is_active = 1
  `;

  const [rows] = await db.execute(sql, [id]);

  return rows[0] || null;
}

async function updateBranch(db, id, updates) {

  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    return 0;
  }

  const sql = `
    UPDATE branch_management
    SET ${fields.join(', ')}
    WHERE branch_id = ? AND is_active = 1
  `;

  values.push(id);

  const [result] = await db.execute(sql, values);

  return result.affectedRows;
}

async function deactivateBranch(db, id) {

  const sql = `
    UPDATE branch_management
    SET is_active = 0
    WHERE branch_id = ?
  `;

  const [result] = await db.execute(sql, [id]);

  return result.affectedRows;
}

module.exports = {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deactivateBranch
};