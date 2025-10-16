import AppShell from '@/components/app-shell';
import { rankInvestors } from '@/lib/match';
import { mockInvestors } from '@/lib/mock';
import { MatchResult, StartupProfile } from '@/lib/types';

export const dynamic = 'force-dynamic';

type SP = { [key: string]: string | string[] | undefined };

function fromSearchParams(searchParams: SP): StartupProfile {
  const get = (k: string) => {
    const v = searchParams?.[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const desired = get('desiredCheckSize');
  return {
    id: 'sp-temp', // TODO: replace with Firestore id when wired
    name: get('name') || 'Unnamed Startup',
    country: get('country'),
    sector: get('sector'),
    stage: get('stage'),
    desiredCheckSize: desired ? Number(desired) : undefined,
    links: { website: get('website'), deckUrl: get('deckUrl') },
  };
}

function Chip({ verdict, text }: { verdict: 'match' | 'warning' | 'miss'; text: string }) {
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
    <span style={{ padding: '4px 8px', borderRadius: 999, border, background: bg, fontSize: 12 }}>
      {verdict === 'match' ? '✓ ' : verdict === 'warning' ? '! ' : '✗ '} {text}
    </span>
  );
}

export default function MatchPage({ searchParams }: { searchParams?: SP }) {
  const startup = fromSearchParams(searchParams ?? {});
  const results: MatchResult[] = rankInvestors(startup, mockInvestors);

  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Matches</h1>
      <section style={{ marginBottom: 16 }}>
        <div style={{ opacity: 0.8 }}>
          <div><strong>Startup:</strong> {startup.name}</div>
          <div><strong>Country:</strong> {startup.country ?? '—'} · <strong>Sector:</strong> {startup.sector ?? '—'} · <strong>Stage:</strong> {startup.stage ?? '—'} · <strong>Ticket:</strong> {startup.desiredCheckSize ?? '—'}</div>
        </div>
      </section>
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
                <Chip key={i} verdict={reason.verdict} text={reason.label} />
              ))}
            </div>
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