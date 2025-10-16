export type Company = { name: string; country?: string; sector?: string; score?: number; stage?: string };

export async function getCompanies(): Promise<Company[]> {
  // placeholder – replace with real fetch later
  return [
    { name: "SampleCo", country: "CR", sector: "Climate", score: 72, stage: "Backlog" },
    { name: "DemoTech", country: "GT", sector: "Fintech", score: 65, stage: "In Review" },
  ];
}

// NEW: used by /kanban page – simple stub grouped by stage
export async function getCompaniesByStages(): Promise<Record<string, Company[]>> {
  const all = await getCompanies();
  const by: Record<string, Company[]> = {};
  for (const c of all) {
    const s = c.stage || "Backlog";
    by[s] ??= [];
    by[s].push(c);
  }
  // ensure the common columns exist even if empty
  for (const k of ["Backlog", "In Review", "Contacted", "In Pipeline", "Passed"]) {
    by[k] ??= [];
  }
  return by;
}
