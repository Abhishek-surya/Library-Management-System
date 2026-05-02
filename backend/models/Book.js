const mongoose = require('mongoose');

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    genre: {
      type: String,
      required: [true, 'Please add a genre'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Available', 'Issued'],
      default: 'Available',
    },
    description: {
      type: String,
    },
    totalCopies: {
      type: Number,
      default: 1,
    },
    availableCopies: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', bookSchema);
