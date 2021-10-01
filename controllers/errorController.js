const AppError = require("./../utils/appError");

const handleCastErrorDB = (err) => {
  console.log('in handleCastErrorDb')
  // to handle error from mongoose
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  console.log('in duplicatefielddb err  --->',err)
  const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  console.log('avant value')
  console.log('value',value);
  const message = `Duplicate field value ${value}. Please use another value`
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  console.log('in error validation db', err)
  const errors = Object.values(err.errors).map(el => el.message);
  const message =`Invalid input data. ${errors.join(". ").replace("path", "")}`
  return new AppError(message, 400)
};

const handleJwtError = () =>
  new AppError( 'Invalid token. Please log again', 401)

const handleTokenExpiredErrorDB = () =>
  new AppError('Token expired. Please log again', 401)

const sendErrorDev = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, req, res) => {
   console.log("in sendErrorProd err ==", err);

  if (err.isOperational) {
    console.log('err.message in isOperationnal', err.message)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
    // programing or unknown error
  } else {
    // let's console.log this
    console.error('ERROR... ', err);
    // generic message to the client
    res.status(500).json({
      status: 'error',
      message: 'something went wrong'
      // message: err.message
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log('err.stack err.name',err.name);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err,res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonwebTokenError') error = handleJwtError();
    if (error.name === 'TokenExpiredError') error = handleTokenExpiredErrorDB();

    sendErrorProd(error, req, res);
  }
};
