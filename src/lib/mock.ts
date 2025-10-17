// Mock data for dashboard only. TODO: replace with Firestore/Functions.
import { NewsCluster, Investor, Thesis, OpenCall } from './types';
export const mockNews: NewsCluster[] = [
  {
    id: 'c1',
    topic: 'LatAm Climate Tech',
    items: [
      { id: 'n1', title: 'Costa Rica ag-waste valorization grows', source: 'MockWire', url: '#' },
      { id: 'n2', title: 'Impact funds eye the “missing middle”', source: 'MockWire', url: '#' },
    ],
  },
  {
    id: 'c2',
    topic: 'Seed Rounds — Central America',
    items: [{ id: 'n3', title: 'Guatemala fintech raises $2.5M', source: 'MockWire', url: '#' }],
  },
];

// --- Mock theses & investors for Founder Mode v1 ---
// Seeds are EDITABLE later in Firestore; these are safe stubs for demo.

const ATTAMCF1_THESIS: Thesis = {
  id: 'th-atta-mcf1',
  name: 'Atta Impact Capital — MCF1',
  geos: ['Costa Rica', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Panama', 'Belize', 'Southern Mexico'],
  sectors: ['Climate', 'Circular Economy', 'AgTech', 'Waste-to-Value', 'Fintech (impact)'],
  stages: ['Pre-Seed', 'Seed', 'Pre-Series A'],
  checkSize: { min: 100_000, max: 750_000, currency: 'USD' },
  exclusions: [],
  exceptions: ['Mission-aligned funds outside geo with clear Mesoamerica impact'],
  weights: { geo: 1, sector: 1, stage: 1, check: 1 },
};

const CARAO_THESIS: Thesis = {
  id: 'th-carao-core',
  name: 'Carao Ventures — Core',
  geos: ['Costa Rica', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Panama', 'Dominican Republic', 'Paraguay', 'Ecuador', 'Bolivia', 'Uruguay'],
  sectors: ['SaaS', 'Fintech', 'Climate', 'Marketplaces'],
  stages: ['Pre-Seed', 'Seed', 'Pre-Series A'],
  checkSize: { min: 150_000, max: 1_500_000, currency: 'USD' },
  exclusions: ['Deep hardware (CapEx heavy) unless exceptional'],
  exceptions: ['US-incorporated with LatAm founders & ops in target geography'],
  weights: { geo: 1, sector: 1, stage: 1, check: 1 },
};

export const mockInvestors: Investor[] = [
  { id: 'inv-atta', name: 'Atta Impact Capital (MCF1)', thesis: ATTAMCF1_THESIS, logoUrl: '', workspaceId: 'ws-atta' },
  { id: 'inv-carao', name: 'Carao Ventures', thesis: CARAO_THESIS, logoUrl: '', workspaceId: 'ws-carao' },
  // Simple generics to reach 10 options
  {
    id: 'inv-mock-1',
    name: 'Pacific Seed',
    thesis: { id: 'th-m1', name: 'Pacific Seed', geos: ['Costa Rica', 'Panama'], sectors: ['Fintech', 'SaaS'], stages: ['Seed'], checkSize: { min: 200_000, max: 800_000, currency: 'USD' } },
  },
  {
    id: 'inv-mock-2',
    name: 'Andes Climate',
    thesis: { id: 'th-m2', name: 'Andes Climate', geos: ['Ecuador', 'Peru', 'Bolivia'], sectors: ['Climate', 'AgTech'], stages: ['Pre-Seed', 'Seed'], checkSize: { min: 100_000, max: 500_000, currency: 'USD' } },
  },
  {
    id: 'inv-mock-3',
    name: 'Isthmus Capital',
    thesis: { id: 'th-m3', name: 'Isthmus Capital', geos: ['Guatemala', 'Honduras', 'El Salvador', 'Nicaragua'], sectors: ['Marketplaces', 'Fintech'], stages: ['Seed', 'Pre-Series A'], checkSize: { min: 250_000, max: 1_000_000, currency: 'USD' } },
  },
  {
    id: 'inv-mock-4',
    name: 'Rainforest Ventures',
    thesis: { id: 'th-m4', name: 'Rainforest', geos: ['Costa Rica'], sectors: ['Climate', 'Waste-to-Value'], stages: ['Pre-Seed', 'Seed'], checkSize: { min: 50_000, max: 250_000, currency: 'USD' } },
  },
  {
    id: 'inv-mock-5',
    name: 'Small Markets Fund',
    thesis: { id: 'th-m5', name: 'Small Markets', geos: ['Uruguay', 'Paraguay', 'Bolivia', 'Dominican Republic'], sectors: ['SaaS', 'Climate'], stages: ['Seed'], checkSize: { min: 150_000, max: 600_000, currency: 'USD' } },
  },
  {
    id: 'inv-mock-6',
    name: 'Gulf of Nicoya Partners',
    thesis: { id: 'th-m6', name: 'GoN Partners', geos: ['Costa Rica'], sectors: ['Fintech', 'SaaS', 'Marketplaces'], stages: ['Pre-Seed', 'Seed'], checkSize: { min: 100_000, max: 400_000, currency: 'USD' } },
  },
  {
    id: 'inv-mock-7',
    name: 'Meso Impact Angels',
    thesis: { id: 'th-m7', name: 'MIA', geos: ['Mesoamerica', 'Southern Mexico'], sectors: ['Climate', 'AgTech', 'Marketplaces'], stages: ['Pre-Seed'], checkSize: { min: 25_000, max: 150_000, currency: 'USD' } },
  },
  {
    id: 'inv-mock-8',
    name: 'Central Seed Co.',
    thesis: { id: 'th-m8', name: 'Central Seed', geos: ['Central America'], sectors: ['SaaS', 'Fintech'], stages: ['Pre-Seed', 'Seed'], checkSize: { min: 75_000, max: 300_000, currency: 'USD' } },
  },
];

export const mockOpenCalls: OpenCall[] = [
  {
    id: 'oc-1',
    org: 'Venture Scout',
    title: 'LatAm Climate Seed — Office Hours',
    description: 'Weekly 1:1s for founders in climate, ag-waste, and circular economy.',
    applyUrl: '#',
    deadline: undefined,
  },
  {
    id: 'oc-2',
    org: 'Impact Angels CR',
    title: 'Costa Rica Angel Office Hours',
    description: 'Pitch feedback and warm intro exploration with local angels.',
    applyUrl: '#',
    deadline: '2025-12-31',
  },
  {
    id: 'oc-3',
    org: 'Carao Ventures',
    title: 'Carao Open Calls — Smaller Markets',
    description: 'Pre-Seed/Seed in smaller LATAM markets; US geo exception case-by-case.',
    applyUrl: '#',
    deadline: '2025-11-30',
  },
];
