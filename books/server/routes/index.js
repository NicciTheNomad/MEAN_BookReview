const bookRoutes = require('./book.routes');
const authRoutes = require('./auth.routes');
const reviewRoutes = require('./review.routes');
const router = require('express').Router();

module.exports = router.use('/books', bookRoutes).use(reviewRoutes);
