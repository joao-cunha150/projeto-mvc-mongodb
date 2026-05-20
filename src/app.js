const express = require('express');

const cors = require('cors');

const path = require('path');

const logger = require('./middlewares/logger');

const eventRoutes = require('./routes/eventRoutes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'views', 'index.html'));

});

app.use('/api', eventRoutes);

module.exports = app;