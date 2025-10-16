// Mock data for dashboard only. TODO: replace with Firestore/Functions.
import { NewsCluster } from './types';
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
