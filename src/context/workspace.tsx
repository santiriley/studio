'use client';
import * as React from 'react';
import type { Workspace } from '@/lib/thesis-engine';
import { fetchWorkspaces } from '@/lib/workspaces';

type Ctx = {
  all: Workspace[];
  current: Workspace | null;
  setWorkspaceId: (id: string) => void;
};

const WorkspaceContext = React.createContext<Ctx | null>(null);
const STORAGE_KEY = 'vs:workspaceId';

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [all, setAll] = React.useState<Workspace[]>([]);
  const [current, setCurrent] = React.useState<Workspace | null>(null);

  React.useEffect(() => {
    (async () => {
      const list = await fetchWorkspaces();
      setAll(list);
      // pick from localStorage or first workspace
      const saved = (typeof window !== 'undefined') ? window.localStorage.getItem(STORAGE_KEY) : null;
      const initial = list.find(w => w.id === saved) ?? list[0] ?? null;
      setCurrent(initial ?? null);
      if (initial && saved !== initial.id) {
        try { window.localStorage.setItem(STORAGE_KEY, initial.id); } catch {}
      }
    })();
  }, []);

  const setWorkspaceId = (id: string) => {
    const w = all.find(x => x.id === id) ?? null;
    setCurrent(w);
    try { window.localStorage.setItem(STORAGE_KEY, id); } catch {}
  };

  const value: Ctx = { all, current, setWorkspaceId };
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace(): Ctx {
  const ctx = React.useContext(WorkspaceContext);
  if (!ctx) {
    throw new Error('useWorkspace must be used within WorkspaceProvider');
  }
  return ctx;
}
