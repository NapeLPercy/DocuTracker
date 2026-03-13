export const rolesData = [
  { value: "INDEXER", label: "Indexer" },
  { value: "CREATOR", label: "Batch Creator" },
  { value: "ASSEMBLER", label: "Assembler" },
  { value: "QC", label: "QC" },
  { value: "SCANNER", label: "Scanner" },
  { value: "RUNNER", label: "Runner" },
  { value: "TECH-SUPPORT", label: "Technical Support" },
];

// ── Role badge colours ───────────────────────────────────────────────────────
export const roleMeta = {
  INDEXER: { label: "Indexer", color: "#17a2b8", bg: "rgba(23,162,184,0.12)" },
  CREATOR: {
    label: "Batch Creator",
    color: "#ffc107",
    bg: "rgba(255,193,7,0.12)",
  },
  ASSEMBLER: {
    label: "Assembler",
    color: "#28a745",
    bg: "rgba(40,167,69,0.12)",
  },
  QC: { label: "QC", color: "#ff9900", bg: "rgba(255,153,0,0.12)" },
  SCANNER: { label: "Scanner", color: "#5dd879", bg: "rgba(93,216,121,0.12)" },
  RUNNER: { label: "Runner", color: "#6c757d", bg: "rgba(108,117,125,0.12)" },
  "tech-support": {
    label: "Tech Support",
    color: "#dc3545",
    bg: "rgba(220,53,69,0.12)",
  },
};

