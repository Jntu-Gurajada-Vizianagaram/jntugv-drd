"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [htno, setHtno] = useState('');
  const [regno, setRegno] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!htno) {
      setError("Please enter your HTNo");
      return;
    }
    setError("");
    const res = await fetch(`/api/phd-tracking/scholars/${encodeURIComponent(htno)}`);
    if (res.ok) {
      router.push(`/phd-tracking/status?htno=${encodeURIComponent(htno)}`);
    } else {
      setError("Invalid credentials or scholar not found.");
    }
  };

  return (
    <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '400px', width: '100%', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <h1 style={{ textAlign: 'center', color: '#1e3a8a', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem' }}>PhD Tracker</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>JNTUGV R&D Status Portal</p>

        {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Hall Ticket Number</label>
            <input
              type="text"
              value={htno}
              onChange={(e) => setHtno(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px', outline: 'none' }}
              placeholder="Enter your HTNo"
            />
          </div>
          <button
            type="submit"
            style={{ marginTop: '1rem', background: '#1e3a8a', color: 'white', border: 'none', padding: '0.875rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', transition: 'background 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = '#172554'}
            onMouseOut={(e) => e.currentTarget.style.background = '#1e3a8a'}
          >
            Check Status
          </button>
        </form>
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
          <a href="/admin/phd-tracking" style={{ color: '#1e3a8a', textDecoration: 'none', fontWeight: '600' }}>Admin Login</a>
        </div>
      </div>
    </main>
  );
}
