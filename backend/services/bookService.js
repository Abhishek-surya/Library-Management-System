const Book = require('../models/Book');

const getBooks = async () => {
  return await Book.find({});
};

const getBookById = async (id) => {
  return await Book.findById(id);
};

const createBook = async (bookData) => {
  const book = new Book(bookData);
  return await book.save();
};

const updateBook = async (id, updateData) => {
  return await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deleteBook = async (id) => {
  return await Book.findByIdAndDelete(id);
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
