"use client";
import React, { useState } from "react";

export default function IngestionCard() {
  const [url, setUrl] = useState("");
  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
      <h3 style={{ marginBottom: 8 }}>Add an article/company URL</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: 8, borderRadius: 8, border: "1px solid #e5e7eb" }}
          placeholder="https://example.com/article"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={() => alert(`Pretend ingest: ${url || "(empty)"}`)}
          style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e5e7eb" }}
        >
          Ingest
        </button>
      </div>
    </div>
  );
}
