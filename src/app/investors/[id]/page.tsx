import AppShell from '@/components/app-shell';
import { mockInvestors } from '@/lib/mock';
import type { Thesis } from '@/lib/types';
import Editor from './thesis-editor';
import { thesisDocIdFor } from '@/lib/ids';
export const dynamic = 'force-dynamic';

function getInvestor(id: string) {
  return mockInvestors.find((i) => i.id === id) || null;
}

export default function InvestorDetailPage({ params }: { params: { id: string } }) {
  const investor = getInvestor(params.id);
  if (!investor) {
    return (
      <AppShell>
        <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Investor not found</h1>
        <a href="/investors" style={{ color: '#9ecbff' }}>Back to Investors</a>
      </AppShell>
    );
  }
  const seed: Thesis = investor.thesis;
  const thesisDocId = thesisDocIdFor({ investorId: investor.id, workspaceId: investor.workspaceId });
  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 6px' }}>{investor.name}</h1>
      {investor.workspaceId && (
        <div style={{ marginBottom: 8, fontSize: 12, opacity: 0.85 }}>
          Workspace: <code>{investor.workspaceId}</code> · Thesis doc: <code>{thesisDocId}</code>
        </div>
      )}
      <div style={{ opacity: 0.8, marginBottom: 14 }}>{seed.name}</div>
      <Editor thesisDocId={thesisDocId} seed={seed} />
      <div style={{ marginTop: 16 }}>
        <a href="/investors" style={{ color: '#9ecbff' }}>← Back to Investors</a>
      </div>
    </AppShell>
  );
}
