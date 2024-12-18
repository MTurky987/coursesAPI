const router = require('express').Router();
const Cart = require('../modules/cart');  


router.post('/', async (req, res) => {
    try {
        const { id, customer, courses } = req.body;

        if (!id || !customer || !courses) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newCart = new Cart({ 
            id, 
            customer, 
            courses 
        });

        const createdCart = await newCart.save();

        if (createdCart) return res.status(201).json(createdCart);
    } catch (error) {
        res.status(500).json({ message: 'Error creating cart', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find();
        if (carts) return res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching carts', error: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { customer, courses } = req.body;

        const updateData = { 
            customer, 
            courses 
        };

        const updatedCart = await Cart.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedCart) return res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCart = await Cart.deleteOne({ _id: id });
        if (deletedCart) return res.json(deletedCart);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting cart', error: error.message });
    }
});

module.exports = router;
