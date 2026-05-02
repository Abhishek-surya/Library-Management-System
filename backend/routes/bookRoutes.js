const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  borrowBook,
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const admin = require('../middleware/admin');

router.route('/').get(getBooks).post(protect, admin, createBook);
router
  .route('/:id')
  .get(getBookById)
  .put(protect, admin, updateBook)
  .delete(protect, admin, deleteBook);
router.route('/:id/borrow').post(protect, borrowBook);

module.exports = router;
