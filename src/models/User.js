const mongoose = require('mongoose');

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