'use client';
import * as React from 'react';
import { getAuthClient } from '@/lib/firebase';
import { isFirebaseConfigured } from '@/lib/env';

export default function AuthStatus() {
  const [user, setUser] = React.useState<any>(null);
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    (async () => {
      if (!isFirebaseConfigured()) return;
      const { auth } = await getAuthClient() || {};
      if (!auth) return;
      const { onAuthStateChanged } = await import('firebase/auth');
      return onAuthStateChanged(auth, (u) => setUser(u));
    })();
  }, []);

  const signIn = async () => {
    try {
      const client = await getAuthClient();
      if (!client) throw new Error('Firebase not configured');
      const { auth, GoogleAuthProvider, signInWithPopup } = client;
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e: any) {
      setError(e?.message || 'Sign-in failed. Enable Google provider in Firebase Auth.');
    }
  };

  const signOut = async () => {
    try {
      const client = await getAuthClient();
      if (!client) return;
      await client.signOut(client.auth);
    } catch {}
  };

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div>Firebase: {isFirebaseConfigured() ? 'configured' : 'not configured'}</div>
      {user ? (
        <>
          <div>Signed in as <strong>{user.email || user.displayName}</strong></div>
          <button onClick={signOut} style={btn}>Sign out</button>
        </>
      ) : (
        <button onClick={signIn} style={btn}>Sign in with Google</button>
      )}
      {error && <div style={{ color: '#fca5a5' }}>{error}</div>}
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'transparent',
  color: '#e6eefc',
  cursor: 'pointer',
};