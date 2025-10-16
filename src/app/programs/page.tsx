import AppShell from '@/components/app-shell';
import { mockOpenCalls } from '@/lib/mock';
export const dynamic = 'force-dynamic';

export default function ProgramsPage() {
  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Programs & Open Calls</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {mockOpenCalls.map((p) => (
          <div key={p.id} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <div>
                <strong>{p.title}</strong>
                <div style={{ opacity: 0.75, fontSize: 13 }}>{p.org}</div>
              </div>
              {p.deadline && <div style={{ opacity: 0.8, fontVariantNumeric: 'tabular-nums' }}>Deadline: {p.deadline}</div>}
            </div>
            {p.description && <p style={{ marginTop: 8, opacity: 0.9 }}>{p.description}</p>}
            <a href={p.applyUrl} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}>
              Apply / Book
            </a>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
