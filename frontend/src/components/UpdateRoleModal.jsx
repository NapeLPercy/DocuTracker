// components/UpdateRoleModal.jsx
// Props:
//   isOpen   — boolean
//   onClose  — fn
//   onUpdate — fn(updatedUser) called with { ...user, role: newRole }
//   user     — { id, fullName, persal, email, role }
//   loading  — boolean (optional)

import { useState, useEffect } from "react";
import { X, ShieldCheck, UserCog } from "lucide-react";
import PrimaryBtn from "./ui/PrimaryBtn";

const ROLES = [
  { value: "INDEXER",       label: "Indexer" },
  { value: "CREATOR",       label: "Batch Creator" },
  { value: "ASSEMBLER",     label: "Assembler" },
  { value: "QC",            label: "QC" },
  { value: "SCANNER",       label: "Scanner" },
  { value: "RUNNER",        label: "Runner" },
  { value: "tech-support",  label: "Technical Support" },
];

const ROLE_COLOR = {
  INDEXER:       "#17a2b8",
  CREATOR:       "#ffc107",
  ASSEMBLER:     "#28a745",
  QC:            "#ff9900",
  SCANNER:       "#5dd879",
  RUNNER:        "#6c757d",
  "tech-support":"#dc3545",
};

export default function UpdateRoleModal({ isOpen, onClose, onUpdate,user, loading = false }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [error, setError]               = useState("");

  // Sync selected role when the modal opens with a new user
  useEffect(() => {
    if (user) setSelectedRole(user.role ?? "");
    setError("");
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const hasChanged = selectedRole !== user.role;

  const handleUpdate = () => {
    if (!selectedRole) { setError("Please select a role"); return; }
    if (!hasChanged)   { setError("This is already the current role"); return; }
    onUpdate({ ...user, role: selectedRole });
  };

  const roleColor = ROLE_COLOR[selectedRole] ?? "#6c757d";

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
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-150"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#6c757d", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"}
          onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}
        >
          <X size={14}/>
        </button>

        {/* Icon + heading */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#28a745" }}>
            <UserCog size={28}/>
          </div>
          <div>
            <h2 className="text-lg font-black text-white" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
              Update Role
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
              Changing role for <span className="font-semibold" style={{ color: "#f1f5f9" }}>{user.fullName}</span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }}/>

        {/* Current role pill */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6c757d" }}>
            Current Role
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full"
            style={{
              color: ROLE_COLOR[user.role] ?? "#6c757d",
              background: `${ROLE_COLOR[user.role] ?? "#6c757d"}18`,
              border: `1px solid ${ROLE_COLOR[user.role] ?? "#6c757d"}44`,
            }}>
            {ROLES.find(r => r.value === user.role)?.label ?? user.role}
          </span>
        </div>

        {/* Role select */}
        <div>
          <label className="block text-xs font-semibold uppercase mb-1.5"
            style={{ color: "#6c757d", letterSpacing: "0.1em" }}>
            New Role
          </label>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 pointer-events-none" style={{ color: roleColor, transition: "color 0.2s" }}>
              <ShieldCheck size={16}/>
            </div>
            <select
              value={selectedRole}
              onChange={e => { setSelectedRole(e.target.value); setError(""); }}
              style={{
                width: "100%",
                paddingLeft: "2.75rem",
                paddingRight: "2rem",
                paddingTop: "0.75rem",
                paddingBottom: "0.75rem",
                background: "rgba(255,255,255,0.04)",
                border: error ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                color: selectedRole ? "#f1f5f9" : "#6c757d",
                fontSize: 14,
                outline: "none",
                appearance: "none",
                cursor: "pointer",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.target.style.border = "1px solid #28a745"; e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)"; }}
              onBlur={e => { e.target.style.border = error ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
            >
              <option value="" style={{ background: "#0a1628" }}>-- Select a Role --</option>
              {ROLES.map(r => (
                <option key={r.value} value={r.value} style={{ background: "#0a1628", color: "#f1f5f9" }}>
                  {r.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 pointer-events-none" style={{ color: "#6c757d" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
          </div>
          {error && <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>{error}</p>}
        </div>

        {/* Changed indicator */}
        {hasChanged && selectedRole && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
            style={{ background: "rgba(40,167,69,0.08)", border: "1px solid rgba(40,167,69,0.2)", color: "#5dd879" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Role will change to <span className="font-bold ml-1">{ROLES.find(r => r.value === selectedRole)?.label}</span>
          </div>
        )}

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
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
          >
            Cancel
          </button>
          <div className="flex-1">
            <PrimaryBtn loading={loading} onClick={handleUpdate}>
              Update Role →
            </PrimaryBtn>
          </div>
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