"use client";
import React from "react";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: 24 }}>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600 }}>Venture Scout</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}

// also provide default so either `import AppShell` or `import { AppShell }` works
export default AppShell;
