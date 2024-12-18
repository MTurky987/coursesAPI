const router = require('express').Router();
const Admin = require('../modules/admin');  


router.post('/', async (req, res) => {
    try {
        const { id, name, email, password, profileImage, helpMessages, pendingCourses } = req.body;

        if (!id || !name || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newAdmin = new Admin({ 
            id, 
            name, 
            email, 
            password, 
            profileImage: profileImage || '',
            helpMessages: helpMessages || [],
            pendingCourses: pendingCourses || [] 
        });

        const createdAdmin = await newAdmin.save();

        if (createdAdmin) return res.status(201).json(createdAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find();
        if (admins) return res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins', error: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, profileImage, helpMessages, pendingCourses } = req.body;

        const updateData = { 
            name, 
            email, 
            password, 
            profileImage, 
            helpMessages, 
            pendingCourses 
        };

        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedAdmin) return res.json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAdmin = await Admin.deleteOne({ _id: id });
        if (deletedAdmin) return res.json(deletedAdmin);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error: error.message });
    }
});

module.exports = router;
