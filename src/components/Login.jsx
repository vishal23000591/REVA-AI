import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://reva-ai-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('email', form.email);
      localStorage.setItem('isVerified', 'false');

      navigate('/verify');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: "linear-gradient(135deg, #e6f5e6 0%, #f0f9f0 100%)",
      }}
    >
      <div
        style={{
          background: 'white',
          padding: '2.5rem',
          borderRadius: '16px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          width: '100%',
          maxWidth: '420px',
          textAlign: 'center',
          transition: 'transform 0.2s ease',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#205d42' }}>
          Welcome Back!
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Login to access your dashboard and manage your documents.
        </p>

        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email address"
            required
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.3s',
            }}
            onFocus={(e) => (e.target.style.border = '1px solid #205d42')}
            onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="Password"
            required
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '10px',
              border: '1px solid #ccc',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.3s',
            }}
            onFocus={(e) => (e.target.style.border = '1px solid #205d42')}
            onBlur={(e) => (e.target.style.border = '1px solid #ccc')}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #2e8b57, #205d42)',
              color: 'white',
              padding: '0.85rem',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              marginTop: '0.5rem',
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.03)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: '#555', fontSize: '0.95rem' }}>
          Don’t have an account?{' '}
          <Link
            to="/signup"
            style={{ color: '#2e8b57', fontWeight: 'bold', textDecoration: 'none' }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
