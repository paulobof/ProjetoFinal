// src/db/dbConfig.js
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados');
    createDatabase();
    useDatabase();
    createUsersTable();
    createProductsTable();
  }
});

const createDatabase = () => {
  const createDBDatabase = `
    CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};
  `;
  db.query(createDBDatabase, (err) => {
    if (err) {
      console.error(`Erro ao criar database ${process.env.DB_NAME}:`, err);
    } else {
      console.log(`Database ${process.env.DB_NAME} criada ou já existe`);
    }
  });
};

const useDatabase = () => {
  const useDBDatabase = `
    USE ${process.env.DB_NAME};
  `;
  db.query(useDBDatabase, (err) => {
    if (err) {
      console.error(`Erro ao usar database ${process.env.DB_NAME}:`, err);
    } else {
      console.log(`Database ${process.env.DB_NAME} selecionada`);
    }
  });
};

const createProductsTable = () => {
  const createDBProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255),
      model VARCHAR(255),
      description VARCHAR(255),
      picture VARCHAR(255)
    );
  `;
  db.query(createDBProductsTable, (err) => {
    if (err) {
      console.error('Erro ao criar tabela products:', err);
    } else {
      console.log('Tabela products criada ou já existe');
    }
  });
};

const createUsersTable = () => {
  const createBDUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );
  `;
  
  db.query(createBDUsersTable, (err) => {
    if (err) {
      console.error('Erro ao criar tabela users:', err);
    } else {
      console.log('Tabela users criada ou já existe');
    }
  });
};

module.exports = db;
