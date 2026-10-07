const express = require('express');
const invoiceRouter = express.Router();

const { createInvoice, getInvoices, getInvoice, payInvoice } = require('../controllers/invoiceControllers');
const { createInvoiceSchema } = require('../validators/invoiceValidator');
const { validate } = require('../validators/authValidator');
const protect = require('../middleware/authMiddleware');

invoiceRouter.use(protect);
invoiceRouter.post('/', validate(createInvoiceSchema), createInvoice);
invoiceRouter.get('/', getInvoices);
invoiceRouter.get('/:id', getInvoice);
invoiceRouter.post('/:id/pay', payInvoice);

module.exports = invoiceRouter;