import { useState } from "react";
import { ClipboardList, Hash, ShieldCheck, Users } from "lucide-react";
import Input from "./ui/Input";
import SelectField from "./ui/SelectField";
import PrimaryBtn from "./ui/PrimaryBtn";
import { getWorkers } from "../services/authService";
import { addTask } from "../services/taskService";
import { addNotification } from "../services/notificationsService";
import { rolesData } from "../../utils/rolesData";
import { getAllBatch } from "../services/batchService";

const EMPTY = { role: "", batchNumber: "", workerId: "" };

export default function AssignTask() {
  const [form, setForm] = useState(EMPTY);
  const [workers, setWorkers] = useState([]); // populated after role fetch
  const [batches, setBatches] = useState([]); //polulated afte batch fetch
  const [fetching, setFetching] = useState(false);
  const [fetchingBatches, setFetchingBatches] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Role change → fetch workers
  const handleRoleChange = async (e) => {
    const role = e.target.value;
    setForm({ ...form, role, workerId: "" }); // reset batch + worker when role changes
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

  //when user selects a batch
  const handleBatchChange = async (e) => {
    const batchNumber = e.target.value;
    setForm({ ...form, batchNumber });
  };

  const fetchPendingBatches = async () => {
    setFetchingBatches(true);
    try {
      /*const { data } = await getAllBatch("PENDING");
      if (!data.success) {
        return;
      }*/
      setTimeout(() => {
        const x = [
          { batchNumber: 234567, addedOn: "12/03/2026" },
          { addedOn: "21/08/2026", batchNumber: 876543 },
        ];

        setBatches(x);
        setFetchingBatches(false);
      }, 10000);
      console.log("here is the data", data);
      //setWorkers(data.workers);
    } catch (err) {
      console.error("Failed to fetch document batches:", err);
      setBatches([]);
    } finally {
      //setFetchingBatches(false);
    }
  };

  useState(() => {
    fetchPendingBatches();
  }, []);

  // Field helpers
  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
    setSuccess(false);
  };

  // Validation
  const validate = () => {
    const e = {};
    if (!form.role) e.role = "Please select a role";
    if (!form.batchNumber.trim()) e.batchNumber = "Batch number is required";
    if (!form.persal_number) e.persal_number = "Please assign a worker";
    return e;
  };

  // Submit
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);

    //
    let assignedTo = workers.find((w) => {
      return w.persal_number === form.persal_number;
    });

    form.assignedTo = assignedTo.fullName;

    try {
      const { data } = await addTask(form);

      if (!data.success) {
        return;
      }

      const worker = workers.find(
        (w) => String(w.persal_number) === String(form.persal_number),
      );

      //add notification after successful task creation
      const res = await addNotification(
        "You have a new task assignment",
        form.persal_number,
      );

      console.log(res,"after adding a notification");
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

      {/* Form card */}
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
          {rolesData.map((r) => (
            <option
              key={r.value}
              value={r.value}
              style={{ background: "#0a1628", color: "#f1f5f9" }}
            >
              {r.label}
            </option>
          ))}
        </SelectField>

        {/* Batch Number */}
        <SelectField
          label="Batch Number"
          icon={
            fetchingBatches ? (
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
              <Hash size={16} />
            )
          }
          value={form.batchNumber}
          onChange={handleBatchChange}
          error={errors.batchNumber}
        >
          <option value="" style={{ background: "#0a1628" }}>
            {
              /*!form.batchNumber
              ? "-- Select a document Batch first --"
              :*/ fetchingBatches
                ? "Loading document batches…"
                : batches.length === 0
                  ? "No document batches found"
                  : "-- Select a document Batch --"
            }
          </option>
          {batches.map((r, i) => (
            <option
              key={r.batchNumber}
              value={r.batchNumber}
              style={{ background: "#0a1628", color: "#f1f5f9" }}
            >
              {r.batchNumber + "  " + r.addedOn}
            </option>
          ))}
        </SelectField>

        {/* Workers - shown after role selected */}
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
