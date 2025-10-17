
import { isFirebaseConfigured } from '@/lib/env';
import { getDb } from '@/lib/firebase';
import { mockInvestors } from '@/lib/mock';
import type { Company as CompanyType, Investor, KanbanStage, Thesis } from '@/lib/types';

// Last data source used by fetchInvestorsForWorkspace (for UI hints).
let _investorsLastSource: 'firestore' | 'mock' = 'mock';
export function getInvestorsLastSource() { return _investorsLastSource; }

type InvestorDoc = {
  id: string;
  name: string;
  logoUrl?: string;
  workspaceId?: string;
  thesisDocId?: string; // ws-<id>-thesis
};

async function hydrateInvestorWithThesis(
  db: any,
  inv: InvestorDoc
): Promise<Investor> {
  // Default to mocks if no thesisDocId is present
  if (!db || !inv.thesisDocId) {
    const fallback = mockInvestors.find((m) => m.id === inv.id);
    if (fallback) return fallback;
    // last resort: empty thesis
    const empty: Thesis = { id: inv.thesisDocId ?? `thesis-${inv.id}`, name: `${inv.name} — Thesis` };
    return { id: inv.id, name: inv.name, logoUrl: inv.logoUrl, workspaceId: inv.workspaceId, thesis: empty };
  }
  const { doc, getDoc } = await import('firebase/firestore');
  const snap = await getDoc(doc(db, 'theses', inv.thesisDocId));
  const thesis = (snap.exists() ? (snap.data() as Thesis) : ({ id: inv.thesisDocId, name: `${inv.name} — Thesis` } as Thesis));
  return { id: inv.id, name: inv.name, logoUrl: inv.logoUrl, workspaceId: inv.workspaceId, thesis };
}

export async function fetchInvestorsForWorkspace(workspaceId?: string | null): Promise<Investor[]> {
  try {
    if (!isFirebaseConfigured()) {
      _investorsLastSource = 'mock';
      // Fallback to mocks filtered by workspace tag (if any)
      return mockInvestors.filter(i => !workspaceId || !i.workspaceId || i.workspaceId === workspaceId);
    }
    const db = await getDb();
    if (!db) {
      _investorsLastSource = 'mock';
      return mockInvestors.filter(i => !workspaceId || !i.workspaceId || i.workspaceId === workspaceId);
    }
    const { collection, getDocs, query, where } = await import('firebase/firestore');
    const baseCol = collection(db, 'investors');
    const q = workspaceId ? query(baseCol, where('workspaceId', '==', workspaceId)) : baseCol;
    const snap = await getDocs(q);
    const docs: InvestorDoc[] = [];
    snap.forEach((d) => {
      const data = d.data() as InvestorDoc;
      docs.push({ id: d.id, name: data.name, logoUrl: data.logoUrl, workspaceId: data.workspaceId, thesisDocId: data.thesisDocId });
    });
    if (!docs.length) {
      _investorsLastSource = 'mock';
      return mockInvestors.filter(i => !workspaceId || !i.workspaceId || i.workspaceId === workspaceId);
    }
    const out = await Promise.all(docs.map((d) => hydrateInvestorWithThesis(db, d)));
    _investorsLastSource = 'firestore';
    return out;
  } catch {
    _investorsLastSource = 'mock';
    return mockInvestors.filter(i => !workspaceId || !i.workspaceId || i.workspaceId === workspaceId);
  }
}


// The code from the old data.ts is preserved below

export type Company = { name: string; country?: string; sector?: string; score?: number; stage?: string };

export async function getCompanies(): Promise<CompanyType[]> {
  // In a real app, you'd fetch this from a database.
  // For now, we'll use the mock data.
  return Promise.resolve([
    {
      id: 'comp_001',
      name: 'EcoSolutions',
      description: 'Developing biodegradable plastics from algae.',
      logoUrl: '/placeholders/logo1.png',
      score: 85,
      stage: 'Review',
      metadata: { recency: 0.9, momentum: 0.8, team: 0.7, idea: 0.9 },
    },
    {
      id: 'comp_002',
      name: 'FinTech Innovations',
      description: 'A mobile-first banking platform for the unbanked.',
      logoUrl: '/placeholders/logo2.png',
      score: 78,
      stage: 'New',
      metadata: { recency: 0.7, momentum: 0.8, team: 0.8, idea: 0.7 },
    },
    {
      id: 'comp_003',
      name: 'HealthWell',
      description: 'AI-powered diagnostics for early disease detection.',
      logoUrl: '/placeholders/logo3.png',
      score: 92,
      stage: 'Contacted',
      metadata: { recency: 0.8, momentum: 0.9, team: 0.9, idea: 0.9 },
    },
    {
      id: 'comp_004',
      name: 'EduSphere',
      description: 'Online learning platform with personalized curriculums.',
      logoUrl: '/placeholders/logo4.png',
      score: 75,
      stage: 'New',
      metadata: { recency: 0.6, momentum: 0.7, team: 0.8, idea: 0.8 },
    },
    {
      id: 'comp_005',
      name: 'MarketGrid',
      description: 'Decentralized marketplace for local artisans.',
      logoUrl: '/placeholders/logo5.png',
      score: 81,
      stage: 'Review',
      metadata: { recency: 0.9, momentum: 0.7, team: 0.8, idea: 0.8 },
    },
  ]);
}

export async function getCompaniesByStages(): Promise<Record<KanbanStage, CompanyType[]>> {
  const all = await getCompanies();
  const byStage = all.reduce((acc, company) => {
    const stage = company.stage || 'New';
    if (!acc[stage]) {
      acc[stage] = [];
    }
    acc[stage].push(company);
    return acc;
  }, {} as Record<KanbanStage, CompanyType[]>);

  // Ensure all defined stages exist, even if empty
  const KANBAN_STAGES: KanbanStage[] = ['New', 'Review', 'Contacted', 'Funded', 'Rejected'];
  for (const stage of KANBAN_STAGES) {
    if (!byStage[stage]) {
      byStage[stage] = [];
    }
  }

  return byStage;
}
