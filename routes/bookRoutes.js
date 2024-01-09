const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); 
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware ,async (req, res) => {
    try {
        const books = await Book.find().sort({likes : 1}).populate('author', 'name'); // Assuming you want to include author's name
        res.json(books);
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
});
router.put('/like/:id',authMiddleware , async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findByIdAndUpdate(bookId, { $inc: { likes: 1 } }, { new: true });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.put('/unlike/:id', authMiddleware , async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findByIdAndUpdate(bookId, { $inc: { likes: -1 } }, { new: true });

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = router;
