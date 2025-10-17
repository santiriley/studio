import { isFirebaseConfigured } from '@/lib/env';
import { getDb } from '@/lib/firebase';
import { SEED_WORKSPACES } from '@/lib/seeds';
import type { Workspace } from '@/lib/thesis-engine';

export async function fetchWorkspaces(): Promise<Workspace[]> {
  // Prefer Firestore if configured; otherwise seeds.
  try {
    if (!isFirebaseConfigured()) return SEED_WORKSPACES;
    const db = await getDb();
    if (!db) return SEED_WORKSPACES;
    const { collection, getDocs } = await import('firebase/firestore');
    const snap = await getDocs(collection(db, 'workspaces'));
    const list: Workspace[] = [];
    snap.forEach((d) => {
      const data = d.data() as Workspace;
      list.push({ id: d.id, name: data.name, primaryColor: data.primaryColor, logoUrl: data.logoUrl });
    });
    return list.length ? list : SEED_WORKSPACES;
  } catch {
    return SEED_WORKSPACES;
  }
}
