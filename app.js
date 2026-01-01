const express = require('express');
const helmet = require('helmet');
// Removed incompatible 'express-mongo-sanitize'
// Removed incompatible 'xss-clean' 
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const productRouter = require('./routes/productRoutes');
const enquiryRouter = require('./routes/enquiryRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES

// Set security HTTP headers
app.use(helmet());

// Allow Cross-Origin requests
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Prevent parameter pollution
app.use(hpp());

// 2) ROUTES
app.use('/api/v1/products', productRouter);
app.use('/api/v1/enquiries', enquiryRouter);

// 3) HANDLE UNMATCHED ROUTES
app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4) GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;