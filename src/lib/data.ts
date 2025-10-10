import type { Company, NewsArticle, Cluster, KanbanStage } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const getCompanyLogo = (index: number) => {
    const logos = PlaceHolderImages.filter(img => img.id.startsWith('company-logo-'));
    return logos[index % logos.length].imageUrl;
}

const companies: Company[] = [
  { id: '1', name: 'QuantumLeap AI', domain: 'qleap.ai', score: 92, description: 'Developing next-gen AI for quantum computing applications.', stage: 'Review', logoUrl: getCompanyLogo(0), metadata: { recency: 0.9, momentum: 0.8, team: 0.95, idea: 0.9 } },
  { id: '2', name: 'BioSynth', domain: 'biosynth.com', score: 88, description: 'Pioneering synthetic biology for sustainable materials.', stage: 'New', logoUrl: getCompanyLogo(1), metadata: { recency: 0.8, momentum: 0.85, team: 0.9, idea: 0.9 } },
  { id: '3', name: 'FintechFlow', domain: 'finflow.io', score: 85, description: 'A decentralized platform for cross-border payments.', stage: 'New', logoUrl: getCompanyLogo(2), metadata: { recency: 0.7, momentum: 0.9, team: 0.8, idea: 0.9 } },
  { id: '4', name: 'HealthGrid', domain: 'healthgrid.dev', score: 82, description: 'Secure data sharing network for healthcare providers.', stage: 'Contacted', logoUrl: getCompanyLogo(3), metadata: { recency: 0.85, momentum: 0.7, team: 0.8, idea: 0.85 } },
  { id: '5', name: 'EduVerse', domain: 'eduverse.co', score: 79, description: 'Immersive VR learning environments for K-12.', stage: 'Funded', logoUrl: getCompanyLogo(4), metadata: { recency: 0.6, momentum: 0.75, team: 0.8, idea: 0.9 } },
  { id: '6', name: 'AgriFuture', domain: 'agrifuture.farm', score: 75, description: 'Automated vertical farming solutions.', stage: 'Rejected', logoUrl: getCompanyLogo(5), metadata: { recency: 0.9, momentum: 0.6, team: 0.7, idea: 0.7 } },
];

const articles: NewsArticle[] = [
    { id: 'a1', title: 'QuantumLeap AI raises $50M Series B', excerpt: 'The quantum computing startup has secured a major funding round led by top VCs to scale their AI platform...', url: 'https://techcrunch.com/quantumleap', source: 'TechCrunch', publishedAt: '2024-07-20T10:00:00Z' },
    { id: 'a2', title: 'The race for quantum AI heats up as QuantumLeap shows promise', excerpt: 'With their recent breakthroughs, QuantumLeap AI is poised to become a leader in the nascent field of quantum artificial intelligence.', url: 'https://wired.com/quantum-ai-race', source: 'Wired', publishedAt: '2024-07-19T14:30:00Z' },
    { id: 'a3', title: 'BioSynth unveils revolutionary plastic alternative', excerpt: 'The biotech firm announced a new biodegradable material derived from algae that could replace single-use plastics.', url: 'https://www.sustainability.com/biosynth-plastic', source: 'Sustainability Today', publishedAt: '2024-07-21T09:00:00Z' },
    { id: 'a4', title: 'BioSynth\'s Green Innovation', excerpt: 'A deep dive into how BioSynth is creating the materials of the future.', url: 'https://www.forbes.com/biosynth', source: 'Forbes', publishedAt: '2024-07-21T11:00:00Z' },
    { id: 'a5', title: 'FintechFlow challenges SWIFT with new blockchain solution', excerpt: 'The startup claims their decentralized network can process international payments in seconds, not days.', url: 'https://www.coindesk.com/fintechflow-swift', source: 'CoinDesk', publishedAt: '2024-07-22T12:00:00Z' },
];

const clusters: Cluster[] = [
    { id: 'c1', canonicalArticle: articles[0], articles: [articles[0], articles[1]], summary: null },
    { id: 'c2', canonicalArticle: articles[2], articles: [articles[2], articles[3]], summary: 'BioSynth has developed a sustainable, algae-derived material to replace single-use plastics, marking a significant step in green innovation.' },
    { id: 'c3', canonicalArticle: articles[4], articles: [articles[4]], summary: null },
];

// Simulate API calls
export const getCompanies = async (): Promise<Company[]> => {
  return new Promise(resolve => setTimeout(() => resolve(companies), 200));
};

export const getCompany = async (id: string): Promise<Company | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(companies.find(c => c.id === id)), 200));
};

export const getClusters = async (): Promise<Cluster[]> => {
  return new Promise(resolve => setTimeout(() => resolve(clusters), 200));
};

export const getCompaniesByStage = async (stage: KanbanStage): Promise<Company[]> => {
    return new Promise(resolve => setTimeout(() => resolve(companies.filter(c => c.stage === stage)), 200));
};

export const getCompaniesByStages = async (): Promise<Record<KanbanStage, Company[]>> => {
    const companiesByStage = {} as Record<KanbanStage, Company[]>;
    for (const company of companies) {
        if (!companiesByStage[company.stage]) {
            companiesByStage[company.stage] = [];
        }
        companiesByStage[company.stage].push(company);
    }
    return new Promise(resolve => setTimeout(() => resolve(companiesByStage), 200));
}
