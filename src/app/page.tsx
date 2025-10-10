import { AppShell } from '@/components/app-shell';
import { ClusterCard } from '@/components/dashboard/cluster-card';
import { TopCompaniesCard } from '@/components/dashboard/top-companies-card';
import { getClusters, getCompanies } from '@/lib/data';

export default async function DashboardPage() {
  const clusters = await getClusters();
  const companies = (await getCompanies()).slice(0, 5); // Top 5 for dashboard

  return (
    <AppShell pageTitle="Dashboard">
      <div className="grid gap-6">
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4">Recent News Clusters</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {clusters.map((cluster) => (
              <ClusterCard key={cluster.id} cluster={cluster} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-headline font-semibold mb-4">Top Companies</h2>
          <TopCompaniesCard companies={companies} />
        </section>
      </div>
    </AppShell>
  );
}
