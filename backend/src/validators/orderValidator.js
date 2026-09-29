const Joi = require('joi');

const createOrderSchema = Joi.object({
    items: Joi.array().items(
        Joi.object({
            itemCode: Joi.string().trim().required(),
            quantity: Joi.number().integer().min(1).required()
        })
    ).min(1).required(),

    paymentMode: Joi.string().trim().required()
});

module.exports = { createOrderSchema };