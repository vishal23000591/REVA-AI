import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Verify() {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Retrieve email from localStorage (saved during login)
  const email = localStorage.getItem('email');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Email not found. Please login again.');
      return;
    }

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('https://reva-ai-backend.onrender.com/api/auth/verify-code', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code: otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Verification failed');
      }

      // Store the JWT token returned by backend
      localStorage.setItem('accessToken', data.token); 
      localStorage.setItem('user', JSON.stringify(data.customer)); // store customer info
      localStorage.setItem('isVerified', 'true');

      alert('Verification successful!');

      // Redirect to customer home page
      navigate('/customer/home');
    } catch (err) {
      setError(err.message);
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
        padding: '2rem',
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: '100%',
          padding: '2rem',
          background: '#f4f7f4ff',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
        }}
      >
        <h2 style={{ marginBottom: '1rem', textAlign: 'center', color: '#1a2e1a' }}>
          Enter 6-digit Authenticator Code
        </h2>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))} // Only numbers
            placeholder="Enter code from Authenticator"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              marginBottom: '1rem',
              borderRadius: '6px',
              border: '1px solid #ccc',
              textAlign: 'center',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1rem',
              backgroundColor: '#1a2e1a',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        {error && (
          <p
            style={{
              marginTop: '1rem',
              color: 'red',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {error}
          </p>
        )}
        <p
          style={{
            marginTop: '1.5rem',
            fontSize: '0.95rem',
            color: '#2e422e',
            textAlign: 'center',
          }}
        >
          Not registered in <strong>REVA AI Authenticator</strong>?  
          Create an account in REVA AI Authenticator and get your code.
        </p>
      </div>
    </div>
  );
}
