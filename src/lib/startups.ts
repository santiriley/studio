import { isFirebaseConfigured } from '@/lib/env';
import { getDb, getAuthClient } from '@/lib/firebase';
import type { StartupProfile } from '@/lib/types';

const LS_KEY = (id: string) => `vs:startupProfile:${id}`;
const LAST_ID_KEY = 'vs:lastStartupProfileId';

export async function saveStartupProfile(input: Omit<StartupProfile, 'id'>): Promise<string> {
  try {
    if (isFirebaseConfigured()) {
      const db = await getDb();
      if (db) {
        const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
        const ref = await addDoc(collection(db as any, 'startupProfiles'), { ...input, createdAt: serverTimestamp() });
        // cache locally too
        try { localStorage.setItem(LS_KEY(ref.id), JSON.stringify({ id: ref.id, ...input })); } catch {}
        try { localStorage.setItem(LAST_ID_KEY, ref.id); } catch {}
        return ref.id;
      }
    }
  } catch { /* fall through to local */ }

  const localId = `local_${Date.now()}`;
  const record: StartupProfile = { id: localId, ...input, createdAt: Date.now() };
  try {
    localStorage.setItem(LS_KEY(localId), JSON.stringify(record));
    localStorage.setItem(LAST_ID_KEY, localId);
  } catch {}
  return localId;
}

export async function loadStartupProfile(id: string): Promise<StartupProfile | null> {
  try {
    if (isFirebaseConfigured()) {
      const db = await getDb();
      if (db) {
        const { doc, getDoc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db as any, 'startupProfiles', id));
        if (snap.exists()) {
          const data = snap.data() as StartupProfile;
          const rec = { id, ...data };
          try { localStorage.setItem(LS_KEY(id), JSON.stringify(rec)); } catch {}
          return rec;
        }
      }
    }
  } catch {}
  try {
    const raw = localStorage.getItem(LS_KEY(id));
    if (raw) return JSON.parse(raw) as StartupProfile;
  } catch {}
  return null;
}

export async function currentUserId(): Promise<string | undefined> {
  try {
    const ac = await getAuthClient();
    return ac ? ac.auth.currentUser?.uid ?? undefined : undefined;
  } catch { return undefined; }
}

export function getLastStartupProfileId(): string | null {
  try { return localStorage.getItem(LAST_ID_KEY); } catch { return null; }
}
