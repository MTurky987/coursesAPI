const router = require('express').Router();
const Payment = require('../modules/Payment');  

// Create a new payment
router.post('/', async (req, res) => {
    try {
        const { paymentId, customer, cart_id, paymentDate } = req.body;

        if (!paymentId || !customer || !cart_id || !paymentDate) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newPayment = new Payment({ 
            paymentId, 
            customer, 
            cart_id, 
            paymentDate 
        });

        const createdPayment = await newPayment.save();

        if (createdPayment) return res.status(201).json(createdPayment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find();
        if (payments) return res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { paymentId, customer, cart_id, paymentDate } = req.body;

        const updateData = { 
            paymentId, 
            customer, 
            cart_id, 
            paymentDate 
        };

        const updatedPayment = await Payment.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedPayment) return res.json(updatedPayment);
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPayment = await Payment.deleteOne({ _id: id });
        if (deletedPayment) return res.json(deletedPayment);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting payment', error: error.message });
    }
});

module.exports = router;
