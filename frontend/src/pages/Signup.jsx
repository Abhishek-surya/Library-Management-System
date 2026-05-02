import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    contact_number: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const data = await authService.signup(formData);
      if (data.success) {
        setMessage({ text: data.message, type: 'success' });
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setMessage({ text: data.message || 'An error occurred.', type: 'danger' });
      }
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Cannot connect to the server.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel auth-container" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', textAlign: 'center' }}>
        <div className="auth-logo" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Lumina Library</div>
        <p className="auth-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Create an account to start borrowing books.</p>

        <form className="auth-form" style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" className="form-control" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input type="email" name="email" className="form-control" required placeholder="john@example.com" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" required placeholder="Create a secure password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Address</label>
            <textarea name="address" className="form-control" rows="2" required placeholder="123 Library St, Booksville" value={formData.address} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label className="form-label">Contact Number</label>
            <input type="text" name="contact_number" className="form-control" required placeholder="+1 234 567 8900" value={formData.contact_number} onChange={handleChange} />
          </div>
          
          {message.text && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center', color: `var(--${message.type})` }}>
              {message.text}
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
