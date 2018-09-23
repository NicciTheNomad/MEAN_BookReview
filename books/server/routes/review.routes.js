const { reviewController } = require('../controllers');
const router = require('express').Router();

module.exports = router
  .get('/books/:book_id/reviews', reviewController.index)
  .post('/books/:book_id/reviews', reviewController.create)
  .get('/books/:book_id/reviews/:review_id', reviewController.show)
  .put('/books/:book_id/reviews/:review_id', reviewController.update)
  .delete('/books/:book_id/reviews/:review_id', reviewController.destroy);
