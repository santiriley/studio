import { AppShell } from '@/components/app-shell';
import IngestionCard from '@/components/companies/ingestion-card';
import CompaniesTable from '@/components/companies/companies-table';
import { getCompanies } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function CompaniesPage() {
  const initialCompanies = await getCompanies();

  return (
    <AppShell>
      <div className="grid gap-6">
        <IngestionCard />
        <CompaniesTable rows={initialCompanies} />
      </div>
    </AppShell>
  );
}
