"use client";
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function StatusContent() {
  const searchParams = useSearchParams();
  const htno = searchParams.get('htno');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (htno) {
      fetch(`/api/phd-tracking/scholars/${htno}`)
        .then(res => res.json())
        .then(resData => {
          if (!resData.error) {
            setData({
              ...resData,
              examiners: resData.examiner_data ? JSON.parse(resData.examiner_data) : null
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [htno]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading status...</div>;
  if (!data) return <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>Error loading tracking information. Please check your credentials.</div>;

  const completed: string[] = [];
  const pending: string[] = [];

  // Categorize elements
  if (data.stage_1) completed.push("Examiners Appointed (3 Examiners)");
  else pending.push("Examiners Appointed (3 Examiners)");

  if (data.stage_2) completed.push("Synopsis Dispatched to Examiners");
  else pending.push("Synopsis Dispatched to Examiners");

  if (data.examiners) {
    ['examiner1', 'examiner2', 'examiner3'].forEach((key, index) => {
      const ex = data.examiners[key];
      const nameTag = ex.name ? ` (${ex.name})` : '';

      if (ex.acceptance) completed.push(`Examiner ${index + 1}${nameTag}: Accepted`);
      else pending.push(`Examiner ${index + 1}${nameTag}: Pending Acceptance`);

      // It doesn't make sense to dispatch if they haven't accepted, but we'll show it purely based on toggle exactly as requested
      if (ex.dispatch) completed.push(`Examiner ${index + 1}${nameTag}: Dissertation Dispatched`);
      else pending.push(`Examiner ${index + 1}${nameTag}: Pending Dissertation Dispatch`);

      if (ex.receipt) completed.push(`Examiner ${index + 1}${nameTag}: Report Received`);
      else pending.push(`Examiner ${index + 1}${nameTag}: Pending Report`);
    });
  }

  if (data.stage_6) completed.push("Report Communicated to Scholar");
  else pending.push("Report Communicated to Scholar");

  if (data.stage_7) completed.push("External Examiners Appointed for Viva Voce");
  else pending.push("External Examiners Appointed for Viva Voce");

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: '#1e3a8a', marginBottom: '1.5rem' }}>PhD Evaluation Status</h2>
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <p><strong>Scholar Name:</strong> {data.scholar_name}</p>
        <p><strong>HTNo:</strong> {data.htno}</p>
        <p><strong>Department:</strong> {data.department}</p>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#166534', borderBottom: '1px solid #dcfce7', paddingBottom: '0.5rem' }}>✓ Completed Steps</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {completed.length === 0 ? (
            <div style={{ color: '#64748b', fontStyle: 'italic' }}>No steps completed yet.</div>
          ) : (
            completed.map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f0fdf4', padding: '1rem', borderRadius: '8px' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span>
                <span style={{ color: '#166534', fontWeight: 500 }}>{text}</span>
              </div>
            ))
          )}
        </div>

        <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: '#c2410c', borderBottom: '1px solid #ffedd5', paddingBottom: '0.5rem' }}>⏳ Pending Steps</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {pending.length === 0 ? (
            <div style={{ color: '#64748b', fontStyle: 'italic' }}>All steps are complete!</div>
          ) : (
            pending.map((text, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#fffbeb', padding: '1rem', borderRadius: '8px' }}>
                <span style={{ color: '#d97706', fontWeight: 'bold' }}>⏳</span>
                <span style={{ color: '#92400e', fontWeight: 500 }}>{text}</span>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <a href="/phd-tracking" style={{ padding: '0.5rem 1rem', background: '#e2e8f0', color: '#333', textDecoration: 'none', borderRadius: '6px' }}>Back to Home</a>
      </div>
    </div>
  );
}

export default function StatusPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StatusContent />
    </Suspense>
  );
}
