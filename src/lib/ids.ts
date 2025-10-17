// Helpers for consistent Firestore doc ids.
// Theses are stored as: `${workspaceId}-thesis` (e.g., ws-atta-thesis).
export function thesisDocIdFor(opts: { investorId?: string; workspaceId?: string | null }) {
  const { investorId, workspaceId } = opts;
  if (workspaceId) {
    return `${workspaceId}-thesis`;
  }
  // Fallback for legacy/local-only edits
  return investorId ? `thesis-${investorId}` : 'thesis-unknown';
}
