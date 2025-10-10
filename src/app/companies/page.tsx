import { AppShell } from '@/components/app-shell';
import { IngestionCard } from '@/components/companies/ingestion-card';
import { CompaniesTable } from '@/components/companies/companies-table';
import { getCompanies } from '@/lib/data';

export default async function CompaniesPage() {
  const initialCompanies = await getCompanies();

  return (
    <AppShell pageTitle="Companies">
      <div className="grid gap-6">
        <IngestionCard />
        <CompaniesTable initialCompanies={initialCompanies} />
      </div>
    </AppShell>
  );
}
