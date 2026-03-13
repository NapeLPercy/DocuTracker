// pages/ViewAllTasks.jsx
// Manager-only view. Shows all tasks in a table.
// Action button opens a modal to update status to ERROR or APPROVED.
// Swap MOCK_TASKS with a real fetch in the useEffect comment below.

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  X,
  Filter,
  ChevronDown,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Hash,
} from "lucide-react";

import UpdateStatusModal from "./UpdateStatusModal";
import { formatDate, formatTime } from "../../utils/dateTimeFormat";
import StatusBadge from "./ui/StatusBadge";
import { allStatuses } from "../../utils/statusMeta";
import { getAllUsersTasks, updateTaskStatus } from "../services/taskService";

const STATUS_META = {
  PENDING: {
    label: "Pending",
    color: "#ffc107",
    bg: "rgba(255,193,7,0.12)",
    border: "rgba(255,193,7,0.3)",
    icon: <ClipboardList size={11} />,
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "#17a2b8",
    bg: "rgba(23,162,184,0.12)",
    border: "rgba(23,162,184,0.3)",
    icon: <Clock size={11} />,
  },
  COMPLETED: {
    label: "Completed",
    color: "#28a745",
    bg: "rgba(40,167,69,0.12)",
    border: "rgba(40,167,69,0.3)",
    icon: <CheckCircle2 size={11} />,
  },
  ERROR: {
    label: "Error",
    color: "#dc3545",
    bg: "rgba(220,53,69,0.12)",
    border: "rgba(220,53,69,0.3)",
    icon: <AlertTriangle size={11} />,
  },
  APPROVED: {
    label: "Approved",
    color: "#5dd879",
    bg: "rgba(93,216,121,0.12)",
    border: "rgba(93,216,121,0.3)",
    icon: <ShieldCheck size={11} />,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────────────────────────
export default function ViewAllTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilter] = useState("ALL");
  const [modal, setModal] = useState({ open: false, task: null });
  const [loading, setLoading] = useState(false);

  // TODO: replace with useEffect fetch
  // useEffect(() => { fetch("/api/tasks").then(r => r.json()).then(setTasks) }, [])

  const visible = useMemo(() => {
    return tasks.filter((t) => {
      const matchStatus = filterStatus === "ALL" || t.status === filterStatus;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.batch_number.toLowerCase().includes(q) ||
        t.assignedTo.toLowerCase().includes(q) ||
        (STATUS_META[t.status]?.label ?? "").toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [tasks, search, filterStatus]);

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      const { data } = await getAllUsersTasks();

      if (!data.success) {
        return;
      }
      setTasks(data.tasks);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  //users
  const handleUpdate = async (updated) => {

    setLoading(true);
    try {
      const { data } = await updateTaskStatus(updated.id, updated.status);
      if (!data.success) {
        setLoading(false);
        setModal({ open: false, task: null });
        return;
      }
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setModal({ open: false, task: null });
      }, 1400);
    }
  };

  const COLS = [
    "Assigned To",
    "Batch No.",
    "Date",
    "Start Time",
    "Finish Time",
    "Status",
    "Action",
  ];

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Heading */}
      <div className="mb-8">
        <h1
          className="text-2xl font-black text-white"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
        >
          All Tasks
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} across all workers
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

      {/* Search + filter */}
      <div className="flex gap-3 mb-5 flex-wrap">
        <div
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl flex-1"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            minWidth: 200,
          }}
        >
          <Search size={14} color="#6c757d" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search worker, batch, status…"
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
            value={filterStatus}
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
              All Statuses
            </option>
            {allStatuses.map((s) => (
              <option key={s} value={s} style={{ background: "#0a1628" }}>
                {STATUS_META[s]?.label ?? s}
              </option>
            ))}
          </select>
          <div
            style={{
              position: "absolute",
              right: 10,
              pointerEvents: "none",
              color: "#6c757d",
            }}
          >
            <ChevronDown size={12} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(40,167,69,0.15)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
        }}
      >
        {/* Scroll wrapper for mobile */}
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 780 }}
          >
            <thead>
              <tr
                style={{
                  background: "rgba(40,167,69,0.06)",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {COLS.map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "#6c757d",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan={COLS.length}>
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                      <ClipboardList size={36} color="rgba(40,167,69,0.25)" />
                      <p style={{ color: "#6c757d", fontSize: 13 }}>
                        No tasks found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                visible.map((task, idx) => (
                  <tr
                    key={task.id}
                    style={{
                      borderBottom:
                        idx < visible.length - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(40,167,69,0.04)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {/* Assigned To */}
                    <td style={{ padding: "14px 16px" }}>
                      <div className="flex items-center gap-2.5">
                        <div
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background:
                              "linear-gradient(135deg,#28a745,#155724)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "white",
                          }}
                        >
                          {task.assignedTo.charAt(0)}
                        </div>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#f1f5f9",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {task.assignedTo}
                        </span>
                      </div>
                    </td>

                    {/* Batch */}
                    <td style={{ padding: "14px 16px" }}>
                      <div className="flex items-center gap-1.5">
                        <Hash size={12} color="#6c757d" />
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: 13,
                            color: "#9ca3af",
                          }}
                        >
                          {task.batch_number}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 13,
                        color: "#9ca3af",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDate(task.date)}
                    </td>

                    {/* Start time */}
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        color: task.start_time ? "#17a2b8" : "#6c757d",
                        fontFamily: task.start_time ? "monospace" : "inherit",
                      }}
                    >
                      {formatTime(task.start_time)}
                    </td>

                    {/* Finish time */}
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: 13,
                        whiteSpace: "nowrap",
                        color: task.finish_time ? "#28a745" : "#6c757d",
                        fontFamily: task.finish_time ? "monospace" : "inherit",
                      }}
                    >
                      {formatTime(task.finish_time)}
                    </td>

                    {/* Status */}
                    <td style={{ padding: "14px 16px" }}>
                      <StatusBadge status={task.status} />
                    </td>

                    {/* Action */}
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => setModal({ open: true, task })}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 whitespace-nowrap"
                        style={{
                          background: "rgba(40,167,69,0.1)",
                          border: "1px solid rgba(40,167,69,0.25)",
                          color: "#28a745",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(40,167,69,0.22)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(40,167,69,0.1)")
                        }
                      >
                        <ShieldCheck size={12} /> Update
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      {visible.length > 0 && (
        <p className="text-xs mt-4 text-right" style={{ color: "#6c757d" }}>
          Showing {visible.length} of {tasks.length} task
          {tasks.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Modal */}
      <UpdateStatusModal
        isOpen={modal.open}
        task={modal.task}
        onClose={() => !loading && setModal({ open: false, task: null })}
        onUpdate={handleUpdate}
        loading={loading}
      />
    </div>
  );
}
