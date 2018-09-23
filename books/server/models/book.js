const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'provide book title'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'provide author por favor'],
      trim: true,
    },
    pages: {
      type: Number,
      min: [1, 'please provide page count'],
      required: true,
    },
    year: {
      type: String,
      min: [-4000, 'approximate year por favor'],
      required: true,
    },
    publisher: String,
    year: Number,
    author: {
      type: String,
      required: [true, 'publishers are important'],
      trim: true,
    },
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
