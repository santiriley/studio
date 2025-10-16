// Centralized Firebase access (client). Do not import SDKs elsewhere.
// NOTE: We intentionally avoid importing 'firebase/app' until we wire real envs.
// This keeps the build green on App Hosting with zero runtime side-effects.

export type FirebaseClientApp = { __stub: true };

export function getFirebaseApp(): FirebaseClientApp | null {
  // TODO: when envs (NEXT_PUBLIC_FIREBASE_*) are set and SDK installed,
  // lazy-import initializeApp and return the real app instance.
  // For now, return a stub to satisfy callers.
  return { __stub: true };
}
