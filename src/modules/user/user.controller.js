const bcrypt = require('bcrypt'); // used to store for password hashing and comparing the password during login
const { generateToken } = require('../../services/jwtService');
const userData = require('./user.data');
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const profile_picture = req.file ? req.file.path : null;
     
    console.log('Received user file :', req.file);
    console.log('Received user file path:', req.file.path);
    
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const userId = await userData.createUser(req.db, {
      ...req.body,
      password_hash: hashedPassword,
      profile_picture,
      gender: req.body.gender || 'Prefer Not to Say',
    });
    res.status(201).json({ message: 'User created successfully', userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userData.getUsers(req.db);  // req.db is used for database connection which is established in the app.js file and passed to the controllers through the request object. This allows us to execute database queries using the connection for each request.
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userData.getUserById(req.db, req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => { 
  try {
    const profile_picture = req.file ? req.file.path : null;
    const updates = {
      ...req.body,
      ...(profile_picture ? { profile_picture } : {}),
    };

    if (updates.password) {
      updates.password_hash = await bcrypt.hash(updates.password, saltRounds);
      delete updates.password;
    }

    const affectedRows = await userData.updateUser(req.db, req.params.id, updates);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const updatedUser = await userData.getUserById(req.db, req.params.id);
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const affectedRows = await userData.deactivateUser(req.db, req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userData.findByUsername(req.db, username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // await req.db.execute('UPDATE mainuser SET last_login_at = NOW() WHERE user_id = ?', [user.user_id]); //NOW() return current time 
    
    await userData.updateLastLogin(req.db, user.user_id); // this will update the last login time of the user in the database
    
    const token = generateToken({ user_id: user.user_id, username: user.username });

    res.json({ message: 'Login successful', token, user: { user_id: user.user_id, username: user.username, email_id: user.email_id } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};