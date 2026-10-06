const Joi = require('joi');

const createIngredientSchema = Joi.object({
    ingredientName: Joi.string().trim().required(),
    unit: Joi.string().trim().required(),
    currentStock: Joi.number().min(0).required(),
    threshold: Joi.number().min(0).required()
});

const updateIngredientSchema = Joi.object({
    ingredientName: Joi.string().trim(),
    unit: Joi.string().trim(),
    currentStock: Joi.number().min(0),
    threshold: Joi.number().min(0)
}).min(1);

const stockUsageSchema = Joi.object({
    ingredientId: Joi.string().trim().required(),
    quantityUsed: Joi.number().positive().required()
});

module.exports = {
    createIngredientSchema,
    updateIngredientSchema,
    stockUsageSchema
};