const User = require('../models/User');

exports.createUser = async (req, res) => {

    try {

        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {

            return res.status(400).json({
                success: false,
                mensagem: 'Todos os campos são obrigatórios'
            });

        }

        const usuarioExiste = await User.findOne({ email });

        if (usuarioExiste) {

            return res.status(400).json({
                success: false,
                mensagem: 'Usuário já cadastrado'
            });

        }

        const novoUsuario = await User.create({
            nome,
            email,
            senha
        });

        return res.status(201).json({
            success: true,
            mensagem: 'Usuário criado com sucesso',
            data: novoUsuario
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            mensagem: 'Erro interno do servidor',
            erro: error.message
        });

    }

};

exports.getUsers = async (req, res) => {

    try {

        const usuarios = await User.find();

        return res.status(200).json({
            success: true,
            total: usuarios.length,
            data: usuarios
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};

exports.getUserById = async (req, res) => {

    try {

        const { id } = req.params;

        const usuario = await User.findById(id);

        if (!usuario) {

            return res.status(404).json({
                success: false,
                mensagem: 'Usuário não encontrado'
            });

        }

        return res.status(200).json({
            success: true,
            data: usuario
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};

exports.updateUser = async (req, res) => {

    try {

        const { id } = req.params;

        const usuarioAtualizado = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!usuarioAtualizado) {

            return res.status(404).json({
                success: false,
                mensagem: 'Usuário não encontrado'
            });

        }

        return res.status(200).json({
            success: true,
            mensagem: 'Usuário atualizado com sucesso',
            data: usuarioAtualizado
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};

exports.deleteUser = async (req, res) => {

    try {

        const { id } = req.params;

        const usuarioDeletado = await User.findByIdAndDelete(id);

        if (!usuarioDeletado) {

            return res.status(404).json({
                success: false,
                mensagem: 'Usuário não encontrado'
            });

        }

        return res.status(200).json({
            success: true,
            mensagem: 'Usuário deletado com sucesso'
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            erro: error.message
        });

    }

};