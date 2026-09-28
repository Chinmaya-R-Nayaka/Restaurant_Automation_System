const express = require('express');
const { getMenuItems, getMenuItem, createMenuItem,
    updateMenuItem, deleteMenuItem, updateMenuPrice } = require('../controllers/menuControllers');
const { createMenuSchema, updateMenuSchema, updatePriceSchema } = require('../validators/menuValidator');
const protect = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');
const menuRouter = express.Router();


menuRouter.get('/', protect, getMenuItems);
menuRouter.get('/:id', protect, getMenuItem);
menuRouter.post('/', protect, validate(createMenuSchema), createMenuItem);
menuRouter.patch('/:id', protect, validate(updateMenuSchema), updateMenuItem);
menuRouter.delete('/:id', protect, deleteMenuItem);
menuRouter.patch('/:id/price', protect, validate(updatePriceSchema), updateMenuPrice);


module.exports = menuRouter;