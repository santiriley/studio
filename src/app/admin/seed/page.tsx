
'use client';
import * as React from 'react';
import AppShell from '@/components/app-shell';
import { isFirebaseConfigured, getFirebaseWebConfig } from '@/lib/env';
import { getDb } from '@/lib/firebase';
import { SEED_WORKSPACES, SEED_THESES, SEED_INVESTORS } from '@/lib/seeds';

export const dynamic = 'force-dynamic';

type Result = { id: string; ok: boolean; msg: string };

export default function SeedPage() {
  const [results, setResults] = React.useState<Result[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [note, setNote] = React.useState<string>('');
  const cfg = getFirebaseWebConfig();
  const configured = isFirebaseConfigured();

  const seed = async () => {
    setBusy(true);
    setResults([]);
    setNote('');
    try {
      if (!configured) {
        setNote('Firebase not configured. App Hosting sets FIREBASE_WEBAPP_CONFIG automatically; for local dev use NEXT_PUBLIC_* envs.');
        return; // finally will run
      }
      const db = await getDb();
      if (!db) {
        setNote('DB not available on this environment.');
        return;
      }
      const { doc, setDoc } = await import('firebase/firestore');
      const out: Result[] = [];
      for (const ws of SEED_WORKSPACES) {
        try {
          await setDoc(doc(db, 'workspaces', ws.id), ws, { merge: true });
          out.push({ id: `workspace:${ws.id}`, ok: true, msg: 'upserted' });
        } catch (e: any) {
          out.push({ id: `workspace:${ws.id}`, ok: false, msg: e?.message ?? 'error' });
        }
      }
      for (const th of SEED_THESES) {
        try {
          await setDoc(doc(db, 'theses', th.id), th.thesis, { merge: true });
          out.push({ id: `thesis:${th.id}`, ok: true, msg: 'upserted' });
        } catch (e: any) {
          out.push({ id: `thesis:${th.id}`, ok: false, msg: e?.message ?? 'error' });
        }
      }
      for (const inv of SEED_INVESTORS) {
        try {
          await setDoc(doc(db, 'investors', inv.id), inv, { merge: true });
          out.push({ id: `investor:${inv.id}`, ok: true, msg: 'upserted' });
        } catch (e: any) {
          out.push({ id: `investor:${inv.id}`, ok: false, msg: e?.message ?? 'error' });
        }
      }
      setResults(out);
      if (out.some(r => !r.ok)) {
        setNote('Some writes failed. This is usually Firestore security rules—enable authenticated writes for dev.');
      } else {
        setNote('Done. You can now read theses from Firestore (editor tries cloud first).');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Admin: Seed data</h1>
      <p style={{ opacity: 0.85 }}>
        This seeds <strong>workspaces</strong> and <strong>theses</strong> (Atta/Carao) into Firestore if your rules allow it.
        It also keeps localStorage as fallback.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button
          type="button"
          onClick={seed}
          disabled={busy}
          style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc', cursor: 'pointer' }}
        >
          {busy ? 'Seeding…' : 'Seed Atta + Carao'}
        </button>
        <a href="/investors" style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}>
          Go to Investors
        </a>
      </div>
      <div style={{ marginBottom: 6, fontSize: 12, opacity: 0.7 }}>
        Firebase configured: <code>{configured ? 'yes' : 'no'}</code>
        {cfg?.projectId ? <> · projectId: <code>{cfg.projectId}</code></> : null}
      </div>
      {note && <div style={{ marginBottom: 10, opacity: 0.9 }}>{note}</div>}
      <div style={{ display: 'grid', gap: 6 }}>
        {results.map((r) => (
          <div key={r.id} style={{ fontSize: 13, opacity: r.ok ? 0.9 : 1, color: r.ok ? '#e6eefc' : '#fca5a5' }}>
            {r.ok ? '✓' : '✗'} {r.id}: {r.msg}
          </div>
        ))}
      </div>
      <hr style={{ margin: '16px 0', borderColor: 'rgba(255,255,255,0.12)' }} />
      <div style={{ opacity: 0.8, fontSize: 13, lineHeight: 1.6 }}>
        <div><strong>Dev rules tip</strong> (temporary): allow authenticated users to write <code>workspaces</code>, <code>theses</code>, and <code>investors</code>.</div>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
{`match /workspaces/{id} { allow read: if request.auth != null; allow write: if request.auth != null; }
match /theses/{id}     { allow read: if request.auth != null; allow write: if request.auth != null; }
match /investors/{id}  { allow read: if request.auth != null; allow write: if request.auth != null; }
match /startupProfiles/{id} { allow read, write: if request.auth != null; }`}
        </pre>
        <div>Deploy rules in the Firebase Console or CLI. Remove/lock down before prod.</div>
      </div>
    </AppShell>
  );
}
