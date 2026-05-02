const express = require('express');
const router = express.Router();
const { getBooks, getBookById, createBook } = require('../controllers/bookController');

router.route('/').get(getBooks).post(createBook);
router.route('/:id').get(getBookById);

module.exports = router;
