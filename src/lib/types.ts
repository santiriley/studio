export type NewsItem = { id: string; title: string; source: string; url: string };
export type NewsCluster = { id: string; topic: string; items: NewsItem[] };

export type Thesis = {
  id: string;
  name: string;
  geos?: string[];
  sectors?: string[];
  stages?: string[];
  checkSize?: { min?: number; max?: number; currency?: string };
  exclusions?: string[];
  exceptions?: string[];
  weights?: Partial<Record<'geo' | 'sector' | 'stage' | 'check', number>>;
};

export type Investor = { id: string; name: string; thesis: Thesis; logoUrl?: string };

export type StartupProfile = {
  id: string;
  name: string;
  country?: string;
  sector?: string;
  stage?: string;
  desiredCheckSize?: number;
  links?: { website?: string; deckUrl?: string };
};

// --- Pipeline/Kanban (mock default) ---
// TODO: Replace with workspace-configurable stages when wiring Firestore.
export const KANBAN_STAGES = [
  'New',
  'Review',
  'Contacted',
  'Funded',
  'Rejected',
] as const;
export type KanbanStage = (typeof KANBAN_STAGES)[number];

export type Company = {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  score: number;
  stage: KanbanStage;
  metadata: {
    recency: number;
    momentum: number;
    team: number;
    idea: number;
  };
};

export type Article = {
  id: string;
  title: string;
  url: string;
  excerpt: string;
  source: string;
};

export type Cluster = {
  id: string;
  canonicalArticle: Article;
  articles: Article[];
  summary?: string;
};

// --- Matching model ---
export type MatchReasonCode = 'sector' | 'stage' | 'geo' | 'ticket';
export type MatchVerdict = 'match' | 'warning' | 'miss';
export type MatchReasonMeta = {
  thesisField?: string;
  thesisValue?: string | number | string[] | undefined;
  startupField?: string;
  startupValue?: string | number | undefined;
};
export type MatchReason = {
  code: MatchReasonCode;
  verdict: MatchVerdict; // 'match' ✓, 'warning' !, 'miss' ✗
  label: string; // human-readable explanation
  meta?: MatchReasonMeta; // optional: used for tooltips on UI
};

export type MatchResult = {
  investor: Investor;
  score: number; // 0–100
  reasons: MatchReason[];
  contactCTA: string;
};

// --- Programs / Open Calls ---
export type Program = {
  id: string;
  org: string;
  title: string;
  description?: string;
  applyUrl: string;
  deadline?: string; // ISO date
};
export type OpenCall = Program;
