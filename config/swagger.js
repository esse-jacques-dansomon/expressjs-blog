const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Name',
            version: '1.0.0',
            description: 'A short description of your API',
        },
        servers: [
            {
                url: 'http://localhost:3000/api/v1',
            },
        ],
    },

    apis: ['./routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/', swaggerUi.serve, swaggerUi.setup(specs));
};