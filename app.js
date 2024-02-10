const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const env = require('dotenv').config();
const connectDB = require("./config/dbConnect");
const PORT = process.env.PORT || 3000;
const API_PREFIX = process.env.API_PREFIX || '/api/v1';
const swagger = require('./config/swagger');
const app = express();

app.use(logger('dev'));
app.use(express.json());


//ROUTES
app.use(`${API_PREFIX}/users`, require('./routes/users'));
app.use(`${API_PREFIX}/articles`, require('./routes/articles'));
app.use(`${API_PREFIX}/categories`, require('./routes/categories'));
app.use(`${API_PREFIX}/comments`, require('./routes/comments'));

swagger(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
