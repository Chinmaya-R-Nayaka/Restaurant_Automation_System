const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    orderDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    totalAmount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0
    },
    paymentMode: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });


const Order = mongoose.model('Order', orderSchema);
module.exports = Order;