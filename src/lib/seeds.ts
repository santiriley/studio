// Editable seeds for workspaces & theses (no hard-coding later; just a bootstrap).
import { Thesis } from '@/lib/types';
import { Workspace, ThesisDoc } from '@/lib/thesis-engine';

export const SEED_WORKSPACES: Workspace[] = [
  { id: 'ws-atta', name: 'Atta Impact Capital', primaryColor: '#1b3a2f' },
  { id: 'ws-carao', name: 'Carao Ventures', primaryColor: '#1c2f5a' },
];

export const SEED_THESES: ThesisDoc[] = [
  {
    id: 'ws-atta-thesis',
    workspaceId: 'ws-atta',
    thesis: {
      id: 'th-atta-mcf1',
      name: 'Atta Impact Capital — MCF1',
      geos: ['Costa Rica', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Panama', 'Belize', 'Southern Mexico'],
      sectors: ['Climate', 'Circular Economy', 'AgTech', 'Waste-to-Value', 'Fintech (impact)'],
      stages: ['Pre-Seed', 'Seed', 'Pre-Series A'],
      checkSize: { min: 100_000, max: 750_000, currency: 'USD' },
      exclusions: [],
      exceptions: ['Mission-aligned funds outside geo with clear Mesoamerica impact'],
      weights: { geo: 1, sector: 1, stage: 1, check: 1 },
    } as Thesis,
    updatedAt: Date.now(),
  },
  {
    id: 'ws-carao-thesis',
    workspaceId: 'ws-carao',
    thesis: {
      id: 'th-carao-core',
      name: 'Carao Ventures — Core',
      geos: ['Costa Rica', 'Guatemala', 'El Salvador', 'Honduras', 'Nicaragua', 'Panama', 'Dominican Republic', 'Paraguay', 'Ecuador', 'Bolivia', 'Uruguay'],
      sectors: ['SaaS', 'Fintech', 'Climate', 'Marketplaces'],
      stages: ['Pre-Seed', 'Seed', 'Pre-Series A'],
      checkSize: { min: 150_000, max: 1_500_000, currency: 'USD' },
      exclusions: ['Deep hardware (CapEx heavy) unless exceptional'],
      exceptions: ['US-incorporated with LatAm founders & ops in target geography'],
      weights: { geo: 1, sector: 1, stage: 1, check: 1 },
    } as Thesis,
    updatedAt: Date.now(),
  },
];