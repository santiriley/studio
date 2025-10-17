'use client';
import * as React from 'react';
import WorkspaceSwitcher from '@/components/WorkspaceSwitcher';
import { useWorkspace } from '@/context/workspace';

type Props = { children: React.ReactNode };
export default function AppShell({ children }: Props) {
  const { current } = useWorkspace();
  const brand = current?.primaryColor ?? '#0b1220';
  return (
    <div style={{ minHeight: '100svh', background: '#0b1220', color: '#e6eefc' }}>
      <header
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: `linear-gradient(90deg, ${brand} 0%, rgba(0,0,0,0) 100%)`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <strong>Venture Scout</strong>
          <WorkspaceSwitcher />
        </div>
      </header>
      <main style={{ padding: 16, maxWidth: 960, margin: '0 auto' }}>{children}</main>
      <footer style={{ padding: 16, opacity: 0.7 }}>
        <small>© {new Date().getFullYear()} Venture Scout</small>
      </footer>
    </div>
  );
}
