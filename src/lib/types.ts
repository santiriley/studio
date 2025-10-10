export type Company = {
  id: string;
  name: string;
  domain: string;
  score: number;
  description: string;
  stage: KanbanStage;
  logoUrl: string;
  metadata: {
    recency: number;
    momentum: number;
    team: number;
    idea: number;
  };
};

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  source: string;
  publishedAt: string;
};

export type Cluster = {
  id: string;
  canonicalArticle: NewsArticle;
  articles: NewsArticle[];
  summary: string | null;
};

export type KanbanStage = 'New' | 'Review' | 'Contacted' | 'Rejected' | 'Funded';

export const KANBAN_STAGES: KanbanStage[] = ['New', 'Review', 'Contacted', 'Funded', 'Rejected'];
