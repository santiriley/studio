'use client';
import * as React from 'react';
import type { Thesis } from '@/lib/types';
import { getDb } from '@/lib/firebase';
import { isFirebaseConfigured } from '@/lib/env';

type Props = {
  thesisDocId: string;
  seed: Thesis;
};

// localStorage key
const k = (id: string) => `thesis:${id}`;

function toCSV(arr?: string[]) { return (arr ?? []).join(', '); }
function fromCSV(s: string) {
  return s.split(',').map((t) => t.trim()).filter(Boolean);
}

export default function Editor({ thesisDocId, seed }: Props) {
  const [thesis, setThesis] = React.useState<Thesis>(seed);
  const [savedAt, setSavedAt] = React.useState<number | null>(null);
  const [cloudStatus, setCloudStatus] = React.useState<string>(''); // UI hint

  // Load from localStorage if present
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(k(thesisDocId));
      if (raw) {
        const parsed = JSON.parse(raw) as Thesis;
        setThesis(parsed);
        setSavedAt(parsed ? Date.now() : null);
      }
    } catch {}
  }, [thesisDocId]);

  // Try to load from Firestore if configured (read-only safe)
  React.useEffect(() => {
    (async () => {
      if (!isFirebaseConfigured()) return;
      const db = await getDb();
      if (!db) return;
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'theses', thesisDocId));
        if (snap.exists()) {
          const data = snap.data() as Thesis;
          setThesis(data);
          setCloudStatus('Loaded from cloud');
        }
      } catch (e) {
        // ignore and keep local
      }
    })();
  }, [thesisDocId]);

  const save = () => {
    try {
      localStorage.setItem(k(thesisDocId), JSON.stringify(thesis));
      setSavedAt(Date.now());
      setCloudStatus('Saved locally');
    } catch {
      setCloudStatus('Unable to save locally');
    }
    // Best-effort cloud write
    void (async () => {
      try {
        if (!isFirebaseConfigured()) return;
        const db = await getDb();
        if (!db) return;
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'theses', thesisDocId), thesis, { merge: true });
        setCloudStatus('Saved to cloud');
      } catch {
        // rules might block; keep it silent
      }
    })();
  };

  const reset = () => {
    setThesis(seed);
    try { localStorage.removeItem(k(thesisDocId)); } catch {}
  };

  const copyJSON = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(thesis, null, 2));
      alert('Copied thesis JSON to clipboard.');
    } catch {
      alert('Copy failed.');
    }
  };

  const onChange = (field: keyof Thesis, value: unknown) => {
    setThesis((t) => ({ ...t, [field]: value } as Thesis));
  };

  const onCheckSize = (minOrMax: 'min' | 'max' | 'currency', value: string) => {
    setThesis((t) => ({
      ...t,
      checkSize: {
        min: minOrMax === 'min' ? Number(value) || undefined : t.checkSize?.min,
        max: minOrMax === 'max' ? Number(value) || undefined : t.checkSize?.max,
        currency: minOrMax === 'currency' ? value || undefined : (t.checkSize?.currency),
      },
    }));
  };

  const onWeight = (key: 'geo' | 'sector' | 'stage' | 'check', value: string) => {
    const n = Number(value);
    setThesis((t) => ({
      ...t,
      weights: { ...(t.weights ?? {}), [key]: isNaN(n) ? undefined : n },
    }));
  };

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.03)' }}>
      <p style={{ marginTop: 0, opacity: 0.85 }}>
        <strong>Note:</strong> Saves to your browser; if Firebase is configured and rules allow, also saves to Firestore.
        {cloudStatus ? <span style={{ marginLeft: 8, opacity: 0.9 }}>· {cloudStatus}</span> : null}
      </p>
      <div style={{ display: 'grid', gap: 12, maxWidth: 800 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Thesis name</span>
          <input
            value={thesis.name}
            onChange={(e) => onChange('name', e.target.value)}
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Geographies (comma separated)</span>
          <input
            value={toCSV(thesis.geos)}
            onChange={(e) => onChange('geos', fromCSV(e.target.value))}
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Sectors (comma separated)</span>
          <input
            value={toCSV(thesis.sectors)}
            onChange={(e) => onChange('sectors', fromCSV(e.target.value))}
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Stages (comma separated)</span>
          <input
            value={toCSV(thesis.stages)}
            onChange={(e) => onChange('stages', fromCSV(e.target.value))}
            style={inputStyle}
          />
        </label>
        <fieldset style={fieldsetStyle}>
          <legend>Check size preference</legend>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(3, minmax(140px, 1fr))' }}>
            <input
              placeholder="Min"
              type="number"
              value={thesis.checkSize?.min ?? ''}
              onChange={(e) => onCheckSize('min', e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Max"
              type="number"
              value={thesis.checkSize?.max ?? ''}
              onChange={(e) => onCheckSize('max', e.target.value)}
              style={inputStyle}
            />
            <input
              placeholder="Currency (e.g., USD)"
              value={thesis.checkSize?.currency ?? ''}
              onChange={(e) => onCheckSize('currency', e.target.value)}
              style={inputStyle}
            />
          </div>
        </fieldset>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Exclusions (comma separated)</span>
          <input
            value={toCSV(thesis.exclusions)}
            onChange={(e) => onChange('exclusions', fromCSV(e.target.value))}
            style={inputStyle}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Exceptions (comma separated)</span>
          <input
            value={toCSV(thesis.exceptions)}
            onChange={(e) => onChange('exceptions', fromCSV(e.target.value))}
            style={inputStyle}
          />
        </label>
        <fieldset style={fieldsetStyle}>
          <legend>Weights (optional)</legend>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))' }}>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Geo</span>
              <input value={thesis.weights?.geo ?? ''} onChange={(e) => onWeight('geo', e.target.value)} style={inputStyle} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Sector</span>
              <input value={thesis.weights?.sector ?? ''} onChange={(e) => onWeight('sector', e.target.value)} style={inputStyle} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Stage</span>
              <input value={thesis.weights?.stage ?? ''} onChange={(e) => onWeight('stage', e.target.value)} style={inputStyle} />
            </label>
            <label style={{ display: 'grid', gap: 6 }}>
              <span>Check</span>
              <input value={thesis.weights?.check ?? ''} onChange={(e) => onWeight('check', e.target.value)} style={inputStyle} />
            </label>
          </div>
        </fieldset>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" onClick={save} style={btnStyle}>Save (local)</button>
          <button type="button" onClick={reset} style={btnStyle}>Reset to seed</button>
          <button type="button" onClick={copyJSON} style={btnStyle}>Copy JSON</button>
        </div>
        {savedAt && <div style={{ opacity: 0.7, fontSize: 12 }}>Last saved: {new Date(savedAt).toLocaleString()}</div>}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: 8,
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent',
  color: '#e6eefc',
};
const fieldsetStyle: React.CSSProperties = {
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 12,
  padding: 12,
};
const btnStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent',
  color: '#e6eefc',
  cursor: 'pointer',
};
