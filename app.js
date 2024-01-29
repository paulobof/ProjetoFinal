const express = require('express');
const path = require('path');

const db = require('./src/db/dbConfig');

const createError = require('http-errors');
const logger = require('morgan');

const authController = require('./src/controllers/authController');
const userController = require('./src/controllers/userController');
const productController = require('./src/controllers/productController');

const cookieParser = require('cookie-parser');
const { authenticateToken } = require('./src/middlewares/authMiddleware');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(authenticateToken);
app.use(cookieParser());

app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, './src/public')));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authController);
app.use('/user', userController);
app.use('/products', productController);

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

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

module.exports = app;
