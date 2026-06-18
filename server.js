const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// ================= MIDDLEWARES =================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// SERVIR CSS / JS / IMAGENS
app.use(
    express.static(
        path.join(__dirname, 'src', 'public')
    )
);

app.use(
    session({
        secret: 'segredo123',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60
        }
    })
);

// ================= AUTENTICAÇÃO =================

function auth(req, res, next) {
    next();
}

// ================= MONGODB =================

mongoose
.connect('mongodb://localhost:27017/eventhub')
.then(() => console.log('✅ MongoDB conectado'))
.catch(err => console.log(err));

// ================= MODEL =================

const Evento = mongoose.model(
    'Evento',
    new mongoose.Schema({

        titulo: String,
        descricao: String,
        data: String,
        local: String,

        participantes: {
            type: Number,
            default: 0
        },

        listaParticipantes: [String]

    })
);

// ================= LOGIN =================

app.get('/login', (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'src',
            'views',
            'login.html'
        )
    );

});

app.post('/login', async (req, res) => {

    const { email, senha } = req.body;

    try {

        const usuario =
            await mongoose.connection
            .collection('users')
            .findOne({ email });

        if (!usuario) {
            return res.send('Usuário não encontrado');
        }

        if (usuario.senha !== senha) {
            return res.send('Senha incorreta');
        }

        req.session.user = {

            id: usuario._id,
            email: usuario.email

        };

        res.redirect('/');

    } catch {

        res.send('Erro no login');

    }

});

app.get('/logout', (req, res) => {

    req.session.destroy(() => {

        res.clearCookie('connect.sid');

        res.redirect('/login');

    });

});

// ================= API =================

app.get('/api/events', auth, async (req, res) => {

    res.json(
        await Evento.find()
    );

});

app.post('/api/events', auth, async (req, res) => {

    const evento =
        new Evento(req.body);

    await evento.save();

    res.json(evento);

});

app.put('/api/events/:id', auth, async (req, res) => {

    const evento =
        await Evento.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

    res.json(evento);

});

app.delete('/api/events/:id', auth, async (req, res) => {

    await Evento.findByIdAndDelete(
        req.params.id
    );

    res.json({
        mensagem: 'Evento excluído'
    });

});

app.post(
'/api/events/:id/participar',
auth,
async (req, res) => {

    const evento =
        await Evento.findById(
            req.params.id
        );

    evento.listaParticipantes.push(
        req.body.nomeParticipante
    );

    evento.participantes =
        evento.listaParticipantes.length;

    await evento.save();

    res.json(evento);

});

// ================= PÁGINAS =================

app.get('/', auth, (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'src',
            'views',
            'index.html'
        )
    );

});

app.get('/eventos.html', auth, (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'src',
            'views',
            'eventos.html'
        )
    );

});

app.get('/participantes.html', auth, (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'src',
            'views',
            'participantes.html'
        )
    );

});

app.get('/contato.html', auth, (req, res) => {

    res.sendFile(
        path.join(
            __dirname,
            'src',
            'views',
            'contato.html'
        )
    );

});

// ================= SERVIDOR =================

app.listen(PORT, () => {

    console.log(
        `🚀 Rodando em http://localhost:${PORT}`
    );

});