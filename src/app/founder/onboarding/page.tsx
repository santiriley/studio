
'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AppShell from '@/components/app-shell';
export const dynamic = 'force-dynamic';

const SECTORS = ['Climate', 'Circular Economy', 'AgTech', 'Waste-to-Value', 'Fintech', 'SaaS', 'Marketplaces'] as const;
const STAGES = ['Pre-Seed', 'Seed', 'Pre-Series A'] as const;

export default function FounderOnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    country: 'Costa Rica',
    sector: 'Climate',
    stage: 'Seed',
    desiredCheckSize: 250000,
    website: '',
    deckUrl: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'desiredCheckSize' ? Number(value) : value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (form.name) params.set('name', form.name);
    if (form.country) params.set('country', form.country);
    if (form.sector) params.set('sector', form.sector);
    if (form.stage) params.set('stage', form.stage);
    if (form.desiredCheckSize) params.set('desiredCheckSize', String(form.desiredCheckSize));
    if (form.website) params.set('website', form.website);
    if (form.deckUrl) params.set('deckUrl', form.deckUrl);
    router.push(`/match?${params.toString()}`);
  };

  return (
    <AppShell>
      <h1 style={{ fontSize: 22, margin: '8px 0 16px' }}>Founder onboarding</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 640 }}>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Name (startup)</span>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Acme Climate"
            style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Country</span>
          <input
            name="country"
            value={form.country}
            onChange={onChange}
            placeholder="Costa Rica"
            style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
            required
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Sector</span>
          <select
            name="sector"
            value={form.sector}
            onChange={onChange}
            style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
          >
            {SECTORS.map((s) => (
              <option key={s} value={s} style={{ color: '#0b1220' }}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Stage</span>
          <select
            name="stage"
            value={form.stage}
            onChange={onChange}
            style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
          >
            {STAGES.map((s) => (
              <option key={s} value={s} style={{ color: '#0b1220' }}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Desired check size (USD)</span>
          <input
            name="desiredCheckSize"
            type="number"
            min={0}
            step={1000}
            value={form.desiredCheckSize}
            onChange={onChange}
            style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
            required
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Website</span>
          <input
            name="website"
            value={form.website}
            onChange={onChange}
            placeholder="https://example.com"
            style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
          />
        </label>
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Deck URL (optional)</span>
          <input
            name="deckUrl"
            value={form.deckUrl}
            onChange={onChange}
            placeholder="https://drive.google.com/..."
            style={{ padding: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
          />
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="submit"
            style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: '#e6eefc' }}
          >
            Find matches
          </button>
        </div>
      </form>
    </AppShell>
  );
}
