const bookService = require('../services/bookService');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const { category, genre, search } = req.query;
    const books = await bookService.getBooks({ category, genre, search });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  try {
    const createdBook = await bookService.createBook(req.body);
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookService.deleteBook(req.params.id);
    if (deletedBook) {
      res.json({ message: 'Book removed' });
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Borrow a book
// @route   POST /api/books/:id/borrow
// @access  Private
const borrowBook = async (req, res) => {
  try {
    // Assuming user ID is available in req.user (from auth middleware)
    // For now, if req.user is not present, we can check req.body.userId
    const userId = req.user ? req.user._id : req.body.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const borrowedBook = await bookService.borrowBook(req.params.id, userId);
    res.json(borrowedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
};
