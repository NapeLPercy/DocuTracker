// pages/AddTask.jsx
// Reuses Input and PrimaryBtn from your existing components.
// When a role is selected, fetchWorkersByRole() is called — swap the
// hardcoded mock inside that function with your real API call later.

import { useState } from "react";
import { ClipboardList, Hash, ShieldCheck, Users } from "lucide-react";
import Input from "./ui/Input";
import PrimaryBtn from "./ui/PrimaryBtn";
import { getWorkers } from "../services/authService";
import { addTask } from "../services/taskService";

const ROLES = [
  { value: "INDEXER", label: "Indexer" },
  { value: "CREATOR", label: "Batch Creator" },
  { value: "ASSEMBLER", label: "Assembler" },
  { value: "QC", label: "QC" },
  { value: "SCANNER", label: "Scanner" },
  { value: "RUNNER", label: "Runner" },
  { value: "tech-support", label: "Technical Support" },
];

const EMPTY = { role: "", batchNumber: "", workerId: "" };

// ── Shared select style helper ────────────────────────────────────────────────
function SelectField({
  label,
  icon,
  value,
  onChange,
  onFocus,
  onBlur,
  error,
  disabled,
  children,
}) {
  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-xs font-semibold uppercase mb-1.5"
          style={{ color: "#6c757d", letterSpacing: "0.1em" }}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div
            className="absolute left-3.5 pointer-events-none"
            style={{ color: "#6c757d" }}
          >
            {icon}
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{
            width: "100%",
            paddingLeft: "2.75rem",
            paddingRight: "2rem",
            paddingTop: "0.75rem",
            paddingBottom: "0.75rem",
            background: disabled
              ? "rgba(255,255,255,0.02)"
              : "rgba(255,255,255,0.04)",
            border: error
              ? "1px solid #dc3545"
              : "1px solid rgba(255,255,255,0.1)",
            borderRadius: 12,
            color: value ? "#f1f5f9" : "#6c757d",
            fontSize: 14,
            outline: "none",
            appearance: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            opacity: disabled ? 0.5 : 1,
            transition: "border 0.2s, box-shadow 0.2s",
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.target.style.border = "1px solid #28a745";
              e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)";
            }
            onFocus?.();
          }}
          onBlur={(e) => {
            e.target.style.border = error
              ? "1px solid #dc3545"
              : "1px solid rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
            onBlur?.();
          }}
        >
          {children}
        </select>

        {/* Chevron */}
        <div
          className="absolute right-3 pointer-events-none"
          style={{ color: "#6c757d" }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-xs mt-1.5" style={{ color: "#dc3545" }}>
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AssignTask() {
  const [form, setForm] = useState(EMPTY);
  const [workers, setWorkers] = useState([]); // populated after role fetch
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ── Role change → fetch workers ──────────────────────────────────────────
  const handleRoleChange = async (e) => {
    const role = e.target.value;
    setForm({ ...EMPTY, role }); // reset batch + worker when role changes
    setWorkers([]);
    setErrors({});
    setSuccess(false);

    if (!role) return;

    setFetching(true);
    try {
      const { data } = await getWorkers(role);
      if (!data.success) {
        return;
      }
      console.log("here is the data", data);
      setWorkers(data.workers);
    } catch (err) {
      console.error("Failed to fetch workers:", err);
      setWorkers([]);
    } finally {
      setFetching(false);
    }
  };

  // ── Field helpers ─────────────────────────────────────────────────────────
  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
    setSuccess(false);
  };

  // ── Validation ────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.role) e.role = "Please select a role";
    if (!form.batchNumber.trim()) e.batchNumber = "Batch number is required";
    if (!form.persal_number) e.persal_number = "Please assign a worker";
    return e;
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);

    //
    let assignedTo = workers.find(w=>{
      return w.persal_number === form.persal_number;
    });

    console.log("This is the chosen worker",assignedTo);
    form.assignedTo = assignedTo.fullName;
    console.log("With name",assignedTo); 
   try {
      const data = await addTask(form);
      if (!data.success) {
        return;
      }
      const worker = workers.find(
        (w) => String(w.persal_number) === String(form.persal_number),
      );
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setForm(EMPTY);
        setWorkers([]);
      }, 1600);
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      {/* ── Page heading ── */}
      <div className="mb-8">
        <h1
          className="text-2xl font-black text-white"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
        >
          Add Task
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
          Select a role to load available workers, then assign a batch.
        </p>
        <div
          style={{
            width: 40,
            height: 2,
            background: "linear-gradient(90deg, #28a745, transparent)",
            marginTop: 10,
          }}
        />
      </div>

      {/* ── Form card ── */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(40,167,69,0.15)",
          borderRadius: 20,
          padding: "2rem",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          maxWidth: 560,
        }}
      >
        {/* Role */}
        <SelectField
          label="Role"
          icon={<ShieldCheck size={16} />}
          value={form.role}
          onChange={handleRoleChange}
          error={errors.role}
        >
          <option value="" style={{ background: "#0a1628" }}>
            -- Select a Role --
          </option>
          {ROLES.map((r) => (
            <option
              key={r.value}
              value={r.value}
              style={{ background: "#0a1628", color: "#f1f5f9" }}
            >
              {r.label}
            </option>
          ))}
        </SelectField>

        {/* Batch number */}
        <Input
          label="Batch Number"
          type="text"
          placeholder="e.g. BATCH-20240312"
          value={form.batchNumber}
          onChange={set("batchNumber")}
          icon={<Hash size={16} />}
          error={errors.batchNumber}
        />

        {/* Workers — shown after role selected */}
        <div style={{ position: "relative" }}>
          <SelectField
            label="Assign Worker"
            icon={
              fetching ? (
                <svg
                  className="animate-spin"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="3"
                  />
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke="#28a745"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <Users size={16} />
              )
            }
            value={form.persal_number}
            onChange={set("persal_number")}
            error={errors.persal_number}
            disabled={!form.role || fetching || workers.length === 0}
          >
            <option value="" style={{ background: "#0a1628" }}>
              {!form.role
                ? "-- Select a role first --"
                : fetching
                  ? "Loading workers…"
                  : workers.length === 0
                    ? "No workers found for this role"
                    : "-- Select a Worker --"}
            </option>
            {workers.map((w) => (
              <option
                key={w.persal_number}
                value={w.persal_number}
                style={{ background: "#0a1628", color: "#f1f5f9" }}
              >
                {w.fullName}
              </option>
            ))}
          </SelectField>

          {/* Worker count hint */}
          {!fetching && workers.length > 0 && (
            <p className="text-xs -mt-2 mb-4" style={{ color: "#28a745" }}>
              {workers.length} worker{workers.length !== 1 ? "s" : ""} available
            </p>
          )}
        </div>

        {/* Success banner */}
        {success && (
          <div
            className="flex items-center gap-2 mb-5 px-4 py-3 rounded-xl text-sm"
            style={{
              background: "rgba(40,167,69,0.12)",
              border: "1px solid rgba(40,167,69,0.3)",
              color: "#5dd879",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Task assigned successfully!
          </div>
        )}

        <PrimaryBtn loading={loading} onClick={handleSubmit}>
          Assign Task →
        </PrimaryBtn>
      </div>
    </div>
  );
}
