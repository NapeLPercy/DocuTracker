import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import {allStatuses} from "../../../utils/statusMeta";

const statusMeta = {
  IN_PROGRESS: {
    label: "In Progress",
    color: "#17a2b8",
    bg: "rgba(23,162,184,0.12)",
    border: "rgba(23,162,184,0.3)",
    icon: <Clock size={13} />,
    order: 0,
  },
  PENDING: {
    label: "Pending",
    color: "#ffc107",
    bg: "rgba(255,193,7,0.12)",
    border: "rgba(255,193,7,0.3)",
    icon: <ClipboardList size={13} />,
    order: 1,
  },
  ERROR: {
    label: "Error",
    color: "#dc3545",
    bg: "rgba(220,53,69,0.12)",
    border: "rgba(220,53,69,0.3)",
    icon: <AlertTriangle size={13} />,
    order: 2,
  },
  COMPLETED: {
    label: "Completed",
    color: "#28a745",
    bg: "rgba(40,167,69,0.12)",
    border: "rgba(40,167,69,0.3)",
    icon: <CheckCircle2 size={13} />,
    order: 3,
  },
  APPROVED: {
    label: "Approved",
    color: "#5dd879",
    bg: "rgba(93,216,121,0.12)",
    border: "rgba(93,216,121,0.3)",
    icon: <ShieldCheck size={13} />,
    order: 4,
  },
};

// ── Status Badge ──────────────────────────────────────────────────────────────
export default function StatusBadge({ status }) {
  const meta = statusMeta[status];
  if (!meta) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap"
      style={{
        color: meta.color,
        background: meta.bg,
        border: `1px solid ${meta.border}`,
      }}
    >
      {meta.icon}
      {meta.label}
    </span>
  );
}
