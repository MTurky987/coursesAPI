const router = require('express').Router();
const Help = require('../modules/help');  

// Create a new message
router.post('/', async (req, res) => {
    try {
        const { id, customer, message, responseMessage, status, timestamp } = req.body;

        if (!id || !customer || !message || !timestamp) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newMessage = new Help({ 
            id, 
            customer, 
            message, 
            responseMessage: responseMessage || "", 
            status: status || "Pending",  
            timestamp 
        });

        const createdMessage = await newMessage.save();

        if (createdMessage) return res.status(201).json(createdMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const messages = await Help.find();
        if (messages) return res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { customer, message, responseMessage, status, timestamp } = req.body;

        const updateData = { 
            customer, 
            message, 
            responseMessage, 
            status, 
            timestamp 
        };

        const updatedMessage = await Help.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedMessage) return res.json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error updating message', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedMessage = await Help.deleteOne({ _id: id });
        if (deletedMessage) return res.json(deletedMessage);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting message', error: error.message });
    }
});

module.exports = router;
