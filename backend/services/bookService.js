const Book = require('../models/Book');

const getBooks = async (filters = {}) => {
  const query = {};
  
  if (filters.category) {
    query.category = filters.category;
  }
  
  if (filters.genre) {
    query.genre = filters.genre;
  }
  
  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { author: { $regex: filters.search, $options: 'i' } },
    ];
  }

  return await Book.find(query);
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

const borrowBook = async (bookId, userId) => {
  const book = await Book.findById(bookId);

  if (!book) {
    throw new Error('Book not found');
  }

  if (book.status !== 'Available' || book.availableCopies <= 0) {
    throw new Error('Book is not available for borrowing');
  }

  // Set due date to 14 days from now
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 14);

  book.status = 'Issued';
  book.borrowedBy = userId;
  book.dueDate = dueDate;
  book.availableCopies -= 1;

  return await book.save();
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
};
