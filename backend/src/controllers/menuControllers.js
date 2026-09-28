const MenuItem = require('../models/menuItem');


// To GET all menu items
const getMenuItems = async (req, res) => {
    try{
        const menuItems = await MenuItem.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: menuItems.length,
            menuItems
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching menu items',
            error: error.message
        });
    }
};


// To GET a single menu item
const getMenuItem = async (req, res) => {
    try{
        const { id } = req.params;
        const menuItem = await MenuItem.findById(id);
        if(!menuItem){
            return res.status(404).json({
                success: false, message: 'Menu item not found'
            });
        }

        res.status(200).json({
            success: true,
            menuItem
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error fetching menu item',
            error: error.message
        });
    }
};


const createMenuItem = async (req, res) => {
    try{
        const { itemCode, itemName, category, price, isAvailable } = req.body;
        const existingItem = await MenuItem.findOne({ itemCode });
        if(existingItem){
            return res.status(400).json({
                success: false, message: 'Menu item with this item code already exists'
            });
        }

        const menuItem = await MenuItem.create({
            itemCode, itemName, category, price, isAvailable
        });

        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            menuItem
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error creating menu item',
            error: error.message
        });
    }
};


const updateMenuItem = async (req, res) => {
    try{
        const { id } = req.params;
        const menuItem = await MenuItem.findById(id);
        if(!menuItem){
            return res.status(404).json({
                success: false, message: 'Menu item not found'
            });
        }

        const updatedMenuItem = await MenuItem.findByIdAndUpdate(
            id, req.body, { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            menuItem: updatedMenuItem
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error updating menu item',
            error: error.message
        });
    }
};


const deleteMenuItem = async (req, res) => {
    try{
        const { id } = req.params;
        const menuItem = await MenuItem.findById(id);
        if(!menuItem){
            return res.status(404).json({
                success: false, message: 'Menu item not found'
            });
        }

        await MenuItem.findByIdAndDelete(id);
        res.status(200).json({ 
            success: true, message: 'Menu item deleted successfully' 
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error deleting menu item',
            error: error.message
        });
    }
};


const updateMenuPrice = async (req, res) => {
    try{
        const { id } = req.params;
        const { price } = req.body;

        const menuItem = await MenuItem.findById(id);
        if(!menuItem){
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        menuItem.price = price;
        await menuItem.save();

        res.status(200).json({
            success: true,
            message: 'Menu item price updated successfully',
            menuItem
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: 'Error updating menu item price',
            error: error.message
        });
    }
};


module.exports = { getMenuItems, getMenuItem,
    createMenuItem, updateMenuItem, deleteMenuItem, updateMenuPrice };