"use client";
type Row = { name: string; country?: string; sector?: string; score?: number };

export default function CompaniesTable({ rows = [] as Row[] }) {
  const data = rows.length
    ? rows
    : [
        { name: "SampleCo", country: "CR", sector: "Climate", score: 72 },
        { name: "DemoTech", country: "GT", sector: "Fintech", score: 65 },
      ];
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th align="left">Company</th>
          <th align="left">Country</th>
          <th align="left">Sector</th>
          <th align="left">Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((r, i) => (
          <tr key={i}>
            <td>{r.name}</td>
            <td>{r.country ?? "-"}</td>
            <td>{r.sector ?? "-"}</td>
            <td>{r.score ?? "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
