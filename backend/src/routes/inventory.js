const express = require('express');
const { getIngredients, createIngredient, updateIngredient,
    recordStockUsage, getIngredientThreshold, getLowStockIngredients } = require('../controllers/inventoryControllers');
const { createIngredientSchema, updateIngredientSchema, stockUsageSchema } = require('../validators/inventoryValidator');
const protect = require('../middleware/authMiddleware');
const { validate } = require('../validators/authValidator');
const inventoryRouter = express.Router();


inventoryRouter.get('/', protect, getIngredients);
inventoryRouter.get('/low-stock', protect, getLowStockIngredients);
inventoryRouter.post('/', protect, validate(createIngredientSchema), createIngredient);
inventoryRouter.patch('/:id', protect, validate(updateIngredientSchema), updateIngredient);
inventoryRouter.post('/stock-usage', protect, validate(stockUsageSchema), recordStockUsage);
inventoryRouter.get('/:id/threshold', protect, getIngredientThreshold);

module.exports = inventoryRouter;