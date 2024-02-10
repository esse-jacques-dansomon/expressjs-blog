const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

module.exports = (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};