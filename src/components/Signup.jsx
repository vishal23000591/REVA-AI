import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://reva-ai-backend.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      navigate('/login');
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
          maxWidth: '450px',
          textAlign: 'center',
          transition: 'transform 0.2s ease',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#205d42' }}>
          Create Your Account
        </h1>
        <p style={{ color: '#666', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Sign up to get started and manage your documents easily.
        </p>

        <form
          onSubmit={onSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Full Name"
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
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Email Address"
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
            type="tel"
            name="phone"
            value={form.phone}
            onChange={onChange}
            placeholder="Phone Number"
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
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: '#555', fontSize: '0.95rem' }}>
          Already have an account?{' '}
          <Link
            to="/login"
            style={{ color: '#2e8b57', fontWeight: 'bold', textDecoration: 'none' }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
