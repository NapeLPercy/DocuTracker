import { useState, useMemo } from "react";
import {
  Flag,
  AlertTriangle,
  Lightbulb,
  ChevronDown,
  ChevronUp,
  Mail,
  Search,
  X,
  Filter,
  Send,
  Calendar,
  Hash,
  UserCircle,
} from "lucide-react";
import { formatDate } from "../../../utils/dateTimeFormat";

const TYPE_META = {
  ERROR: {
    label: "Error",
    color: "#dc3545",
    bg: "rgba(220,53,69,0.12)",
    border: "rgba(220,53,69,0.3)",
    icon: <AlertTriangle size={13} />,
  },
  SUGGESTION: {
    label: "Suggestion",
    color: "#ffc107",
    bg: "rgba(255,193,7,0.12)",
    border: "rgba(255,193,7,0.3)",
    icon: <Lightbulb size={13} />,
  },
};

const ROLE_COLOR = {
  INDEXER: "#17a2b8",
  CREATOR: "#ffc107",
  ASSEMBLER: "#28a745",
  QC: "#ff9900",
  SCANNER: "#5dd879",
  RUNNER: "#6c757d",
  "tech-support": "#dc3545",
};
// ─────────────────────────────────────────────────────────────────────────────
// Report Row
// ─────────────────────────────────────────────────────────────────────────────
export default function ReportRow({ report, isManager, onEmail, index }) {
  const [expanded, setExpanded] = useState(false);
  const meta = TYPE_META[report.type] ?? TYPE_META.ERROR;

  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        transition: "background 0.15s",
        animation: `fadeSlideIn 0.25s ease both`,
        animationDelay: `${index * 0.04}s`,
      }}
    >
      {/* ── Collapsed row ── */}
      <button
        onClick={() => setExpanded((p) => !p)}
        className="w-full text-left"
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "14px 20px",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "rgba(40,167,69,0.04)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isManager
              ? "120px 130px 130px 1fr 40px"
              : "120px 130px 1fr 40px",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Type badge */}
          <span
            className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full w-fit"
            style={{
              color: meta.color,
              background: meta.bg,
              border: `1px solid ${meta.border}`,
            }}
          >
            {meta.icon}
            {meta.label}
          </span>

          {/* Role — manager only */}
          {isManager && (
            <div className="flex items-center gap-2">
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#28a745,#155724)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {report.workerName?.charAt(0)}
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#f1f5f9", lineHeight: 1.2 }}
                >
                  {report.workerName}
                </p>
              </div>
            </div>
          )}

          {/*ROLE*/}
          {isManager && (<div className="flex items-center gap-2.5">
            <p
              className="text-xs"
              style={{ color: ROLE_COLOR[report.role] ?? "#6c757d" }}
            >
              {report.role}
            </p>
          </div>
          )}

          {/* Date */}
          <div className="flex items-center gap-1.5">
            <Calendar size={12} color="#6c757d" />
            <span className="text-xs" style={{ color: "#9ca3af" }}>
              {formatDate(report.date)}
            </span>
          </div>

          {/* Chevron */}
          <div
            style={{
              color: "#6c757d",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </div>
        </div>
      </button>

      {/* ── Expanded detail ── */}
      {expanded && (
        <div
          style={{
            padding: "0 20px 16px",
            animation: "expandIn 0.2s ease forwards",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {/* Message */}
            <div>
              <p
                className="text-xs font-semibold uppercase mb-1.5"
                style={{ color: "#6c757d", letterSpacing: "0.1em" }}
              >
                Report Details
              </p>
              <p
                className="text-sm"
                style={{ color: "#d1d5db", lineHeight: 1.7 }}
              >
                {report.message}
              </p>
            </div>

            {/* Manager email action */}
            {isManager && (
              <>
                <div
                  style={{ height: 1, background: "rgba(255,255,255,0.06)" }}
                />
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <Mail size={13} color="#6c757d" />
                    <span className="text-xs" style={{ color: "#6c757d" }}>
                      {report.email}
                    </span>
                  </div>
                  <button
                    onClick={() => onEmail(report)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150"
                    style={{
                      background: "rgba(40,167,69,0.12)",
                      border: "1px solid rgba(40,167,69,0.3)",
                      color: "#28a745",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(40,167,69,0.22)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(40,167,69,0.12)")
                    }
                  >
                    <Mail size={12} /> Send Email
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
