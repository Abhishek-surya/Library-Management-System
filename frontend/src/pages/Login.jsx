import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const data = await authService.login(email, password);
      if (data.success) {
        setMessage({ text: data.message, type: 'success' });
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage({ text: data.message || 'Invalid credentials.', type: 'danger' });
      }
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Cannot connect to the server.', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel auth-container" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', textAlign: 'center' }}>
        <div className="auth-logo" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>Lumina Library</div>
        <p className="auth-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Welcome back! Please login to your account.</p>

        <form className="auth-form" style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {message.text && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem', textAlign: 'center', color: `var(--${message.type})` }}>
              {message.text}
            </div>
          )}
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-links" style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
