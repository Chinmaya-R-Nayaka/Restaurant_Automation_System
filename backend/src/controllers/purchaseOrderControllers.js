const PurchaseOrder = require('../models/purchaseOrder');
const Ingredient = require('../models/ingredient');


// To GET all purchase orders
const getPurchaseOrders = async (req, res) => {
    try{
        const purchaseOrders = await PurchaseOrder.find().populate('ingredient').sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: purchaseOrders.length,
            purchaseOrders
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching purchase orders',
            error: error.message
        });
    }
};


// To CREATE a purchase order
const createPurchaseOrder = async (req, res) => {
    try{
        const { ingredientId, quantity } = req.body;

        const ingredient = await Ingredient.findById(ingredientId);
        if(!ingredient){
            return res.status(404).json({
                success: false,
                message: 'Ingredient not found'
            });
        }

        if(ingredient.currentStock >= ingredient.threshold){
            return res.status(400).json({
                success: false,
                message: 'Purchase order is not required for this ingredient'
            });
        }

        const purchaseOrderId = `PO-${Date.now()}`;
        const purchaseOrder = await PurchaseOrder.create({
            purchaseOrderId,
            ingredient: ingredientId,
            quantity
        });

        const populatedPurchaseOrder = await PurchaseOrder.findById( purchaseOrder._id ).populate('ingredient');
        res.status(201).json({
            success: true,
            message: 'Purchase order created successfully',
            purchaseOrder: populatedPurchaseOrder
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error creating purchase order',
            error: error.message
        });
    }
};


// To GET a single purchase order
const getPurchaseOrder = async (req, res) => {
    try{
        const { id } = req.params;

        const purchaseOrder = await PurchaseOrder.findById(id).populate('ingredient');
        if(!purchaseOrder){
            return res.status(404).json({
                success: false,
                message: 'Purchase order not found'
            });
        }

        res.status(200).json({
            success: true, purchaseOrder
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching purchase order',
            error: error.message
        });
    }
};


// To UPDATE purchase order status
const updatePurchaseOrderStatus = async (req, res) => {
    try{
        const { id } = req.params;
        const { status } = req.body;

        const purchaseOrder = await PurchaseOrder.findById(id);
        if(!purchaseOrder){
            return res.status(404).json({
                success: false,
                message: 'Purchase order not found'
            });
        }

        purchaseOrder.status = status;
        await purchaseOrder.save();
        res.status(200).json({
            success: true,
            message: 'Purchase order status updated successfully',
            purchaseOrder
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error updating purchase order status',
            error: error.message
        });
    }
};


module.exports = { getPurchaseOrders, createPurchaseOrder,
    getPurchaseOrder, updatePurchaseOrderStatus };