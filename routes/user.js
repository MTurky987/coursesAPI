const router = require('express').Router();
const Post = require('../modules/user'); 



router.get('/log', async (req, res) => {
    try {
        console.log(req.query);  

        const { email } = req.query;  
        console.log(email);  
        
        const user = await Post.findOne({ email: email });  // Query by email
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { id, name, email, password, profileImage, address, accountHolder, cardId, bankName, phoneNumber, purchasedCourses, helpMessage, rating, publishedCourses, earnings } = req.body;
        
        if (!id || !name || !email || !password || !profileImage || !address || !accountHolder || !cardId || !bankName || !phoneNumber || !purchasedCourses || !helpMessage || !rating || !publishedCourses || earnings === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newPost = new Post({ 
            id, 
            name, 
            email, 
            password, 
            profileImage, 
            address, 
            accountHolder, 
            cardId, 
            bankName, 
            phoneNumber, 
            purchasedCourses, 
            helpMessage, 
            rating, 
            publishedCourses, 
            earnings 
        }); 
        
        const createdPost = await newPost.save();
        
        if (createdPost) return res.status(201).json(createdPost);       
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts) res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});

// Update a user by ID
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, password, profileImage, address, accountHolder, cardId, bankName, phoneNumber, purchasedCourses, helpMessage, rating, publishedCourses, earnings } = req.body;
        
        const updateData = { 
            name, 
            email, 
            password, 
            profileImage, 
            address, 
            accountHolder, 
            cardId, 
            bankName, 
            phoneNumber, 
            purchasedCourses, 
            helpMessage, 
            rating, 
            publishedCourses, 
            earnings 
        };
        
        // Remove undefined values to avoid overwriting existing data with undefined
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
        
        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedPost) res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await Post.deleteOne({ _id: id });
        if (deletedPost) res.json(deletedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
});

router.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const posts = await Post.find({id:id});
        if (posts) res.status(200).json(posts);
        
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }

})


module.exports = router;
