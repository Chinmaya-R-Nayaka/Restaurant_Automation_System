const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    itemCode: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 0
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;