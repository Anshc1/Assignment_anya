const express = require('express');
const jwt = require('jsonwebtoken');
const Author = require('../models/Author'); // adjust the path as necessary
const Books = require('../models/Book')
const bcrypt = require('bcryptjs');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
router.post('/login', async (req, res) => {
    console.log("hit")
    try {
        const { email, password } = req.body; 
        const comparePassword =(hashPassword)=>{
            return bcrypt.compare(hashPassword , password); 
        }
        const author = await Author.findOne({ email }); 
        if (!author && comparePassword(await author.password) ) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ authorId: author._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const authors = await Author.aggregate([
            {
                $lookup: {
                    from: 'books', // the collection name in MongoDB
                    localField: '_id', // field from the 'authors' collection
                    foreignField: 'author', // field from the 'books' collection
                    as: 'books' // output array field
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    numberOfBooks: { $size: '$books' }
                }
            }
        ]);
        res.json(authors);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});
router.get('check/:id', async (req, res) => {
    try {
        
        const authorId = req.params.id;
        const author = await Author.findById(authorId);

        if (!author) {
            return res.status(404).send({ message: 'Author not found' });
        }
        const books = await Books.find({ author: authorId });
        res.json({ author, books });
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});
router.get('/me', authMiddleware, (req, res) => {
    res.json(req.author);
});



module.exports = router;
