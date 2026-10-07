const Joi = require('joi');

const createInvoiceSchema = Joi.object({
    purchaseOrderId: Joi.string().trim().required(),
    invoiceAmount: Joi.number().positive().required()
});

module.exports = { createInvoiceSchema };