import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/api';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    genre: '',
    description: '',
    coverImage: '',
    totalCopies: 1,
    availableCopies: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'totalCopies' || name === 'availableCopies' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createBook(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '600px' }}>
      <div className="card" style={{ padding: '2rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Add New Book</h2>
        
        {error && (
          <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger-color)', borderRadius: '8px', color: 'var(--danger-color)', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category</label>
              <input
                type="text"
                name="category"
                className="form-control"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Fiction"
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Genre</label>
              <input
                type="text"
                name="genre"
                className="form-control"
                value={formData.genre}
                onChange={handleChange}
                placeholder="e.g. Sci-Fi"
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Description</label>
            <textarea
              name="description"
              className="form-control"
              style={{ minHeight: '100px', resize: 'vertical' }}
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              className="form-control"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Total Copies</label>
              <input
                type="number"
                name="totalCopies"
                className="form-control"
                min="1"
                value={formData.totalCopies}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Available Copies</label>
              <input
                type="number"
                name="availableCopies"
                className="form-control"
                min="0"
                value={formData.availableCopies}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.8rem' }}
            disabled={loading}
          >
            {loading ? 'Adding Book...' : 'Add Book'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
