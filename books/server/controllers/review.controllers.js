const Book = require('mongoose').model('Book');
const Review = require('mongoose').model('Review');

module.exports = {
  // get all reviews from specific book
  index(request, response) {
    // extract book id
    const { book_id: book } = request.params;
    Review.find({ book })
      .then(reviews => response.json(reviews))
      .catch(console.log);
  },
  // create
  create(request, response) {
    const review = request.body;
    console.log('this is review in review.cont.', review);
    review.book = request.params.book_id;
    Review.create(review)
      .then(review => {
        console.log('review', review);
        response.json(review);
      })
      .catch(error => {
        response
          .status(500)
          .json(
            Object.keys(error.errors).map(key => error.errors[key].message)
          );
      });
  },
  // get single item/resource
  show(request, response) {
    Review.findById(request.params.book_id)
      .then(review => response.json(review))
      .catch(console.log);
  },
  // update a resource
  update(request, response) {
    Review.findByIdAndUpdate(request.params.book_id, request.body, {
      new: true,
    })
      .then(review => response.json(review))
      .catch(console.log('update from review.controllers'));
  },
  // delete item / resource
  destroy(request, response) {
    Review.findByIdAndRemove(request.params.review_id)
      .then(review => response.json(review))
      .catch(console.log);
  },
};
