const User = require('../models/User');

async function insertUser(userModel) {
    
    console.log('User inserted:', userModel);
    return userModel;
}

module.exports = {
    insertUser
};