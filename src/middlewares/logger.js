const logger = (req, res, next) => {

    const data = new Date().toLocaleString('pt-BR');

    console.log(`
========================================
[${data}]
Método: ${req.method}
Rota: ${req.url}
========================================
`);

    next();

};

module.exports = logger;