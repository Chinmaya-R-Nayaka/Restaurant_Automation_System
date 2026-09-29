const express = require('express');
const { createOrder, getOrder, getOrders, generateBill } = require('../controllers/orderControllers');
const { createOrderSchema } = require('../validators/orderValidator');
const protect = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');
const orderRouter = express.Router();


orderRouter.post('/', protect, validate(createOrderSchema), createOrder);
orderRouter.get('/:id', protect, getOrder);
orderRouter.get('/', protect, getOrders);
orderRouter.post('/:id/bill', protect, generateBill);


module.exports = orderRouter;