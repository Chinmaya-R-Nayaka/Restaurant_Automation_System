const SupplierInvoice = require('../models/supplierInvoice');
const PurchaseOrder = require('../models/purchaseOrder');


// To CREATE an invoice
const createInvoice = async (req, res) => {
    try{
        const { purchaseOrderId, invoiceAmount } = req.body;

        const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);
        if(!purchaseOrder){
            return res.status(404).json({
                success: false,
                message: 'Purchase order not found'
            });
        }

        const invoiceId = `INV-${Date.now()}`;
        const invoice = await SupplierInvoice.create({
            invoiceId,
            purchaseOrder: purchaseOrderId,
            invoiceAmount
        });

        const populatedInvoice = await SupplierInvoice.findById(invoice._id).populate('purchaseOrder');
        res.status(201).json({
            success: true,
            message: 'Invoice created successfully',
            invoice: populatedInvoice
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error creating invoice',
            error: error.message
        });
    }
};


// To GET all invoices
const getInvoices = async (req, res) => {
    try{
        const invoices = await SupplierInvoice.find()
            .populate('purchaseOrder')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: invoices.length,
            invoices
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching invoices',
            error: error.message
        });
    }
};


// To GET a single invoice
const getInvoice = async (req, res) => {
    try{
        const { id } = req.params;

        const invoice = await SupplierInvoice.findById(id).populate('purchaseOrder');
        if(!invoice){
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        res.status(200).json({
            success: true,
            invoice
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching invoice',
            error: error.message
        });
    }
};


// To PAY an invoice
const payInvoice = async (req, res) => {
    try{
        const { id } = req.params;

        const invoice = await SupplierInvoice.findById(id)
            .populate({
                path: 'purchaseOrder',
                populate: { path: 'ingredient' }
            });

        if(!invoice){
            return res.status(404).json({
                success: false,
                message: 'Invoice not found'
            });
        }

        if(invoice.paymentStatus === 'Paid'){
            return res.status(400).json({
                success: false,
                message: 'Invoice has already been paid'
            });
        }

        invoice.paymentStatus = 'Paid';
        await invoice.save();
        res.status(200).json({
            success: true,
            message: 'Invoice payment processed successfully',
            invoice
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error processing invoice payment',
            error: error.message
        });
    }
};

module.exports = { createInvoice, getInvoices, getInvoice, payInvoice };