// Centralized Firebase access (client). Import SDKs lazily & only on the client.
import { getFirebaseWebConfig } from '@/lib/env';

let _app: unknown | null = null;
let _db: unknown | null = null;

export async function getClientApp() {
  if (typeof window === 'undefined') return null;
  const cfg = getFirebaseWebConfig();
  if (!cfg) return null;
  const { initializeApp, getApps } = await import('firebase/app');
  if (!_app) _app = getApps().length ? getApps()[0] : initializeApp(cfg);
  return _app as unknown;
}

export async function getDb() {
  if (typeof window === 'undefined') return null;
  if (_db) return _db as unknown;
  const app = await getClientApp();
  if (!app) return null;
  try {
    // In restrictive networks, long-polling is more reliable than streaming fetch.
    const { initializeFirestore } = await import('firebase/firestore');
    _db = initializeFirestore(app as any, {
      experimentalForceLongPolling: true,
      useFetchStreams: false,
    });
  } catch {
    // If Firestore was already initialized elsewhere, just grab the default.
    const { getFirestore } = await import('firebase/firestore');
    _db = getFirestore();
  }
  return _db as unknown;
}

export async function getAuthClient() {
  const app = await getClientApp();
  if (!app) return null;
  const { getAuth, GoogleAuthProvider, signInWithPopup, signOut } = await import('firebase/auth');
  return { auth: getAuth(), GoogleAuthProvider, signInWithPopup, signOut };
}
