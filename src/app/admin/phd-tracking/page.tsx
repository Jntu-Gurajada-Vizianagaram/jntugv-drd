"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [scholars, setScholars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Form states
  const [htno, setHtno] = useState('');
  const [scholarName, setScholarName] = useState('');
  const [department, setDepartment] = useState('');
  const [supervisorName, setSupervisorName] = useState('');
  const [coSupervisorName, setCoSupervisorName] = useState('');
  const [error, setError] = useState('');

  const getToken = () => {
    if (typeof document !== 'undefined') {
      return document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";
    }
    return "mock_token";
  };

  const fetchScholars = () => {
    fetch('/api/phd-tracking/admin/scholars', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) setScholars(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchScholars();
  }, []);

  const handleAddScholar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!htno || !scholarName) {
      setError("HTNo and Scholar Name are required");
      return;
    }
    setError("");

    const res = await fetch('/api/phd-tracking/admin/scholars', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        htno,
        scholar_name: scholarName,
        department,
        supervisor_name: supervisorName,
        co_supervisor_name: coSupervisorName
      })
    });

    if (res.ok) {
      setHtno('');
      setScholarName('');
      setDepartment('');
      setSupervisorName('');
      setCoSupervisorName('');
      fetchScholars();
    } else {
      const data = await res.json();
      setError(data.error || "Failed to add scholar. HTNo might already exist.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 style={{ color: '#0f172a', marginBottom: '2rem' }}>Scholars Dashboard</h1>
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#334155' }}>Add New Scholar</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleAddScholar} style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1rem' }}>
          <input placeholder="HTNo *" value={htno} onChange={e => setHtno(e.target.value)} style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
          <input placeholder="Scholar Name *" value={scholarName} onChange={e => setScholarName(e.target.value)} style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
          <input placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
          <input placeholder="Supervisor Name" value={supervisorName} onChange={e => setSupervisorName(e.target.value)} style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
          <input placeholder="Co-Supervisor Name" value={coSupervisorName} onChange={e => setCoSupervisorName(e.target.value)} style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px' }} />
          <button type="submit" style={{ gridColumn: 'span 2', padding: '0.75rem', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Add Scholar</button>
        </form>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', color: '#475569' }}>HTNo</th>
              <th style={{ padding: '1rem', color: '#475569' }}>Name</th>
              <th style={{ padding: '1rem', color: '#475569' }}>Department</th>
              <th style={{ padding: '1rem', color: '#475569' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholars.map(scholar => (
              <tr key={scholar.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem' }}>{scholar.htno}</td>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{scholar.scholar_name}</td>
                <td style={{ padding: '1rem', color: '#64748b' }}>{scholar.department}</td>
                <td style={{ padding: '1rem' }}>
                  <button onClick={() => router.push(`/admin/phd-tracking/${scholar.htno}`)} style={{ background: '#e2e8f0', color: '#0f172a', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
                    Manage
                  </button>
                </td>
              </tr>
            ))}
            {scholars.length === 0 && (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>No scholars found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
