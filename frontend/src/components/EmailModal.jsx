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
// ─────────────────────────────────────────────────────────────────────────────
// Email Modal
// ─────────────────────────────────────────────────────────────────────────────
export default function EmailModal({ isOpen, report, onClose, onSend, loading }) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  if (!isOpen || !report) return null;

  const validate = () => {
    const e = {};
    if (!subject.trim()) e.subject = "Subject is required";
    if (!body.trim()) e.body = "Message body is required";
    return e;
  };

  const handleSend = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSend({ to: report.email, subject, body, reportId: report.id });
    setSubject("");
    setBody("");
    setErrors({});
  };

  
  const inputStyle = (hasError) => ({
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: hasError ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "0.75rem 1rem",
    color: "#f1f5f9",
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    transition: "border 0.2s, box-shadow 0.2s",
  });

  return (
    <div
      className="fixed mt-30 inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl flex flex-col gap-5 relative"
        style={{
          background: "rgba(10,22,40,0.97)",
          border: "1px solid rgba(40,167,69,0.2)",
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

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          
          <div>
            <h2
              className="text-lg font-black text-white"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Send Email
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
              To:{" "}
              <span className="font-semibold" style={{ color: "#f1f5f9" }}>
                {report.email}
              </span>
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />

        {/* Subject */}
        <div>
          <label
            className="block text-xs font-semibold uppercase mb-1.5"
            style={{ color: "#6c757d", letterSpacing: "0.1em" }}
          >
            Subject
          </label>
          <input
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setErrors((p) => ({ ...p, subject: "" }));
            }}
            placeholder="e.g. Regarding your report"
            style={inputStyle(errors.subject)}
            onFocus={(e) => {
              e.target.style.border = "1px solid #28a745";
              e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.border = errors.subject
                ? "1px solid #dc3545"
                : "1px solid rgba(255,255,255,0.1)";
              e.target.style.boxShadow = "none";
            }}
          />
          {errors.subject && (
            <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>
              {errors.subject}
            </p>
          )}
        </div>

        {/* Body */}
        <div>
          <label
            className="block text-xs font-semibold uppercase mb-1.5"
            style={{ color: "#6c757d", letterSpacing: "0.1em" }}
          >
            Message
          </label>
          <textarea
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
              setErrors((p) => ({ ...p, body: "" }));
            }}
            placeholder="Write your message to the worker…"
            rows={4}
            style={{
              ...inputStyle(errors.body),
              resize: "vertical",
              lineHeight: 1.6,
            }}
            onFocus={(e) => {
              e.target.style.border = "1px solid #28a745";
              e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.border = errors.body
                ? "1px solid #dc3545"
                : "1px solid rgba(255,255,255,0.1)";
              e.target.style.boxShadow = "none";
            }}
          />
          {errors.body && (
            <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>
              {errors.body}
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
            onClick={handleSend}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-150"
            style={{
              background: "linear-gradient(135deg,#28a745,#218838)",
              border: "none",
              color: "white",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 16px rgba(40,167,69,0.35)",
            }}
            onMouseEnter={(e) => {
              if (!loading)
                e.currentTarget.style.background =
                  "linear-gradient(135deg,#218838,#155724)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background =
                "linear-gradient(135deg,#28a745,#218838)";
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
                <Send size={13} /> Send Email
              </>
            )}
          </button>
        </div>
      </div>
      <style>{`@keyframes popIn{from{opacity:0;transform:scale(0.92) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}