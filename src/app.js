const express = require('express');
const http = require('http');
const morgan = require('morgan');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();
const { initializeSocket } = require('./socket/socket');
const server = http.createServer(app);

//init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//init db
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();

//init routes
app.use('', require('./routes'));

// init WebSocket
const io = initializeSocket(server);
app.set('socketio', io); 

module.exports = app;
