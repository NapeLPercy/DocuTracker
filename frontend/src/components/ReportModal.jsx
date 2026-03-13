import { useState } from "react";
import {
  Flag,
  X,
  Send,
} from "lucide-react";

// ── Report Modal ──────────────────────────────────────────────────────────────
export default function ReportModal({ isOpen, task, onClose, onSubmit, loading }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");

  if (!isOpen || !task) return null;

  const handleSubmit = () => {
    if (!text.trim()) {
      setError("Please describe the issue before submitting");
      return;
    }

    onSubmit(task, {
      details: text.trim(),
      type,
    });

    setText("");
    setType("");
    setError("");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl flex flex-col gap-5 relative"
        style={{
          background: "rgba(10,22,40,0.97)",
          border: "1px solid rgba(220,53,69,0.25)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          padding: "2rem",
          animation:
            "popIn 0.25s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-lg"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#6c757d",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#f1f5f9")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#6c757d")}
        >
          <X size={14} />
        </button>

        {/* Icon + title */}
        <div className="flex flex-col items-center gap-3 text-center">
          
          <div>
            <h2
              className="text-lg font-black text-white"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Report Task
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
              Batch{" "}
              <span className="font-semibold" style={{ color: "#f1f5f9" }}>
                {task.batch_number}
              </span>
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        {/* Type */}
        <div>
          <label
            className="block text-xs font-semibold uppercase mb-1.5"
            style={{ color: "#6c757d", letterSpacing: "0.1em" }}
          >
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "0.75rem 1rem",
              color: "#f1f5f9",
              fontSize: 13,
              outline: "none",
              fontFamily: "inherit",
              lineHeight: 1.6,
              transition: "border 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #dc3545";
              e.target.style.boxShadow = "0 0 0 3px rgba(220,53,69,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.border = "1px solid rgba(255,255,255,0.1)";
              e.target.style.boxShadow = "none";
            }}
          >
            <option disabled style={{ color: "#111827" }}>
              Select an option
            </option>

            <option value="ERROR" style={{ color: "#111827" }}>
              Error
            </option>
            <option value="SUGGESTION" style={{ color: "#111827" }}>
              Suggestion
            </option>
          </select>
        </div>

        {/* Textarea */}
        <div>
          <label
            className="block text-xs font-semibold uppercase mb-1.5"
            style={{ color: "#6c757d", letterSpacing: "0.1em" }}
          >
            Describe the issue
          </label>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            placeholder="Explain what went wrong or what needs attention…"
            rows={4}
            style={{
              width: "100%",
              resize: "vertical",
              background: "rgba(255,255,255,0.04)",
              border: error
                ? "1px solid #dc3545"
                : "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "0.75rem 1rem",
              color: "#f1f5f9",
              fontSize: 13,
              outline: "none",
              fontFamily: "inherit",
              lineHeight: 1.6,
              transition: "border 0.2s, box-shadow 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #dc3545";
              e.target.style.boxShadow = "0 0 0 3px rgba(220,53,69,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.border = error
                ? "1px solid #dc3545"
                : "1px solid rgba(255,255,255,0.1)";
              e.target.style.boxShadow = "none";
            }}
          />
          {error && (
            <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>
              {error}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#9ca3af",
              cursor: "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
            }
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150"
            style={{
              background: "#dc3545",
              border: "none",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(220,53,69,0.35)",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = "#b02a37";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#dc3545";
            }}
          >
            {loading ? (
              <svg
                className="animate-spin"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                />
                <path
                  d="M12 2a10 10 0 0 1 10 10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <>
                <Send size={13} /> Submit Report
              </>
            )}
          </button>
        </div>
      </div>
      <style>{`@keyframes popIn { from{opacity:0;transform:scale(0.92) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }`}</style>
    </div>
  );
}