const jwt = require('jsonwebtoken');
const Author = require('../models/Author');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const author = await Author.findById(decodedToken.authorId);
        if (!author) {
            throw new Error();
        }
        req.author = author;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authenticated' });
    }
};
module.exports = authMiddleware;
