const Inventory = require('../models/Inventory');

exports.getItems = async (req, res) => {
    try {
        const items = await Inventory.find().sort({ category: 1 });
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addItem = async (req, res) => {
    try {
        const { itemName, category, quantity, minThreshold } = req.body;
        const newItem = await Inventory.create({ itemName, category, quantity, minThreshold });
        res.status(201).json({ message: 'Item added successfully', item: newItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { quantityAction } = req.body; // 'add' or 'remove'
        const item = await Inventory.findById(req.params.id);
        
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (quantityAction === 'add') item.quantity += 1;
        if (quantityAction === 'remove' && item.quantity > 0) item.quantity -= 1;

        await item.save();
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};