export type FirebaseWebConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  databaseURL?: string;
};

/**
 * Returns Firebase web config if available.
 * Prefers App Hosting's FIREBASE_WEBAPP_CONFIG JSON.
 * Falls back to NEXT_PUBLIC_* envs for local dev.
 */
export function getFirebaseWebConfig(): FirebaseWebConfig | null {
  // App Hosting injects this at build time (availability: BUILD)
  const raw = process.env.FIREBASE_WEBAPP_CONFIG;
  if (raw && raw.trim() !== '') {
    try {
      return JSON.parse(raw) as FirebaseWebConfig;
    } catch {
      // ignore and fall through to NEXT_PUBLIC_* fallback
    }
  }

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!apiKey) return null;

  return {
    apiKey,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  };
}

export const isFirebaseConfigured = (): boolean => getFirebaseWebConfig() !== null;
