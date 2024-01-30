const User = require('../models/User');

async function insertUser(userModel) {
    // Lógica para inserir usuário no banco de dados
    console.log('User inserted:', userModel);
    return userModel;
}

async function getUserById(userId) {
    // Lógica para obter usuário pelo ID no banco de dados
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

async function updateUser(userId, updatedUserData) {
    // Lógica para atualizar usuário no banco de dados
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    // Atualize os campos necessários do usuário
    user.name = updatedUserData.name;
    user.email = updatedUserData.email;

    await user.save();
}

async function deleteUser(userId) {
    // Lógica para excluir usuário do banco de dados
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    await user.remove();
}

module.exports = {
    insertUser,
    getUserById,
    updateUser,
    deleteUser
};
