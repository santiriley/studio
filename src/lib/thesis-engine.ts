// VC Thesis Engine — skeleton types + stub functions (no Firestore yet).
// TODO: Replace mocks with Firestore reads/writes once envs are wired.

import { MatchReason, StartupProfile, Thesis } from '@/lib/types';
import { evaluateVCForStartup } from '@/lib/match';

// Collections (types-only for this pass)
export type Workspace = {
  id: string;
  name: string;
  primaryColor?: string;
  logoUrl?: string;
};

export type ThesisDoc = {
  id: string;
  workspaceId: string;
  thesis: Thesis;
  updatedAt: number;
};

export type WorkspaceCompany = {
  id: string;
  workspaceId: string;
  company: StartupProfile;
  // Future audit fields for scraping policy / uploads:
  sourceUrl?: string;
  sourceHash?: string;
  extractionConfidence?: number; // 0-1
  humanReviewed?: boolean;
};

export type WorkspaceFit = {
  id: string;
  workspaceId: string;
  companyId: string;
  thesisId: string;
  score: number; // 0-100
  reasons: MatchReason[];
  createdAt: number;
};

// --- Function stubs (no deploy; pure TS) ---
export function evaluateCompanyForThesis(
  company: StartupProfile,
  thesis: Thesis
): { score: number; reasons: MatchReason[] } {
  // Reuse the public matching logic; in the future this will live in a CF.
  return evaluateVCForStartup(company, thesis);
}

export function evaluateAllForThesis(
  thesis: Thesis,
  companies: WorkspaceCompany[],
  workspaceId: string
): WorkspaceFit[] {
  const now = Date.now();
  return companies.map((wc, i) => {
    const { score, reasons } = evaluateCompanyForThesis(wc.company, thesis);
    return {
      id: `fit-${i}-${now}`,
      workspaceId,
      companyId: wc.id,
      thesisId: thesis.id,
      score,
      reasons,
      createdAt: now,
    };
  });
}
