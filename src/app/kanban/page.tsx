import { AppShell } from '@/components/app-shell';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import { getCompaniesByStages } from '@/lib/data';
import { KANBAN_STAGES } from '@/lib/types';

export default async function KanbanPage() {
  const companiesByStage = await getCompaniesByStages();

  return (
    <AppShell pageTitle="Workflow">
      <KanbanBoard stages={KANBAN_STAGES} initialData={companiesByStage} />
    </AppShell>
  );
}
