const Joi = require('joi');

const createMenuSchema = Joi.object({
    itemCode: Joi.string().trim().required().messages({
        'string.empty': 'Item code cannot be empty',
        'any.required': 'Item code is required'
    }),
    itemName: Joi.string().trim().min(2).max(100).required().messages({
        'string.empty': 'Item name cannot be empty',
        'string.min': 'Item name should have a minimum length of 2',
        'string.max': 'Item name should not exceed 100 characters',
        'any.required': 'Item name is required'
    }),
    category: Joi.string().trim().required().messages({
        'string.empty': 'Category cannot be empty',
        'any.required': 'Category is required'
    }),
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be greater than 0',
        'any.required': 'Price is required'
    }),
    isAvailable: Joi.boolean().default(true)
});

const updateMenuSchema = Joi.object({
    itemCode: Joi.string().trim().messages({
        'string.empty': 'Item code cannot be empty'
    }),
    itemName: Joi.string().trim().min(2).max(100).messages({
        'string.empty': 'Item name cannot be empty',
        'string.min': 'Item name should have a minimum length of 2',
        'string.max': 'Item name should not exceed 100 characters'
    }),
    category: Joi.string().trim().messages({
        'string.empty': 'Category cannot be empty'
    }),
    price: Joi.number().positive().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be greater than 0'
    }),
    isAvailable: Joi.boolean()
}).min(1);

const updatePriceSchema = Joi.object({
    price: Joi.number().positive().required().messages({
        'number.base': 'Price must be a number',
        'number.positive': 'Price must be greater than 0',
        'any.required': 'Price is required'
    })
});

module.exports = { createMenuSchema, updateMenuSchema, updatePriceSchema };