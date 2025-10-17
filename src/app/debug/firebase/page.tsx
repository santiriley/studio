'use client';
import * as React from 'react';
import AppShell from '@/components/app-shell';
import AuthStatus from '@/components/AuthStatus';
import { getFirebaseWebConfig, isFirebaseConfigured } from '@/lib/env';
import { getClientApp, getDb } from '@/lib/firebase';

export const dynamic = 'force-dynamic';

type Check = { label: string; ok: boolean; detail?: string };

export default function FirebaseDebugPage() {
  const [checks, setChecks] = React.useState<Check[]>([]);
  const [running, setRunning] = React.useState(false);

  const run = async () => {
    setRunning(true);
    const out: Check[] = [];
    try {
      // Config
      const cfg = getFirebaseWebConfig();
      out.push({ label: 'Config detected', ok: isFirebaseConfigured(), detail: cfg ? `projectId=${cfg.projectId}` : 'no config' });

      // App init
      const app = await getClientApp();
      out.push({ label: 'Initialized Firebase App', ok: !!app, detail: app ? 'ok' : 'no app' });

      // Firestore get
      const db = await getDb();
      if (!db) {
        out.push({ label: 'Firestore available', ok: false, detail: 'db not available' });
      } else {
        out.push({ label: 'Firestore available', ok: true });
        try {
          const { doc, getDoc, setDoc, serverTimestamp } = await import('firebase/firestore');
          const ref = doc(db, 'debug', 'ping');
          const snap = await getDoc(ref);
          out.push({ label: 'Read debug/ping', ok: true, detail: snap.exists() ? 'exists' : 'missing (will try write)' });
          try {
            await setDoc(ref, { updatedAt: serverTimestamp() }, { merge: true });
            out.push({ label: 'Write debug/ping', ok: true, detail: 'write ok' });
          } catch (e: any) {
            out.push({ label: 'Write debug/ping', ok: false, detail: e?.message || 'write failed (rules?)' });
          }
        } catch (e: any) {
          out.push({ label: 'Firestore ops', ok: false, detail: e?.message || 'failed to import ops' });
        }
      }
    } finally {
      setChecks(out);
      setRunning(false);
    }
  };

  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Firebase Debug</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          onClick={run}
          disabled={running}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc', cursor: 'pointer' }}
        >
          {running ? 'Running…' : 'Run checks'}
        </button>
        <a href="/admin/seed" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}>
          Go to Seeder
        </a>
      </div>
      <div style={{ marginBottom: 12 }}>
        <AuthStatus />
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        {checks.map((c, i) => (
          <div key={i} style={{ fontSize: 14, color: c.ok ? '#b7f7ce' : '#fca5a5' }}>
            {c.ok ? '✓' : '✗'} {c.label}{c.detail ? ` — ${c.detail}` : ''}
          </div>
        ))}
      </div>
      <hr style={{ margin: '16px 0', borderColor: 'rgba(255,255,255,0.12)' }} />
      <div style={{ opacity: 0.8, fontSize: 13, lineHeight: 1.6 }}>
        If <em>Write debug/ping</em> fails, temporarily relax Firestore dev rules and run again:
        <pre style={{ whiteSpace: 'pre-wrap' }}>
{`match /workspaces/{id} { allow read, write: if request.auth != null; }
match /theses/{id}     { allow read, write: if request.auth != null; }
match /investors/{id}  { allow read, write: if request.auth != null; }
match /debug/{id}      { allow read, write: if request.auth != null; }`}
        </pre>
      </div>
    </AppShell>
  );
}
