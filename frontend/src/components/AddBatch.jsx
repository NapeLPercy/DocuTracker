import { useState } from "react";
import { ClipboardList, Hash, ShieldCheck, Users } from "lucide-react";
import Input from "./ui/Input";
import SelectField from "./ui/SelectField";
import PrimaryBtn from "./ui/PrimaryBtn";
import { getWorkers } from "../services/authService";
import { addBatch } from "../services/batchService";
import { addNotification } from "../services/notificationsService";

export default function AddBatch() {
  const [form, setForm] = useState({ batchNumber: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Field helpers
  const set = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
    setSuccess(false);
  };

  // Validation
  const validate = () => {
    const e = {};
    if (form.batchNumber.trim()) {
      if (!validateBatch(form.batchNumber)) {
        e.batchNumber = "Batch number must only be numbers more than 10";
      }
    } else e.batchNumber = "Batch number is required";
    return e;
  };

  //validate batch number
  function validateBatch(batchNumber) {
    if (batchNumber.trim().length < 10) return false;
    for (let i = 0; i < batchNumber.length; i++) {
      if (isNaN(batchNumber.charAt(i))) return false;
    }
    return true;
  }
  // Submit
  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    setLoading(true);

    try {
      const { data } = await addBatch(form);

      if (!data.success) {
        return;
      }
      //add notification after successful task creation
      //await addNotification("You have a new task assignment", form.persal_number);
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setForm({ batchNumber: "" });
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
          Add Documents Batch
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
          Enter a batch number so that digitization can begin
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
            Batch added successfully!
          </div>
        )}

        <PrimaryBtn loading={loading} onClick={handleSubmit}>
          Add a Batch →
        </PrimaryBtn>
      </div>
    </div>
  );
}
