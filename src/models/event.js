const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },

    descricao: {
        type: String,
        required: true
    },

    data: {
        type: String,
        required: true
    },

    local: {
        type: String,
        required: true
    },

    participantes: {
        type: Number,
        default: 0
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);