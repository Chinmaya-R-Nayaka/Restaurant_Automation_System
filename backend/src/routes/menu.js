const express = require('express');
const { getMenuItems, getMenuItem, createMenuItem,
    updateMenuItem, deleteMenuItem, updateMenuPrice } = require('../controllers/menuControllers');
const { createMenuSchema, updateMenuSchema, updatePriceSchema } = require('../validators/menuValidator');
const protect = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');
const authorize = require('../middleware/roleMiddleware');
const menuRouter = express.Router();


menuRouter.get('/', protect, getMenuItems);
menuRouter.get('/:id', protect, getMenuItem);
menuRouter.post('/', protect, authorize('manager'), validate(createMenuSchema), createMenuItem);
menuRouter.patch('/:id', protect, authorize('manager'), validate(updateMenuSchema), updateMenuItem);
menuRouter.delete('/:id', protect, authorize('manager'), deleteMenuItem);
menuRouter.patch('/:id/price', protect, authorize('manager'), validate(updatePriceSchema), updateMenuPrice);


module.exports = menuRouter;