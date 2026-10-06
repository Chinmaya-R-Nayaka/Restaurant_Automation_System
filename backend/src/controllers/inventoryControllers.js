const Ingredient = require('../models/ingredient');
const StockUsage = require('../models/stockUsage');


// To GET all ingredients
const getIngredients = async (req, res) => {
    try{
        const ingredients = await Ingredient.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: ingredients.length,
            ingredients
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching ingredients',
            error: error.message
        });
    }
};


// To CREATE an ingredient
const createIngredient = async (req, res) => {
    try{
        const { ingredientName, unit, currentStock, threshold } = req.body;

        const existingIngredient = await Ingredient.findOne({ ingredientName });
        if(existingIngredient){
            return res.status(400).json({
                success: false,
                message: 'Ingredient already exists'
            });
        }

        const ingredient = await Ingredient.create({
            ingredientName, unit, currentStock, threshold });

        res.status(201).json({
            success: true,
            message: 'Ingredient created successfully',
            ingredient
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error creating ingredient',
            error: error.message
        });
    }
};


// To UPDATE an ingredient
const updateIngredient = async (req, res) => {
    try{
        const { id } = req.params;

        const ingredient = await Ingredient.findById(id);
        if(!ingredient){
            return res.status(404).json({
                success: false,
                message: 'Ingredient not found'
            });
        }

        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            id, req.body, { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Ingredient updated successfully',
            ingredient: updatedIngredient
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error updating ingredient',
            error: error.message
        });
    }
};


// To RECORD stock usage
const recordStockUsage = async (req, res) => {
    try{
        const { ingredientId, quantityUsed } = req.body;

        const ingredient = await Ingredient.findById(ingredientId);
        if(!ingredient){
            return res.status(404).json({
                success: false,
                message: 'Ingredient not found'
            });
        }

        if(quantityUsed > ingredient.currentStock){
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        const stockUsage = await StockUsage.create({
            ingredient: ingredientId, quantityUsed });

        ingredient.currentStock -= quantityUsed;
        await ingredient.save();
        res.status(201).json({
            success: true,
            message: 'Stock usage recorded successfully',
            stockUsage,
            ingredient
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error recording stock usage',
            error: error.message
        });
    }
};


// To CHECK ingredient threshold
const getIngredientThreshold = async (req, res) => {
    try{
        const { id } = req.params;

        const ingredient = await Ingredient.findById(id);
        if(!ingredient){
            return res.status(404).json({
                success: false,
                message: 'Ingredient not found'
            });
        }

        const lowStock = ingredient.currentStock < ingredient.threshold;
        res.status(200).json({
            success: true,
            ingredient,
            lowStock
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error checking ingredient threshold',
            error: error.message
        });
    }
};


// To GET low stock ingredients
const getLowStockIngredients = async (req, res) => {
    try{
        const ingredients = await Ingredient.find({
            $expr: { $lt: ['$currentStock', '$threshold'] }
        }).sort({ currentStock: 1 });

        res.status(200).json({
            success: true,
            count: ingredients.length,
            ingredients
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching low stock ingredients',
            error: error.message
        });
    }
};


module.exports = { getIngredients, createIngredient, updateIngredient, 
    recordStockUsage, getIngredientThreshold, getLowStockIngredients };