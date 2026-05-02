const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

const books = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    category: 'Fiction',
    genre: 'Classic',
    status: 'Available',
  },
  {
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    genre: 'Dystopian',
    status: 'Issued',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    category: 'Fiction',
    genre: 'Classic',
    status: 'Available',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Fiction',
    genre: 'Sci-Fi',
    status: 'Available',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('Database Seeded!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
