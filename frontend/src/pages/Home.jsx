import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api, { deleteBook } from '../services/api';
import authService from '../services/authService';
import { CATEGORIES, GENRES } from '../constants/bookConstants';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [genre, setGenre] = useState('');
  
  const user = authService.getCurrentUser();

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category) params.append('category', category);
      if (genre) params.append('genre', genre);

      const response = await api.get(`/books?${params.toString()}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  }, [search, category, genre]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBooks();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        fetchBooks(); // Refresh the list
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book');
      }
    }
  };

  return (
    <>
      <header className="hero" style={{ padding: '4rem 0', textAlign: 'center', background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'linear-gradient(to right, #fff, var(--text-muted))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Discover Your Next Great Read
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Explore thousands of books, from timeless classics to modern masterpieces. Search by title, author, category, or genre.
          </p>
          
          <form className="search-container" style={{ maxWidth: '900px', margin: '0 auto', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }} onSubmit={handleSearch}>
            <input 
              type="text" 
              className="form-control search-input" 
              style={{ flex: 2, minWidth: '200px' }} 
              placeholder="Search by title or author..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
            <select 
              className="form-control filter-select" 
              style={{ flex: 1, minWidth: '150px' }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select 
              className="form-control filter-select" 
              style={{ flex: 1, minWidth: '150px' }}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="">All Genres</option>
              {GENRES.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </header>

      <section className="book-section container" style={{ padding: '4rem 0' }}>
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem' }}>Trending Books</h2>
        </div>

        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="book-grid">
            {books.length > 0 ? (
              books.map((book) => (
                <div key={book._id} className="book-card">
                  <div className="book-cover">
                    {book.coverImage ? <img src={book.coverImage} alt={book.title} /> : <span>No Cover</span>}
                  </div>
                  <div className="book-info">
                    <h3 className="book-title">{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <div className="book-meta">
                      <span className={`badge ${book.status === 'Available' ? 'badge-success' : 'badge-danger'}`}>
                        {book.status}
                      </span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{book.category}</span>
                    </div>
                    
                    {user && (
                      <div className="book-actions" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <Link 
                          to={`/edit-book/${book._id}`} 
                          className="btn btn-secondary" 
                          style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem', textAlign: 'center', textDecoration: 'none' }}
                        >
                          Edit
                        </Link>
                        <button 
                          className="btn btn-danger" 
                          style={{ flex: 1, fontSize: '0.8rem', padding: '0.4rem' }}
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No books found. Please check back later.</p>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
