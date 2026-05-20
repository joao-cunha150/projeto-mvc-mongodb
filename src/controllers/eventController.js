const Event = require('../models/Event');

exports.createEvent = async (req, res) => {

    try {

        const {
            titulo,
            descricao,
            data,
            local,
            participantes
        } = req.body;

        if (!titulo || !descricao || !data || !local) {

            return res.status(400).json({
                success: false,
                mensagem: 'Todos os campos são obrigatórios'
            });

        }

        const novoEvento = await Event.create({
            titulo,
            descricao,
            data,
            local,
            participantes
        });

        return res.status(201).json({
            success: true,
            mensagem: 'Evento criado com sucesso',
            data: novoEvento
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};

exports.getEvents = async (req, res) => {

    try {

        const eventos = await Event.find();

        return res.status(200).json({
            success: true,
            total: eventos.length,
            data: eventos
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};

exports.getEventById = async (req, res) => {

    try {

        const { id } = req.params;

        const evento = await Event.findById(id);

        if (!evento) {

            return res.status(404).json({
                success: false,
                mensagem: 'Evento não encontrado'
            });

        }

        return res.status(200).json({
            success: true,
            data: evento
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};

exports.updateEvent = async (req, res) => {

    try {

        const { id } = req.params;

        const eventoAtualizado = await Event.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!eventoAtualizado) {

            return res.status(404).json({
                success: false,
                mensagem: 'Evento não encontrado'
            });

        }

        return res.status(200).json({
            success: true,
            mensagem: 'Evento atualizado com sucesso',
            data: eventoAtualizado
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};

exports.deleteEvent = async (req, res) => {

    try {

        const { id } = req.params;

        const eventoDeletado = await Event.findByIdAndDelete(id);

        if (!eventoDeletado) {

            return res.status(404).json({
                success: false,
                mensagem: 'Evento não encontrado'
            });

        }

        return res.status(200).json({
            success: true,
            mensagem: 'Evento deletado com sucesso'
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};  