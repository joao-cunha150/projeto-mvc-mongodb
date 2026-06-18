const mongoose = require('mongoose');
/**
 * Model responsável pelo gerenciamento dos usuários.
 *
 * @typedef {Object} User
 * @property {string} nome Nome do usuário.
 * @property {string} email E-mail do usuário.
 * @property {string} senha Senha do usuário.
 */
const UserSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: [true, 'O nome é obrigatório']
    },

    email: {
        type: String,
        required: [true, 'O email é obrigatório'],
        unique: true
    },

    senha: {
        type: String,
        required: [true, 'A senha é obrigatória']
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);