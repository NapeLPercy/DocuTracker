// ── Status config ─────────────────────────────────────────────────────────────
const statusOrder = {
  IN_PROGRESS: {
    order: 0,
  },
  PENDING: {
    order: 1,
  },
  ERROR: {
    order: 2,
  },
  COMPLETED: {
    order: 3,
  },
  APPROVED: {
    order: 4,
  },
};

// ── Status config ─────────────────────────────────────────────────────────────


const allStatuses = [
  "IN_PROGRESS",
  "PENDING",
  "ERROR",//for admin/team leader
  "COMPLETED",
  "APPROVED",//for admin/team leader
];

export {statusOrder, allStatuses};