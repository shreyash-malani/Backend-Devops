const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/config');
const userRoutes = require('./modules/user/user.routes');
const branchRoutes = require('./modules/branch/branch.routes');
const errorHandler = require('./middlewares/errorHandler');

async function createApp() {
  const app = express();

  // Middlewares
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use('/uploads', express.static('uploads'));

  // Initialize DB connection
  let dbConnection;
  try{
    dbConnection = await connectDB();
    console.log('Database connection established successfully');
  }
  catch(err){
    console.log("DB connection failed:", err);
    throw err;
  }

  // Attach DB connection to req
  app.use((req, res, next) => {
    req.db = dbConnection;
    next();
  });

  // Register module routes
  app.use('/api/users', userRoutes);
  app.use('/api/branches', branchRoutes);

  // Error handling
  app.use(errorHandler);

  return app;
}

module.exports = createApp;