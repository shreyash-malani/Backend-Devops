async function createUser(db, userData) {
  const sql = `INSERT INTO mainuser (full_name, username, email_id, primary_mobile, password_hash, profile_picture, gender, date_of_birth, residential_address, aadhar_card_no, pan_card_no)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    userData.full_name,
    userData.username,
    userData.email_id,
    userData.primary_mobile,
    userData.password_hash,
    userData.profile_picture,
    userData.gender,
    userData.date_of_birth,
    userData.residential_address,
    userData.aadhar_card_no,
    userData.pan_card_no,
  ];
  const [result] = await db.execute(sql, values);  // db.executes return array  
  return result.insertId;
}

async function getUsers(db) {
  const sql = 'SELECT * FROM mainuser WHERE is_active = 1';
  const [rows] = await db.execute(sql);
  return rows;
}

async function getUserById(db, id) {
  const sql = 'SELECT * FROM mainuser WHERE user_id = ? AND is_active = 1';
  const [rows] = await db.execute(sql, [id]);
  return rows[0] || null; // rows[0] means first object of the array 
} 

async function updateUser(db, id, updates) {
  const fields = [];
  const values = [];

  for (const [key, value] of Object.entries(updates)) {
    fields.push(`${key} = ?`);
    values.push(value);
  }

  if (fields.length === 0) {
    return 0;
  }

  const sql = `UPDATE mainuser SET ${fields.join(', ')} WHERE user_id = ? AND is_active = 1`;
  values.push(id);
  const [result] = await db.execute(sql, values);
  return result.affectedRows;
}

// async function updateUser(db, id, userData) {

//   const sql = `
//     UPDATE mainuser
//     SET full_name = ?,
//         email_id = ?,
//         username = ?
//     WHERE user_id = ?
//   `;

//   const values = [
//     userData.full_name,
//     userData.email_id,
//     userData.username,
//     id
//   ];

//   const [result] = await db.execute(sql, values);

//   return result.affectedRows;
// }

async function deactivateUser(db, id) {
  const sql = 'UPDATE mainuser SET is_active = 0 WHERE user_id = ?';
  const [result] = await db.execute(sql, [id]);
  return result.affectedRows;
}

async function findByUsername(db, username) {
  const sql = 'SELECT * FROM mainuser WHERE username = ? AND is_active = 1';
  const [rows] = await db.execute(sql, [username]);
  console.log('findByUsername result:', rows); // Debugging log
  return rows[0] || null;
}

async function updateLastLogin(db, userId) {
  const sql = 'UPDATE mainuser SET last_login_at = NOW() WHERE user_id = ?';
  const [result] = await db.execute(sql, [userId]);
  return result.affectedRows;
}



module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deactivateUser,
  findByUsername,
  updateLastLogin
};