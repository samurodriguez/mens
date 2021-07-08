'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const connectDB = require('./app/infrastructure/database');

const usersRouter = require('./app/routers/users-router');

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('uploads'));

connectDB();

app.use('/users', usersRouter);

const { SERVER_PORT } = process.env;

app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}`));
