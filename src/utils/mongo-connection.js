const mongoose = require('mongoose');

let dbconnection = null;
const config = require('../config/config-dev');

mongoose.initDB = () => {
  const dbUri = 'mongodb://' +config.mongo.host +':'+config.mongo.port+ '/' + config.mongo.database;
  dbconnection = mongoose.connect(dbUri, { useNewUrlParser: true });
  // CONNECTION EVENTS
  // When successfully connected
  mongoose.connection.on('connected', () => {
      if (!dbconnection) {
          dbconnection = mongoose.createConnection(dbURI);
      }
      console.log('Database -> Pool created for MongoDB host: ' + config.mongo.host);
  });

  // If the connection throws an error
  mongoose.connection.on('error', err => {
    console.log('Database -> connection error: ' + err);
    dbconnection = null;
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', () => {
    mongoose.connection.close();
    console.log('Database -> connection disconnected');
    dbconnection = null;
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Database -> Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });
};

mongoose.getDbConnection = () => {
return dbconnection;
};

// exports section
module.exports = mongoose;