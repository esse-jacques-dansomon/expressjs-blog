const createError = require('http-errors');
const express = require('express');
const swaggerApi = require('./docs/swagger-api');
const logger = require('morgan');
const env = require('dotenv').config();
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';

const app = express();

app.use(logger('dev'));
app.use(express.json());


//ROUTES
app.use(`${API_PREFIX}/users`, require('./modules/users/userRoutes'),
    /*
    #swagger.tags = ['users']
    */
);
app.use(`${API_PREFIX}/articles`, require('./modules/articles/articleRoutes'),
    /*
#swagger.tags = ['articles']
*/
);
app.use(`${API_PREFIX}/categories`, require('./modules/categories/categoryRoutes'),
    /*
#swagger.tags = ['categories']

*/
    );
app.use(`${API_PREFIX}/comments`, require('./modules/comments/commentRoutes'),
    /*
#swagger.tags = ['comments']

*/
    );

swaggerApi(app)

app.use(function (req, res, next) {
    next(createError(404));
});


app.listen(PORT, () => {
    console.log(`Server is running on port http//:localhost:${PORT}`);
});

module.exports = app;
