
'use client';
import AppShell from '@/components/app-shell';
import { rankInvestors } from '@/lib/match';
import { MatchResult, StartupProfile, MatchReason } from '@/lib/types';
import { useWorkspace } from '@/context/workspace';
import { fetchInvestorsForWorkspace, getInvestorsLastSource } from '@/lib/data';
import { mockInvestors } from '@/lib/mock';
import * as React from 'react';
import { loadStartupProfile } from '@/lib/startups';

export const dynamic = 'force-dynamic';

type SP = { [k: string]: string | string[] | undefined };

function fromSearchParams(searchParams: SP): StartupProfile {
  const get = (k: string) => {
    const v = searchParams?.[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const desired = get('desiredCheckSize');
  return {
    id: 'ad-hoc',
    name: get('name'),
    country: get('country'),
    sector: get('sector'),
    stage: get('stage'),
    desiredCheckSize: desired ? Number(desired) : undefined,
    website: get('website'),
    deckUrl: get('deckUrl'),
  };
}

function tooltip(reason: MatchReason): string | undefined {
  if (!reason.meta) return undefined;
  const { thesisField, thesisValue, startupField, startupValue } = reason.meta;
  const tv = Array.isArray(thesisValue) ? thesisValue.join(', ') : typeof thesisValue === 'object' ? JSON.stringify(thesisValue) : String(thesisValue ?? '—');
  const sv = String(startupValue ?? '—');
  return `Thesis ${thesisField}: ${tv} • Startup ${startupField}: ${sv}`;
}

function Chip({ verdict, text, title }: { verdict: 'match' | 'warning' | 'miss'; text: string; title?: string }) {
  const bg =
    verdict === 'match'
      ? 'rgba(52,211,153,0.15)'
      : verdict === 'warning'
      ? 'rgba(251,191,36,0.15)'
      : 'rgba(239,68,68,0.15)';
  const border =
    verdict === 'match'
      ? '1px solid rgba(52,211,153,0.4)'
      : verdict === 'warning'
      ? '1px solid rgba(251,191,36,0.4)'
      : '1px solid rgba(239,68,68,0.4)';
  return (
    <span title={title} style={{ padding: '4px 8px', borderRadius: 999, border, background: bg, fontSize: 12 }}>
      {verdict === 'match' ? '✓ ' : verdict === 'warning' ? '! ' : '✗ '} {text}
    </span>
  );
}

export default function MatchPage({ searchParams }: { searchParams?: SP }) {
  const { current } = useWorkspace();
  const [startup, setStartup] = React.useState<StartupProfile>(fromSearchParams(searchParams ?? {}));
  const [results, setResults] = React.useState<MatchResult[]>([]);
  const [source, setSource] = React.useState<'firestore' | 'mock'>('mock');
  const [loading, setLoading] = React.useState<boolean>(true);
  const [copied, setCopied] = React.useState(false);

  // If ?id= is present, load the saved profile
  React.useEffect(() => {
    const id = typeof searchParams?.id === 'string' ? searchParams!.id : Array.isArray(searchParams?.id) ? searchParams!.id[0] : undefined;
    let alive = true;
    (async () => {
      setLoading(true);
      if (id) {
        const data = await loadStartupProfile(id);
        if (alive && data) setStartup(data);
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.id]);


  React.useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const investors = await fetchInvestorsForWorkspace(current?.id);
        const ranked = rankInvestors(startup, investors);
        if (alive) {
          setResults(ranked);
          setSource(getInvestorsLastSource());
        }
      } catch {
        // hard fallback to mocks
        const fallback = mockInvestors.filter(i => !current?.id || !i.workspaceId || i.workspaceId === current.id);
        const ranked = rankInvestors(startup, fallback);
        if (alive) {
          setResults(ranked);
          setSource('mock');
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [current?.id, startup.id, startup.country, startup.sector, startup.stage, startup.desiredCheckSize]);

  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Matches</h1>
      <section style={{ marginBottom: 16 }}>
        <div style={{ opacity: 0.8 }}>
          <div><strong>Startup:</strong> {startup.name}</div>
          <div><strong>Country:</strong> {startup.country ?? '—'} · <strong>Sector:</strong> {startup.sector ?? '—'} · <strong>Stage:</strong> {startup.stage ?? '—'} · <strong>Ticket:</strong> {startup.desiredCheckSize ?? '—'}</div>
        </div>
      </section>
      <div style={{ display:'flex', alignItems:'center', gap:8, fontSize: 12, opacity: 0.8, margin: '4px 0 12px' }}>
        <span>Data source: <code>{source}</code></span>
        {startup?.id && startup.id !== 'ad-hoc' && <span>· Startup ID: <strong>{startup.id}</strong></span>}
        <button onClick={() => { navigator.clipboard.writeText(window.location.href).then(()=>{ setCopied(true); setTimeout(()=>setCopied(false),1200); }); }}
          style={{ padding:'4px 8px', borderRadius:8, border:'1px solid rgba(255,255,255,0.16)', background:'transparent', color:'#e6eefc', cursor:'pointer' }}>
          {copied ? 'Link copied!' : 'Copy share link'}
        </button>
      </div>
      {loading && <div style={{ opacity: 0.8, marginBottom: 12 }}>Loading…</div>}
      <div style={{ display: 'grid', gap: 12 }}>
        {results.map((r) => (
          <div key={r.investor.id} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: 16, background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
              <div>
                <strong>{r.investor.name}</strong>
                <div style={{ opacity: 0.7, fontSize: 13 }}>{r.investor.thesis.name}</div>
              </div>
              <div style={{ fontVariantNumeric: 'tabular-nums' }}>
                <span style={{ fontSize: 20 }}>{r.score}</span>
                <span style={{ opacity: 0.7, marginLeft: 4 }}>/100</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8 }}>
              {r.reasons.map((reason, i) => (
                <Chip key={i} verdict={reason.verdict} text={reason.label} title={tooltip(reason)} />
              ))}
            </div>
            <details style={{ marginTop: 10 }}>
              <summary style={{ cursor: 'pointer', opacity: 0.85 }}>Thesis snapshot</summary>
              <div style={{ marginTop: 8, fontSize: 13, opacity: 0.9, lineHeight: 1.6 }}>
                <div><strong>Geos:</strong> {r.investor.thesis.geos?.join(', ') ?? '—'}</div>
                <div><strong>Sectors:</strong> {r.investor.thesis.sectors?.join(', ') ?? '—'}</div>
                <div><strong>Stages:</strong> {r.investor.thesis.stages?.join(', ') ?? '—'}</div>
                <div><strong>Check size:</strong> {r.investor.thesis.checkSize?.min ?? '—'}–{r.investor.thesis.checkSize?.max ?? '—'} {r.investor.thesis.checkSize?.currency ?? ''}</div>
                {r.investor.thesis.exceptions?.length ? <div><strong>Exceptions:</strong> {r.investor.thesis.exceptions.join(', ')}</div> : null}
                {r.investor.thesis.exclusions?.length ? <div><strong>Exclusions:</strong> {r.investor.thesis.exclusions.join(', ')}</div> : null}
              </div>
            </details>
            <div style={{ marginTop: 10 }}>
              <a
                href="#"
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', textDecoration: 'none', color: '#e6eefc' }}
              >
                {r.contactCTA}
              </a>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
