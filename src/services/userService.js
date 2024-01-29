const User = require('../models/User');

async function insertUser(userModel) {
    // Lógica para inserir usuário no banco de dados
    // Exemplo fictício, substitua pelo seu código real
    console.log('User inserted:', userModel);
    return userModel;
}

module.exports = {
    insertUser
};