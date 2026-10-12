const Order = require('../models/order');
const SupplierInvoice = require('../models/supplierInvoice');


// To GET sales report
const getSalesReport = async (req, res) => {
    try{
        const orders = await Order.find().sort({ orderDate: -1 });
        const totalSales = orders.reduce(
            (total, order) => {return total + Number(order.totalAmount.toString())}, 0
        );

        res.status(200).json({
            success: true,
            totalSales,
            orderCount: orders.length,
            orders
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error generating sales report',
            error: error.message
        });
    }
};


// To GET monthly sales report
const getMonthlySalesReport = async (req, res) => {
    try{
        const sales = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$orderDate' },
                        month: { $month: '$orderDate' }
                    },
                    totalSales: {
                        $sum: '$totalAmount'
                    },
                    orderCount: {
                        $sum: 1
                    }
                }
            },
            {$sort: { '_id.year': -1, '_id.month': -1 }}
        ]);

        res.status(200).json({
            success: true,
            sales
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error generating monthly sales report',
            error: error.message
        });
    }
};


// To GET monthly expense report
const getMonthlyExpenseReport = async (req, res) => {
    try{
        const expenses = await SupplierInvoice.aggregate([
            {$match: {
                    paymentStatus: 'Paid'
                }
            },
            {$group: {
                    _id: {
                        year: { $year: '$invoiceDate' },
                        month: { $month: '$invoiceDate' }
                    },
                    totalExpenses: {
                        $sum: '$invoiceAmount'
                    },
                    invoiceCount: {
                        $sum: 1
                    }
                }
            }, {$sort: { '_id.year': -1, '_id.month': -1 }}
        ]);

        res.status(200).json({
            success: true,
            expenses
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error generating monthly expense report',
            error: error.message
        });
    }
};


module.exports = { getSalesReport, getMonthlySalesReport, getMonthlyExpenseReport };