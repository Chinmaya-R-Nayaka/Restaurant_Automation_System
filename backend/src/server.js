const express = require('express');
require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');

const app = express();
const port = process.env.PORT || 3000;

// DB connection
if(process.env.NODE_ENV !== 'test'){
  connectDB();
}

// Middleware
app.use(cors({
    origin: process.env.Frontend_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);


if(process.env.NODE_ENV !== 'test'){
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
