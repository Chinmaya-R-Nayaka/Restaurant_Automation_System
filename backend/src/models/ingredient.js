const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        required: true,
        trim: true
    },
    currentStock: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    threshold: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
