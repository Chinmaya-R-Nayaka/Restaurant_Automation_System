const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const MenuItem = require('../models/menuItem');

const createOrder = async (req, res) => {
    try{
        const { items, paymentMode } = req.body;
        const orderId = `ORD-${Date.now()}`;
        const order = await Order.create({ orderId, paymentMode, totalAmount: 0 });

        let totalAmount = 0;
        for(const item of items){
            const menuItem = await MenuItem.findOne({ itemCode: item.itemCode });
            if(!menuItem){
                await Order.findByIdAndDelete(order._id);
                return res.status(404).json({
                    success: false, message: `Menu item ${item.itemCode} not found`
                });
            }

            if(!menuItem.isAvailable){
                await Order.findByIdAndDelete(order._id);
                return res.status(400).json({
                    success: false, message: `${menuItem.itemName} is currently unavailable`
                });
            }

            const unitPrice = Number(menuItem.price.toString());
            const amount = unitPrice * item.quantity;
            totalAmount += amount;

            await OrderItem.create({
                order: order._id,
                menuItem: menuItem._id,
                quantity: item.quantity,
                unitPrice: menuItem.price,
                amount
            });
        }

        order.totalAmount = totalAmount;
        await order.save();
        const orderItems = await OrderItem.find({ order: order._id }).populate('menuItem');

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order,
            orderItems
        });
    } 
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};


// To GET a single order
const getOrder = async (req, res) => {
    try{
        const { id } = req.params;

        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success: false, message: 'Order not found'
            });
        }

        const orderItems = await OrderItem.find({ order: order._id })
            .populate('menuItem');

        res.status(200).json({
            success: true,
            order,
            orderItems
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        });
    }
};


// To GET all orders
const getOrders = async (req, res) => {
    try{
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};


// To GENERATE bill for an order
const generateBill = async (req, res) => {
    try{
        const { id } = req.params;

        const order = await Order.findById(id);
        if(!order){
            return res.status(404).json({
                success: false, message: 'Order not found'
            });
        }

        const orderItems = await OrderItem.find({ order: order._id }).populate('menuItem');
        if(orderItems.length === 0){
            return res.status(400).json({
                success: false, message: 'Cannot generate bill for an empty order'
            });
        }

        let totalAmount = 0;
        orderItems.forEach((item) => {
            totalAmount += Number(item.amount.toString());
        });
        order.totalAmount = totalAmount;
        await order.save();

        const bill = {
            orderId: order.orderId,
            orderDate: order.orderDate,
            items: orderItems,
            totalAmount: order.totalAmount,
            paymentMode: order.paymentMode
        };

        res.status(200).json({
            success: true,
            message: 'Bill generated successfully',
            bill
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error generating bill',
            error: error.message
        });
    }
};


module.exports = { createOrder, getOrder, getOrders, generateBill };