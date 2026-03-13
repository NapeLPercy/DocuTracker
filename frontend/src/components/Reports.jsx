// pages/Reports.jsx
// - Manager / Runner  → sees ALL reports (with email action)
// - Everyone else     → sees only their own reports (no role column, no email)
// Swap MOCK_ALL_REPORTS / MOCK_MY_REPORTS with real fetch calls inside the
// useEffect at the bottom of the file.

import { useState, useMemo, useEffect } from "react";
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
import { useAuth } from "../context/AuthContext"; // ← adjust to your hook
import { getReports } from "../services/reportService";
import ReportRow from "./ui/ReportRow";
import EmailModal from "./EmailModal";

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

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function Reports() {
  const { user } = useAuth();
  const isManager = user?.role === "MANAGER" || user?.role === "RUNNER";

  // TODO: replace with useEffect + real fetch:
  // useEffect(() => { fetch(`/api/reports${isManager ? "" : `?userId=${user.id}`}`) ... }, [])

  const [allReports, setAllReports] = useState([]);
  

  const [search, setSearch] = useState("");
  const [filterType, setFilter] = useState("ALL");
  const [emailModal, setEmail] = useState({ open: false, report: null });
  const [sending, setSending] = useState(false);

  const visible = useMemo(() => {
    return allReports.filter((r) => {
      const matchType = filterType === "ALL" || r.type === filterType;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        r.id.toLowerCase().includes(q) ||
        r.message.toLowerCase().includes(q) ||
        (r.workerName ?? "").toLowerCase().includes(q) ||
        (r.role ?? "").toLowerCase().includes(q) ||
        (TYPE_META[r.type]?.label ?? "").toLowerCase().includes(q);
      return matchType && matchSearch;
    });
  }, [allReports, search, filterType]);

  useEffect(() => {
    getUserReports();
  }, []);

  const getUserReports = async () => {
    try {
      const res = await getReports();
      console.log(res.data.reports);
      setAllReports(res.data.reports);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const handleSendEmail = (payload) => {
    setSending(true);
    // TODO: replace with real email API call
    setTimeout(() => {
      console.log("Email sent:", payload);
      setSending(false);
      setEmail({ open: false, report: null });
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto w-full">
      {/* ── Heading ── */}
      <div className="mb-8">
        <h1
          className="text-2xl font-black text-white"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
        >
          {isManager ? "All Reports" : "My Reports"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
          {isManager
            ? `${allReports.length} report${allReports.length !== 1 ? "s" : ""} submitted across all workers`
            : `${allReports.length} report${allReports.length !== 1 ? "s" : ""} submitted by you`}
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

      {/* ── Search + filter ── */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl flex-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            minWidth: 180,
          }}
        >
          <Search size={14} color="#6c757d" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isManager ? "Search ID, worker, type…" : "Search ID, type…"
            }
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#f1f5f9",
              fontSize: 13,
              width: "100%",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#6c757d",
                lineHeight: 0,
                padding: 0,
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        <div className="relative flex items-center">
          <Filter
            size={13}
            color="#6c757d"
            style={{ position: "absolute", left: 12, pointerEvents: "none" }}
          />
          <select
            value={filterType}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              paddingLeft: "2rem",
              paddingRight: "2rem",
              paddingTop: "0.6rem",
              paddingBottom: "0.6rem",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              color: "#f1f5f9",
              fontSize: 13,
              outline: "none",
              appearance: "none",
              cursor: "pointer",
            }}
          >
            <option value="ALL" style={{ background: "#0a1628" }}>
              All Types
            </option>
            <option value="ERROR" style={{ background: "#0a1628" }}>
              Error
            </option>
            <option value="SUGGESTION" style={{ background: "#0a1628" }}>
              Suggestion
            </option>
          </select>
          <div
            style={{
              position: "absolute",
              right: 10,
              pointerEvents: "none",
              color: "#6c757d",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── Table card ── */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(40,167,69,0.15)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isManager
              ? "120px 130px 130px 1fr 40px"
              : "120px 130px 1fr 40px",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(40,167,69,0.06)",
            gap: 12,
          }}
        >
          {[ "Type", isManager && "Full name", isManager &&"Role", "Date", ""]
            .filter(Boolean)
            .map((h, i) => (
              <span
                key={i}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#6c757d",
                  textTransform: "uppercase",
                }}
              >
                {h}
              </span>
            ))}
        </div>

        {/* Rows */}
        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Flag size={36} color="rgba(40,167,69,0.25)" />
            <p style={{ color: "#6c757d", fontSize: 13 }}>No reports found</p>
          </div>
        ) : (
          visible.map((report, idx) => (
            <ReportRow
              key={report.id}
              report={report}
              isManager={isManager}
              onEmail={(r) => setEmail({ open: true, report: r })}
              index={idx}
            />
          ))
        )}
      </div>

      {/* Footer count */}
      {visible.length > 0 && (
        <p className="text-xs mt-4 text-right" style={{ color: "#6c757d" }}>
          Showing {visible.length} of {allReports.length} report
          {allReports.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Email modal */}
      <EmailModal
        isOpen={emailModal.open}
        report={emailModal.report}
        onClose={() => !sending && setEmail({ open: false, report: null })}
        onSend={handleSendEmail}
        loading={sending}
      />

      <style>{`
        @keyframes popIn      { from{opacity:0;transform:scale(0.92) translateY(8px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes fadeSlideIn{ from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes expandIn   { from{opacity:0;transform:translateY(-4px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
