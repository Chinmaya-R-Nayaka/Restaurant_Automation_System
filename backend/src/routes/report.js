const express = require('express');
const reportRouter = express.Router();
const { getSalesReport, getMonthlySalesReport, getMonthlyExpenseReport } = require('../controllers/reportControllers');
const protect = require('../middleware/authMiddleware');

reportRouter.use(protect);
reportRouter.get('/sales', getSalesReport);
reportRouter.get('/sales/monthly', getMonthlySalesReport);
reportRouter.get('/expenses/monthly', getMonthlyExpenseReport);

module.exports = reportRouter;