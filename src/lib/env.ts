export type FirebaseWeb-Config = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  databaseURL?: string;
};

// Prefer the App Hosting-provided FIREBASE_WEBAPP_CONFIG; fall back to NEXT_PUBLIC_*.
export function getFirebaseWebConfig(): FirebaseWebConfig | null {
  const raw = process.env.FIREBASE_WEBAPP_CONFIG;
  if (raw) {
    try {
      return JSON.parse(raw) as FirebaseWebConfig;
    } catch {
      /* ignore */
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

export const isFirebaseConfigured = () => !!getFirebaseWebConfig();
