'use client';
import AppShell from '@/components/app-shell';
import { useWorkspace } from '@/context/workspace';
import { fetchInvestorsForWorkspace } from '@/lib/data';
import * as React from 'react';
export const dynamic = 'force-dynamic';

export default function InvestorsPage() {
  const { current } = useWorkspace();
  const [list, setList] = React.useState(() => [] as Awaited<ReturnType<typeof fetchInvestorsForWorkspace>>);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const data = await fetchInvestorsForWorkspace(current?.id);
      if (alive) {
        setList(data);
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [current?.id]);
  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Investors</h1>
      <div style={{ display: 'grid', gap: 12 }}>
        {loading && <div style={{ opacity: 0.8 }}>Loading…</div>}
        {list.map((inv) => (
          <a
            key={inv.id}
            href={`/investors/${inv.id}`}
            style={{
              display: 'block',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 12,
              padding: 16,
              background: 'rgba(255,255,255,0.03)',
              color: '#e6eefc',
              textDecoration: 'none',
            }}
          >
            <strong>{inv.name}</strong>
            <div style={{ opacity: 0.75, fontSize: 13 }}>{inv.thesis.name}</div>
            {inv.workspaceId && <div style={{ marginTop: 4, fontSize: 12, opacity: 0.8 }}>Workspace: <code>{inv.workspaceId}</code></div>}
          </a>
        ))}
      </div>
    </AppShell>
  );
}
