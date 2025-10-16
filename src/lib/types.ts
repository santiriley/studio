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
