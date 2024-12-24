const router = require('express').Router();
const Post = require('../modules/courses'); 


router.post('/', async (req, res) => {
    try {
        const { courseId, title, description, imageUrl, videosUrl, price, publisherId, category } = req.body;
        
        if (!courseId || !title || !description || !imageUrl || !videosUrl || !price || !publisherId || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        
        const newPost = new Post({ 
            courseId, 
            title, 
            description, 
            imageUrl, 
            videosUrl, 
            price, 
            publisherId, 
            category 
        }); 
        
        const createdPost = await newPost.save();
        
        if (createdPost) return res.status(201).json(createdPost);       
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts) res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { courseId, title, description, imageUrl, videosUrl, price, publisherId, category, status, rating, numberOfRatings, numberOfBuyers } = req.body;
        
        const updateData = { 
            courseId, 
            title, 
            description, 
            imageUrl, 
            videosUrl, 
            price, 
            publisherId, 
            category, 
            status, 
            rating, 
            numberOfRatings, 
            numberOfBuyers 
        };
        
       
        
        const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
        if (updatedPost) res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletedPost = await Post.deleteOne({ _id: id });
        if (deletedPost) res.json(deletedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
});

router.get("/:id",async (req,res)=>{
    try{
    const id = req.params.id;
    const course = await Post.findById(id)
    if(course){
        res.status(200).json(course)
    }
    }catch{
        res.status(404).json({message: "Error cource not found",error:error.message})
    }
})

module.exports = router;
