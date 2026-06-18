const mongoose = require('mongoose');

/**
 * Model responsável pelo gerenciamento dos eventos.
 *
 * @typedef {Object} Event
 * @property {string} titulo Título do evento.
 * @property {string} descricao Descrição do evento.
 * @property {string} data Data do evento.
 * @property {string} local Local do evento.
 * @property {number} participantes Número de participantes.
 */
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