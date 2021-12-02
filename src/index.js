const express = require('express');
const config = require('./config');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');
const morgan = require("morgan")
const httpStatus = require('http-status');
const globalErrorHandler = require('./middlewares/globalErrorHandler');
const ApiError = require('./helper/ApiError');
const { errorConverter, errorHandler } = require('./middlewares/error');
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routes);
app.use(globalErrorHandler);

app.listen(config.port, () => {
  console.log('App listening on port: ' + config.port);
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
