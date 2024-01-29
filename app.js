const express = require('express');
const createError = require('http-errors');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const authController = require('./src/controllers/authController');
const userController = require('./src/controllers/userController');
const { authenticateToken } = require('./src/middlewares/authMiddleware');
require('dotenv').config();

const app = express();

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, './src/public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// app.use(express.static(path.join(__dirname, './src/public')));
app.use(authenticateToken);

app.use('/', authController);
app.use('/user', userController);

app.use(function(req, res, next) {
    next(createError(404));
});
  
// error handler
app.use(function(err, req, res, next) {    
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    res.status(err.status || 500);
    res.render('error');
});  

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});
  
module.exports = app;
