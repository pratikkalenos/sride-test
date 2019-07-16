//Require modules
const express = require('express');
const http    = require('http');
const routes  = require('./src/routes/routes');

//Init mongo connection pool
let dbUtil = require('./src/utils/mongo-connection');
dbUtil.initDB();

//Create express server
const app = express();
let port = 8000;

//Define route
app.use('/api/v1', routes);

//Listen on port
const server = http.createServer(app).listen(port, () => {
  console.log('HTTP/Express server listening on port ' + port + '.');
});