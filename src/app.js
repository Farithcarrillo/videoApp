const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const videos = require('./modules/videos/routes');
const users = require('./modules/users/routes');
const authentication = require('./modules/authentication/routes');
const error = require('./network/errors');
const app = express();
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//configuracion
app.set('port', config.app.port);

//rutas
app.use('/api/videos', videos);
app.use('/api/users', users);
app.use('/api/authentication', authentication);
app.use(error);

module.exports = app;