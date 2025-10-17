// Centralized Firebase access (client). Import SDKs lazily & only on the client.
import { getFirebaseWebConfig } from '@/lib/env';

let _app: unknown | null = null;

export async function getClientApp() {
  if (typeof window === 'undefined') return null;
  const cfg = getFirebaseWebConfig();
  if (!cfg) return null;
  const { initializeApp, getApps } = await import('firebase/app');
  if (!_app) _app = getApps().length ? getApps()[0] : initializeApp(cfg);
  return _app as unknown;
}

export async function getDb() {
  const app = await getClientApp();
  if (!app) return null;
  const { getFirestore } = await import('firebase/firestore');
  return getFirestore();
}

export async function getAuthClient() {
  const app = await getClientApp();
  if (!app) return null;
  const { getAuth, GoogleAuthProvider, signInWithPopup, signOut } = await import('firebase/auth');
  return { auth: getAuth(), GoogleAuthProvider, signInWithPopup, signOut };
}
