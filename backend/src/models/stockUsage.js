const mongoose = require('mongoose');

const stockUsageSchema = new mongoose.Schema({
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    },
    quantityUsed: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const StockUsage = mongoose.model('StockUsage', stockUsageSchema);
module.exports = StockUsage;
