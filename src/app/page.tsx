import AppShell from '@/components/app-shell';

export default async function DashboardPage() {
  return (
    <AppShell>
      <div className="grid gap-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
          <p>Welcome to Venture Scout. Your dashboard will be displayed here.</p>
        </section>
      </div>
    </AppShell>
  );
}
