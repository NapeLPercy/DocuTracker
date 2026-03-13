// components/ConfirmModal.jsx
// Props:
//   isOpen      — boolean
//   onClose     — fn
//   onConfirm   — fn
//   icon        — lucide React element e.g. <Trash2 size={28} />
//   title       — string
//   subtitle    — string
//   confirmText — string e.g. "Delete", "Approve", "Archive"
//   confirmColor— tailwind color key: "danger" | "warning" | "success" | "info"
//   loading     — boolean (optional)

import PrimaryBtn from "./ui/PrimaryBtn";
import { X } from "lucide-react";

const COLOR_MAP = {
  danger:  { bg: "rgba(220,53,69,0.12)",  border: "rgba(220,53,69,0.35)",  icon: "#dc3545", btn: "#dc3545", btnHover: "#b02a37" },
  warning: { bg: "rgba(255,193,7,0.12)",  border: "rgba(255,193,7,0.35)",  icon: "#ffc107", btn: "#e0a800", btnHover: "#c69500" },
  success: { bg: "rgba(40,167,69,0.12)",  border: "rgba(40,167,69,0.35)",  icon: "#28a745", btn: "#28a745", btnHover: "#218838" },
  info:    { bg: "rgba(23,162,184,0.12)", border: "rgba(23,162,184,0.35)", icon: "#17a2b8", btn: "#17a2b8", btnHover: "#138496" },
};

export default function ConfirmModal({
  isOpen=true,
  onClose,
  onConfirm,
  icon,
  title       = "Are you sure?",
  subtitle    = "This action cannot be undone.",
  confirmText = "Confirm",
  confirmColor = "danger",
  loading     = false,
}) {
  if (!isOpen) return null;

  const colors = COLOR_MAP[confirmColor] ?? COLOR_MAP.danger;

  return (
    // ── Backdrop ──
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      {/* ── Modal card ── */}
      <div
        className="w-full max-w-sm rounded-2xl flex flex-col gap-5 relative"
        style={{
          background: "rgba(10,22,40,0.97)",
          border: "1px solid rgba(40,167,69,0.18)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          padding: "2rem",
          animation: "popIn 0.25s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-150"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#6c757d", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"}
          onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}
        >
          <X size={14}/>
        </button>

        {/* Icon */}
        {icon && (
          <div
            className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto"
            style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.icon }}
          >
            {icon}
          </div>
        )}

        {/* Text */}
        <div className="text-center flex flex-col gap-1.5">
          <h2 className="text-lg font-black text-white" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
            {title}
          </h2>
          <p className="text-sm" style={{ color: "#6c757d" }}>{subtitle}</p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }}/>

        {/* Actions */}
        <div className="flex gap-3">
          {/* Cancel */}
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            Cancel
          </button>

          {/* Confirm — overrides PrimaryBtn green with the passed color */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-150 flex items-center justify-center gap-2"
            style={{
              background: colors.btn,
              border: "none",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              boxShadow: `0 4px 16px ${colors.btn}55`,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = colors.btnHover; }}
            onMouseLeave={e => { e.currentTarget.style.background = colors.btn; }}
          >
            {loading
              ? <>
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3"/>
                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  Processing…
                </>
              : confirmText}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);   }
        }
      `}</style>
    </div>
  );
}