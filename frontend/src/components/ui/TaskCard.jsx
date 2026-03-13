import StatusBadge from "./StatusBadge";
import { formatDate, formatTime } from "../../../utils/dateTimeFormat";
import {
  Play,
  Square,
  Flag,
  Calendar,
  Hash,
  Clock,
  ClipboardList,
  
AlertTriangle,CheckCircle2,ShieldCheck,
} from "lucide-react";
// ── Task Card ─────────────────────────────────────────────────────────────────
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

export default function TaskCard({ task, onStart, onEnd, onReport }) {

  const meta = statusMeta[task.status] ?? statusMeta.PENDING;
  const canStart = task.status === "PENDING";
  const canEnd = task.status === "IN_PROGRESS";

  return (
    <div
      className="rounded-2xl flex flex-col gap-4 transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${meta.border}`,
        padding: "1.25rem 1.5rem",
        boxShadow: `0 4px 24px rgba(0,0,0,0.25)`,
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(255,255,255,0.03)")
      }
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <Hash size={13} color="#6c757d" />
            <span className="text-xs font-mono" style={{ color: "#6c757d" }}>
              {task.id.slice(0, 8)}…
            </span>
          </div>
          <p className="text-base font-bold text-white">{task.batch_number}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>

      {/* Date */}
      {task.date && (
        <div className="flex items-center gap-2">
          <Calendar size={13} color="#6c757d" />
          <span className="text-xs" style={{ color: "#9ca3af" }}>
            {formatDate(task.date)}
          </span>
        </div>
      )}

      {/* Times — only show if available */}
      {(task.start_time || task.finish_time) && (
        <div className="flex gap-4 flex-wrap">
          {task.start_time && (
            <div className="flex flex-col gap-0.5">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#6c757d", fontSize: 9 }}
              >
                Started
              </span>
              <span className="text-xs font-mono" style={{ color: "#17a2b8" }}>
                {formatTime(task.start_time)}
              </span>
            </div>
          )}
          {task.finish_time && (
            <div className="flex flex-col gap-0.5">
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "#6c757d", fontSize: 9 }}
              >
                Finished
              </span>
              <span className="text-xs font-mono" style={{ color: "#28a745" }}>
                {formatTime(task.finish_time)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.05)" }} />

      {/* Action buttons */}
      <div className="flex gap-2 flex-wrap">
        {canStart && (
          <button
            onClick={() => onStart(task)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150"
            style={{
              background: "rgba(40,167,69,0.12)",
              border: "1px solid rgba(40,167,69,0.3)",
              color: "#28a745",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(40,167,69,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(40,167,69,0.12)";
            }}
          >
            <Play size={12} /> Start Task
          </button>
        )}

        {canEnd && (
          <button
            onClick={() => onEnd(task)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150"
            style={{
              background: "rgba(23,162,184,0.12)",
              border: "1px solid rgba(23,162,184,0.3)",
              color: "#17a2b8",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(23,162,184,0.22)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(23,162,184,0.12)";
            }}
          >
            <Square size={12} /> End Task
          </button>
        )}

        <button
          onClick={() => onReport(task)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 ml-auto"
          style={{
            background: "rgba(220,53,69,0.1)",
            border: "1px solid rgba(220,53,69,0.25)",
            color: "#dc3545",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(220,53,69,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(220,53,69,0.1)";
          }}
        >
          <Flag size={12} /> Report
        </button>
      </div>
    </div>
  );
}
