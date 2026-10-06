const express = require('express');
const { getPurchaseOrders, createPurchaseOrder, updatePurchaseOrderStatus, getPurchaseOrder } = require('../controllers/purchaseOrderControllers');
const { createPurchaseOrderSchema, updatePurchaseOrderStatusSchema } = require('../validators/purchaseOrderValidator');
const protect = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');

const purchaseOrderRouter = express.Router();

purchaseOrderRouter.get('/', protect, getPurchaseOrders);
purchaseOrderRouter.post('/', protect, validate(createPurchaseOrderSchema), createPurchaseOrder);
purchaseOrderRouter.get('/:id', protect, getPurchaseOrder);
purchaseOrderRouter.patch('/:id/status', protect, validate(updatePurchaseOrderStatusSchema), updatePurchaseOrderStatus);

module.exports = purchaseOrderRouter;