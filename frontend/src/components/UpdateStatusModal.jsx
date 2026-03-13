
import { useState, useMemo } from "react";
import {
  Search, X, Filter, ChevronDown, ClipboardList,
  CheckCircle2, AlertTriangle, Clock, ShieldCheck, Hash,
} from "lucide-react";
import PrimaryBtn from "./ui/PrimaryBtn";
import StatusBadge from "./ui/StatusBadge";
// ─────────────────────────────────────────────────────────────────────────────
// Update Status Modal
// ─────────────────────────────────────────────────────────────────────────────

// Manager can only set these two
const ACTIONABLE_STATUSES = [
  { value: "ERROR",    label: "Error" },
  { value: "APPROVED", label: "Approved" },
];

export default function UpdateStatusModal({ isOpen, task, onClose, onUpdate, loading }) {
  const [selected, setSelected] = useState("");
  const [error, setError]       = useState("");

  // Reset when task changes
  useState(() => { setSelected(""); setError(""); }, [task]);

  if (!isOpen || !task) return null;

  const handleUpdate = () => {
    if (!selected)             { setError("Please select a status"); return; }
    if (selected === task.status) { setError("Task already has this status"); return; }
    onUpdate({ ...task, status: selected });
    setSelected(""); setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl flex flex-col gap-5 relative"
        style={{
          background: "rgba(10,22,40,0.97)",
          border: "1px solid rgba(40,167,69,0.2)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          padding: "2rem",
          animation: "popIn 0.25s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
        }}
        onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-4 right-4 flex items-center justify-center w-7 h-7 rounded-lg"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#6c757d", cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"}
          onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}>
          <X size={14}/>
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", color: "#28a745" }}>
            <ShieldCheck size={28}/>
          </div>
          <div>
            <h2 className="text-lg font-black text-white" style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}>
              Update Task Status
            </h2>
            <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
              Batch <span className="font-semibold" style={{ color: "#f1f5f9" }}>{task.batch_number}</span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "#6c757d" }}>
              Assigned to <span style={{ color: "#f1f5f9" }}>{task.assignedTo}</span>
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }}/>

        {/* Current status */}
        <div className="flex items-center justify-between px-3 py-2.5 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#6c757d" }}>Current</span>
          <StatusBadge status={task.status}/>
        </div>

        {/* New status select */}
        <div>
          <label className="block text-xs font-semibold uppercase mb-1.5"
            style={{ color: "#6c757d", letterSpacing: "0.1em" }}>New Status</label>
          <div className="relative">
            <select value={selected}
              onChange={e => { setSelected(e.target.value); setError(""); }}
              style={{
                width: "100%",
                padding: "0.75rem 2rem 0.75rem 1rem",
                background: "rgba(255,255,255,0.04)",
                border: error ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12, color: selected ? "#f1f5f9" : "#6c757d",
                fontSize: 14, outline: "none", appearance: "none", cursor: "pointer",
                transition: "border 0.2s, box-shadow 0.2s",
              }}
              onFocus={e => { e.target.style.border = "1px solid #28a745"; e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)"; }}
              onBlur={e => { e.target.style.border = error ? "1px solid #dc3545" : "1px solid rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}>
              <option value="" style={{ background: "#0a1628" }}>-- Select Status --</option>
              {ACTIONABLE_STATUSES.map(s => (
                <option key={s.value} value={s.value} style={{ background: "#0a1628", color: "#f1f5f9" }}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#6c757d" }}>
              <ChevronDown size={13}/>
            </div>
          </div>
          {error && <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>{error}</p>}
        </div>

        {/* Changed indicator */}
        {selected && selected !== task.status && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
            style={{ background: "rgba(40,167,69,0.08)", border: "1px solid rgba(40,167,69,0.2)", color: "#5dd879" }}>
            <CheckCircle2 size={12}/>
            Status will change to <span className="font-bold ml-1">{ACTIONABLE_STATUSES.find(s => s.value === selected)?.label}</span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={onClose} disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#9ca3af", cursor: "pointer" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}>
            Cancel
          </button>
          <div className="flex-1">
            <PrimaryBtn loading={loading} onClick={handleUpdate}>
              Update →
            </PrimaryBtn>
          </div>
        </div>
      </div>
      <style>{`@keyframes popIn{from{opacity:0;transform:scale(0.92) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}`}</style>
    </div>
  );
}
