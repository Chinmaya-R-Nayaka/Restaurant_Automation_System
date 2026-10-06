const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    purchaseOrderId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    ingredient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ingredient',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Received', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);
module.exports = PurchaseOrder;
