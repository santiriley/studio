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
        const docRef = await addDoc(collection(db as any, 'startupProfiles'), {
          ...input,
          createdAt: serverTimestamp(),
        });
        try { localStorage.setItem(LS_KEY(docRef.id), JSON.stringify({ id: docRef.id, ...input })); } catch {}
        try { localStorage.setItem(LAST_ID_KEY, docRef.id); } catch {}
        return docRef.id;
      }
    }
  } catch {}
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
          const record = { id, ...data };
          try { localStorage.setItem(LS_KEY(id), JSON.stringify(record)); } catch {}
          return record;
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
    if (!ac) return undefined;
    return ac.auth.currentUser?.uid ?? undefined;
  } catch { return undefined; }
}

export function getLastStartupProfileId(): string | null {
  try { return localStorage.getItem(LAST_ID_KEY); } catch { return null; }
}
