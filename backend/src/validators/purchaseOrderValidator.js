const Joi = require('joi');

const createPurchaseOrderSchema = Joi.object({
    ingredientId: Joi.string().trim().required(),
    quantity: Joi.number().positive().required()
});

const updatePurchaseOrderStatusSchema = Joi.object({
    status: Joi.string()
        .valid('Pending', 'Approved', 'Received', 'Cancelled')
        .required()
});

module.exports = { createPurchaseOrderSchema,updatePurchaseOrderStatusSchema };