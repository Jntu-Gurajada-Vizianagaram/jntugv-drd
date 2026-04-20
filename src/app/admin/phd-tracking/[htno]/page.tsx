"use client";
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';

export default function ScholarManage({ params }: { params: Promise<{ htno: string }> }) {
  const { htno } = use(params);
  const router = useRouter();
  const [scholar, setScholar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [stages, setStages] = useState({
    stage_1: false,
    stage_2: false,
    stage_6: false,
    stage_7: false,
  });

  const [examiners, setExaminers] = useState<any>({
    examiner1: { name: "", acceptance: false, dispatch: false, receipt: false },
    examiner2: { name: "", acceptance: false, dispatch: false, receipt: false },
    examiner3: { name: "", acceptance: false, dispatch: false, receipt: false }
  });

  const getToken = () => {
    if (typeof document !== 'undefined') {
      return document.cookie.split('; ').find(row => row.startsWith('admin_token='))?.split('=')[1] || "mock_token";
    }
    return "mock_token";
  };

  useEffect(() => {
    fetch(`/api/phd-tracking/scholars/${htno}`)
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setScholar(data);
          setStages({
            stage_1: Boolean(data.stage_1),
            stage_2: Boolean(data.stage_2),
            stage_6: Boolean(data.stage_6),
            stage_7: Boolean(data.stage_7),
          });
          if (data.examiner_data) {
            setExaminers(JSON.parse(data.examiner_data));
          }
        }
        setLoading(false);
      });
  }, [htno]);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    const res = await fetch(`/api/phd-tracking/admin/scholars/${htno}/stages`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        ...stages,
        examiner_data: JSON.stringify(examiners)
      })
    });

    setSaving(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleExaminerChange = (key: string, field: string, value: any) => {
    setExaminers((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (!scholar) return <div>Scholar not found</div>;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button onClick={() => router.push('/admin/phd-tracking')} style={{ background: '#e2e8f0', color: '#0f172a', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
          &larr; Back
        </button>
        <h1 style={{ color: '#0f172a', margin: 0 }}>Manage Tracking: {scholar.scholar_name}</h1>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#334155' }}>Global Stages</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1rem' }}>
          <label style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={stages.stage_1} onChange={() => setStages(p => ({...p, stage_1: !p.stage_1}))} />
            <b>1. Appointment of Examiners (3 Examiners)</b>
          </label>
          <label style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={stages.stage_2} onChange={() => setStages(p => ({...p, stage_2: !p.stage_2}))} />
            <b>2. Dispatch of synopsis to examiners</b>
          </label>
        </div>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#334155' }}>Examiners Tracking</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.5rem' }}>
          {['examiner1', 'examiner2', 'examiner3'].map((key, i) => (
            <div key={key} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1.5rem' }}>
              <h3 style={{ marginTop: 0, color: '#1e3a8a' }}>Examiner {i + 1}</h3>
              <input 
                value={examiners[key].name}
                onChange={e => handleExaminerChange(key, 'name', e.target.value)}
                placeholder="Examiner Name/Alias"
                style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
              />
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={examiners[key].acceptance} onChange={e => handleExaminerChange(key, 'acceptance', e.target.checked)} />
                Accepted Evaluation
              </label>
              <label style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={examiners[key].dispatch} onChange={e => handleExaminerChange(key, 'dispatch', e.target.checked)} />
                Dissertation Dispatched
              </label>
              <label style={{ display: 'flex', gap: '0.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={examiners[key].receipt} onChange={e => handleExaminerChange(key, 'receipt', e.target.checked)} />
                Report Received
              </label>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem', color: '#334155' }}>Final Protocol</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '1rem' }}>
          <label style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={stages.stage_6} onChange={() => setStages(p => ({...p, stage_6: !p.stage_6}))} />
            <b>Communication of report to research scholars</b>
          </label>
          <label style={{ display: 'flex', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={stages.stage_7} onChange={() => setStages(p => ({...p, stage_7: !p.stage_7}))} />
            <b>Appointment of External examiners for Viva Voce</b>
          </label>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '4rem' }}>
        <button onClick={handleSave} disabled={saving} style={{ padding: '0.75rem 2rem', background: '#1e3a8a', color: 'white', border: 'none', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600 }}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {success && <span style={{ color: '#16a34a', fontWeight: 500 }}>✓ Saved successfully!</span>}
      </div>
    </div>
  );
}
