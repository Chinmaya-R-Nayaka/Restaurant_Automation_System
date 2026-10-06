const express = require('express');
require('dotenv').config();

const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const menuRouter = require('./routes/menu');
const orderRouter = require('./routes/order');
const inventoryRouter = require('./routes/inventory');
const purchaseOrderRouter = require('./routes/purchaseOrder');

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
app.use('/api/v1/menu-items', menuRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/ingredients', inventoryRouter);
app.use('/api/v1/purchase-orders', purchaseOrderRouter);

// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//       success: false,
//       message: 'Something went wrong!'
//     });
// });

if(process.env.NODE_ENV !== 'test'){
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
