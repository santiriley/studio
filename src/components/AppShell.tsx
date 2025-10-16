import * as React from 'react';
type Props = { children: React.ReactNode };
export default function AppShell({ children }: Props) {
  return (
    <div style={{ minHeight: '100svh', background: '#0b1220', color: '#e6eefc' }}>
      <header style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <strong>Venture Scout</strong>
      </header>
      <main style={{ padding: 16, maxWidth: 960, margin: '0 auto' }}>{children}</main>
      <footer style={{ padding: 16, opacity: 0.7 }}>
        <small>© {new Date().getFullYear()} Venture Scout</small>
      </footer>
    </div>
  );
}
