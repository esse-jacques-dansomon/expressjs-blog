const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
    info: {
        title: 'Blog API',
        description: 'API for a blog application',
        version: '1.0.0',
        contact: {
            name: 'Esse Jacques',
            email: 'essedansomon@gmail.com'
        },
        servers: ['http://localhost:3000']
    },
    basePath: '/',
    host: 'localhost:3000/api/v1',
    tags : [
        {
            name: 'auth',
            description: 'API for authentication in the system'
        },
        {
            name: 'users',
            description: 'API for users in the system',
        },
        {
            name: 'articles',
            description: 'API for articles in the system'
        },
        {
            name: 'categories',
            description: 'API for categories in the system'
        },
        {
            name: 'comments',
            description: 'API for comments in the system'
        }
    ],
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        },
    },
    security: [
        {
            Bearer: []
        }
    ],

    definitions: {
        User: {
            fistName: 'string',
            name: 'string',
            email: 'string',
            image: 'string',
            password: 'string',
            active: 'boolean',
            isBlocked: 'boolean',
            role: 'string',
            numberArticles: 'number',
            followers: 'array',
            following: 'array',
            articles: 'array',
        },
        Article: {
            titre: 'string',
            description: 'string',
            category: 'string',
            interactions: 'array',
            likes: 'array',
            dislikes: 'array',
            user: 'string',
            image: 'string',
        },
        Category: {
            title: 'string',
            user: 'string'
        },
        Comment: {
            content: 'string',
            user: 'string',
            article: 'string',
        },
        Error : {
            success: 'boolean',
            status: 'number',
            message: 'string',
            stack: 'any',

        }
    },



};

const outputFile = './swagger-output.json';
const routes = ["./app.js"]

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);

// Path: swagger.auto-gen.js

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('../app.js')
})








