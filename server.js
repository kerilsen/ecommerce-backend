const express = require('express');
// import sequelize connection
const { sequelize } = require('./config/connection');
const routes = require('./routes');

// Sync sequelize models to the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');
    // then turn on the server
    startServer();
    console.log('Server successfully started');
  } catch (error) {
    console.error('Error syncing database: ', error);
  }
};

const startServer = () => {
  const app = express();
  app.use('/', routes);
  app.use(express.json());
  // logger middleware
  app.use((req, res, next) => {
    req.time = new Date(Date.now()).toString();
    console.log(req.method, req.hostname, req.path, req.time);
    next();
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

syncDatabase();