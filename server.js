const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conectar MongoDB
mongoose.connect('mongodb://localhost:27017/eventhub')
    .then(() => console.log('✅ Conectado ao MongoDB'))
    .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

// Schema do Evento
const eventoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descricao: { type: String, required: true },
    data: { type: String, required: true },
    local: { type: String, required: true },
    participantes: { type: Number, default: 0 },
    listaParticipantes: [{ type: String }]
});

const Evento = mongoose.model('Evento', eventoSchema);

// ============ ROTAS DA API ============

// Listar todos os eventos
app.get('/api/events', async (req, res) => {
    try {
        const eventos = await Evento.find().sort({ data: 1 });
        res.json(eventos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Criar evento
app.post('/api/events', async (req, res) => {
    try {
        const evento = new Evento(req.body);
        await evento.save();
        res.json({ mensagem: 'Evento criado com sucesso!', evento });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Buscar evento por ID
app.get('/api/events/:id', async (req, res) => {
    try {
        const evento = await Evento.findById(req.params.id);
        if (!evento) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }
        res.json(evento);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Editar evento
app.put('/api/events/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!evento) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }
        res.json({ mensagem: 'Evento atualizado com sucesso!', evento });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Excluir evento
app.delete('/api/events/:id', async (req, res) => {
    try {
        const evento = await Evento.findByIdAndDelete(req.params.id);
        if (!evento) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }
        res.json({ mensagem: 'Evento excluído com sucesso!' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Participar do evento
app.post('/api/events/:id/participar', async (req, res) => {
    try {
        const { nomeParticipante } = req.body;
        
        if (!nomeParticipante || nomeParticipante.trim() === '') {
            return res.status(400).json({ erro: 'Nome do participante é obrigatório' });
        }
        
        const evento = await Evento.findById(req.params.id);
        
        if (!evento) {
            return res.status(404).json({ erro: 'Evento não encontrado' });
        }
        
        if (!evento.listaParticipantes) {
            evento.listaParticipantes = [];
        }
        
        if (evento.listaParticipantes.includes(nomeParticipante)) {
            return res.status(400).json({ erro: 'Este participante já está inscrito!' });
        }
        
        evento.listaParticipantes.push(nomeParticipante);
        evento.participantes = evento.listaParticipantes.length;
        
        await evento.save();
        
        res.json({ 
            mensagem: `${nomeParticipante} participou do evento!`,
            evento 
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// ============ ROTAS DAS PÁGINAS ============

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/eventos.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'eventos.html'));
});

app.get('/participantes.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'participantes.html'));
});

app.get('/contato.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contato.html'));
});

// ============ INICIAR SERVIDOR ============
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});