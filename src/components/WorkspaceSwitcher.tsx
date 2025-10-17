'use client';
import * as React from 'react';
import { useWorkspace } from '@/context/workspace';

export default function WorkspaceSwitcher() {
  const { all, current, setWorkspaceId } = useWorkspace();
  if (!all.length) return null;
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span style={{ opacity: 0.75, fontSize: 12 }}>Workspace</span>
      <select
        value={current?.id ?? ''}
        onChange={(e) => setWorkspaceId(e.target.value)}
        style={{
          padding: '6px 8px',
          borderRadius: 8,
          border: '1px solid rgba(255,255,255,0.16)',
          background: 'transparent',
          color: '#e6eefc'
        }}
      >
        {all.map(w => (
          <option key={w.id} value={w.id} style={{ color: '#0b1220' }}>
            {w.name}
          </option>
        ))}
      </select>
    </label>
  );
}
