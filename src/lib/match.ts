import { Investor, MatchReason, MatchResult, StartupProfile, Thesis } from '@/lib/types';

function inRange(n: number, min?: number, max?: number): 'match' | 'warning' | 'miss' {
  if (min == null && max == null) return 'warning';
  if (min != null && n < min) return 'miss';
  if (max != null && n > max) return 'warning';
  return 'match';
}

function normalizeCountry(country?: string): string | undefined {
  if (!country) return undefined;
  // Light normalizer; TODO: map to ISO in real impl.
  return country.trim();
}

export function evaluateVCForStartup(
  startup: StartupProfile,
  thesis: Thesis
): { score: number; reasons: MatchReason[] } {
  const reasons: MatchReason[] = [];
  let score = 0;

  const weights = { geo: 1, sector: 1, stage: 1, check: 1, ...(thesis.weights ?? {}) };

  // Geo
  const country = normalizeCountry(startup.country);
  const geoOk =
    !country || !thesis.geos?.length || thesis.geos.includes(country)
      ? 'match'
      : 'miss';
  reasons.push({
    code: 'geo',
    verdict: geoOk,
    label: geoOk === 'match' ? `Geo ✓ (${country ?? 'unspecified'})` : `Geo ✗ (${country} not in thesis)`,
  });
  if (geoOk === 'match') score += 25 * weights.geo;

  // Sector
  const sectorOk =
    !startup.sector || !thesis.sectors?.length || thesis.sectors.includes(startup.sector)
      ? 'match'
      : 'miss';
  reasons.push({
    code: 'sector',
    verdict: sectorOk,
    label: sectorOk === 'match' ? `Sector ✓ (${startup.sector ?? 'unspecified'})` : `Sector ✗ (${startup.sector} not in thesis)`,
  });
  if (sectorOk === 'match') score += 30 * weights.sector;

  // Stage
  const stageOk =
    !startup.stage || !thesis.stages?.length || thesis.stages.includes(startup.stage)
      ? 'match'
      : 'miss';
  reasons.push({
    code: 'stage',
    verdict: stageOk,
    label: stageOk === 'match' ? `Stage ✓ (${startup.stage ?? 'unspecified'})` : `Stage ✗ (${startup.stage} not in thesis)`,
  });
  if (stageOk === 'match') score += 25 * weights.stage;

  // Ticket
  let ticketVerdict: 'match' | 'warning' | 'miss' = 'warning';
  if (startup.desiredCheckSize != null) {
    ticketVerdict = inRange(startup.desiredCheckSize, thesis.checkSize?.min, thesis.checkSize?.max);
  }
  reasons.push({
    code: 'ticket',
    verdict: ticketVerdict,
    label:
      ticketVerdict === 'match'
        ? `Ticket ✓ (${startup.desiredCheckSize ?? 'n/a'})`
        : ticketVerdict === 'warning'
        ? `Ticket ! (outside preference or unspecified)`
        : `Ticket ✗ (mismatch)`,
  });
  if (ticketVerdict === 'match') score += 20 * weights.check;
  else if (ticketVerdict === 'warning') score += 10 * weights.check * 0.5; // soft points

  // Clamp to 0–100
  score = Math.max(0, Math.min(100, Math.round(score)));
  return { score, reasons };
}

export function rankInvestors(
  startup: StartupProfile,
  investors: Investor[]
): MatchResult[] {
  const results = investors.map((inv) => {
    const { score, reasons } = evaluateVCForStartup(startup, inv.thesis);
    return {
      investor: inv,
      score,
      reasons,
      contactCTA: 'View details', // TODO: wire to portal/contacts later
    };
  });
  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}
