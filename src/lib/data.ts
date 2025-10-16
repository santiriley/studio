export type Company = { name: string; country?: string; sector?: string; score?: number };

export async function getCompanies(): Promise<Company[]> {
  // Placeholder so pages can render; replace with Firestore/Functions later.
  return [
    { name: "SampleCo", country: "CR", sector: "Climate", score: 72 },
    { name: "DemoTech", country: "GT", sector: "Fintech", score: 65 },
  ];
}
