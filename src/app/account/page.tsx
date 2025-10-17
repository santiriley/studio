import AppShell from '@/components/app-shell';
import AuthStatus from '@/components/AuthStatus';
export const dynamic = 'force-dynamic';

export default function AccountPage() {
  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Account</h1>
      <AuthStatus />
      <p style={{ marginTop: 12, opacity: 0.8 }}>
        Tip: In Firebase Console → Auth, enable <strong>Google</strong> as a sign-in provider.
      </p>
    </AppShell>
  );
}