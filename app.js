const express = require('express');
const path = require('path');

const db = require('./src/db/dbConfig');

const createError = require('http-errors');
const logger = require('morgan');

const authController = require('./src/controllers/authController');
const userController = require('./src/controllers/userController');
const productController = require('./src/controllers/productController');

const cookieParser = require('cookie-parser');

const authenticateToken  = require('./src/middlewares/authMiddleware.js');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

// Log para verificar se o arquivo é carregado corretamente
console.log('Starting the application...');

// Middleware para cookies
app.use(cookieParser());
console.log('Middleware cookieParser applied.');

// Configurações do aplicativo
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, './src/public')));
console.log('Static files and views configured.');

// Logger para desenvolvimento
app.use(logger('dev'));
console.log('Logger configured.');

// Parser para JSON e formulários
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
console.log('Body parsers configured.');


// Middleware de autenticação
app.use(authenticateToken);
console.log('Middleware authenticateToken applied.');

// Rotas
app.use('/', authController);
app.use('/user', userController);
app.use('/products', productController);
console.log('Routers configured.');

// Tratamento de erro para rota não encontrada
app.use(function(req, res, next) {
    next(createError(404));
});

// Tratamento de erro geral
app.use(function(err, req, res, next) {    
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    res.status(err.status || 500);
    res.render('error');
});  

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

console.log('Application started successfully.');
module.exports = app;
