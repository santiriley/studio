'use client';

import AppShell from '@/components/app-shell';
import { mockNews } from '@/lib/mock';
export const dynamic = 'force-dynamic';
export default function DashboardPage() {
  const handleAISummary = () => {
    if (typeof window !== 'undefined') alert('AI summary will go here (noop for now).');
  };
  return (
    <AppShell>
      <h1 style={{ fontSize: 24, margin: '8px 0 16px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: '1fr' }}>
        <section style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>News clusters (mock)</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {mockNews.map((cluster) => (
              <div key={cluster.id} style={{ padding: 12, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8 }}>
                <strong style={{ display: 'block', marginBottom: 6 }}>{cluster.topic}</strong>
                <ul style={{ margin: 0, paddingLeft: 18 }}>
                  {cluster.items.map((item) => (
                    <li key={item.id} style={{ margin: '4px 0' }}>
                      <a href={item.url} style={{ color: '#9ecbff', textDecoration: 'none' }}>{item.title}</a>{' '}
                      <span style={{ opacity: 0.7 }}>· {item.source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.03)' }}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Quick actions</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="/founder/onboarding" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}>
              Founder onboarding
            </a>
            <a href="/account" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}>
              Account
            </a>
            <a
              href="/investors"
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}
            >
              Investors / Theses
            </a>
            <a
              href="/admin/seed"
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}
            >
              Admin (seed)
            </a>
            <a
              href="/programs"
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}
            >
              Programs / Open calls
            </a>
            <button onClick={handleAISummary} type="button" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}>
              Generate AI Summary (noop)
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
