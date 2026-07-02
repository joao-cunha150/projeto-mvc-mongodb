const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Loja",
      version: "2.0.0",
      description: "API da Loja"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./rotas/*.js"] // ajuste conforme a pasta das suas rotas
};

module.exports = swaggerJsdoc(options);