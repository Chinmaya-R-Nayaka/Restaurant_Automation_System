const mongoose = require('mongoose');

const supplierInvoiceSchema = new mongoose.Schema({
    invoiceId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    purchaseOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PurchaseOrder',
        required: true
    },
    invoiceAmount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        min: 0
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    },
    invoiceDate: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { timestamps: true });

const SupplierInvoice = mongoose.model('SupplierInvoice', supplierInvoiceSchema);
module.exports = SupplierInvoice;
