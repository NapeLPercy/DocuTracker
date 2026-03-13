// pages/MyTasks.jsx
// Reuses ConfirmModal from your components folder.
// fetchMyTasks() is the only function to swap when connecting a real API.

import { useState, useMemo, useEffect } from "react";
import {
  Play,
  Square,
  Search,
  Filter,
  ClipboardList,
  X,
  Send,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import { getAllTasks } from "../services/taskService";
import { useAuth } from "../context/AuthContext";
import ReportModal from "./ReportModal";
import TaskCard from "./ui/TaskCard";
import { statusOrder, allStatuses } from "../../utils/statusMeta";
import { endTask } from "../services/taskService";
import { startTask } from "../services/taskService";
import { reportTask } from "../services/taskService";

const statusMeta = {
  IN_PROGRESS: {
    label: "In Progress",
    color: "#17a2b8",
    bg: "rgba(23,162,184,0.12)",
    border: "rgba(23,162,184,0.3)",
    icon: <Clock size={13} />,
    order: 0,
  },
  PENDING: {
    label: "Pending",
    color: "#ffc107",
    bg: "rgba(255,193,7,0.12)",
    border: "rgba(255,193,7,0.3)",
    icon: <ClipboardList size={13} />,
    order: 1,
  },
  ERROR: {
    label: "Error",
    color: "#dc3545",
    bg: "rgba(220,53,69,0.12)",
    border: "rgba(220,53,69,0.3)",
    icon: <AlertTriangle size={13} />,
    order: 2,
  },
  COMPLETED: {
    label: "Completed",
    color: "#28a745",
    bg: "rgba(40,167,69,0.12)",
    border: "rgba(40,167,69,0.3)",
    icon: <CheckCircle2 size={13} />,
    order: 3,
  },
  APPROVED: {
    label: "Approved",
    color: "#5dd879",
    bg: "rgba(93,216,121,0.12)",
    border: "rgba(93,216,121,0.3)",
    icon: <ShieldCheck size={13} />,
    order: 4,
  },
};
// ── Main Page ─────────────────────────────────────────────────────────────────
export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilter] = useState("ALL");
  const [confirmModal, setConfirm] = useState({
    open: false,
    type: null,
    task: null,
  });
  const [reportModal, setReport] = useState({ open: false, task: null });
  const [actionLoading, setLoading] = useState(false);

  const {user} = useAuth();
  //current task
  //const [task, setTask] = useState(null);

  // ── Sort: IN_PROGRESS → PENDING → ERROR → COMPLETED → APPROVED
  const sorted = useMemo(() => {
    return [...tasks].sort(
      (a, b) =>
        (statusOrder[a.status]?.order ?? 99) -
        (statusOrder[b.status]?.order ?? 99),
    );
  }, [tasks]);

  useEffect(() => {
    handleGetTasks();
  }, []);

  const handleGetTasks = async () => {
    console.log(user, "This is the user data");
    try {
      const { data } = await getAllTasks(user?.persalNumber, user?.role);

      if (!data.success) {
        return;
      }

      setTasks(data.tasks);
      console.log(data);
    } catch (error) {
      alert(error || "Failed to fetch tasks");
    } finally {
    }
  };

  // ── Filter + search
  const visible = useMemo(() => {
    return sorted.filter((t) => {
      const matchStatus = filterStatus === "ALL" || t.status === filterStatus;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        t.batch_number.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        (statusMeta[t.status]?.label ?? "").toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [sorted, search, filterStatus]);

  // ── Confirm modal openers
  const handleStart = (task) => {
    setConfirm({ open: true, type: "start", task });
  };
  const handleEnd = (task) => {
    setConfirm({ open: true, type: "end", task });
  };
  const handleReport = (task) => {
    setReport({ open: true, task });
  };

  // ── Confirm action
  const handleConfirm = async () => {
    const { type, task } = confirmModal;
    setLoading(true);

    //
    try {
      const res =
        type === "start" ? await startTask(task.id) : await endTask(task.id);

      if (!res.data.success) {
        setLoading(false);
        setConfirm({ open: false, type: null, task: null });
        return;
      }
      alert(res.data.message);

      setTimeout(() => {
        setTasks((prev) =>
          prev.map((t) => {
            if (t.id !== task.id) return t;
            if (type === "start") {
              console.log("Task started:", t);
              return {
                ...t,
                status: "IN_PROGRESS",
                start_time: new Date().toISOString(),
              };
            }
            if (type === "end") {
              console.log("Task ended:", t);
              return {
                ...t,
                status: "COMPLETED",
                finish_time: new Date().toISOString(),
              };
            }
            return t;
          }),
        );
      }, 1400);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
      setConfirm({ open: false, type: null, task: null });
    }
  };

  // ── Report submit
  const handleReportSubmit = async (task, data) => {
    setLoading(true);

    data.role = user.role;
    console.log(data,"here is it");


    try {
      const res = await reportTask(task.id, data);
      if (!res.data.success) {
        setLoading(false);
        setReport({ open: false, task: null });
        return;
      }

      alert(res.data.message );
    } catch (error) {
      alert(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setReport({ open: false, task: null });
      }, 1200);
    }
  };

  // ── Confirm modal content based on action type
  const confirmContent =
    {
      start: {
        icon: <Play size={28} />,
        title: "Start Task?",
        subtitle: `This will mark batch ${confirmModal.task?.batch_number} as In Progress.`,
        confirmText: "Start Task",
        confirmColor: "success",
      },
      end: {
        icon: <Square size={28} />,
        title: "End Task?",
        subtitle: `This will mark batch ${confirmModal.task?.batch_number} as Completed.`,
        confirmText: "End Task",
        confirmColor: "info",
      },
    }[confirmModal.type] ?? {};

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* ── Heading ── */}
      <div className="mb-8">
        <h1
          className="text-2xl font-black text-white"
          style={{ fontFamily: "Georgia, serif", letterSpacing: "-0.02em" }}
        >
          My Tasks
        </h1>
        <p className="text-sm mt-1" style={{ color: "#6c757d" }}>
          {tasks.length} task{tasks.length !== 1 ? "s" : ""} assigned to you
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

      {/* ── Search + Filter ── */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {/* Search */}
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
            placeholder="Search batch, status…"
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

        {/* Filter */}
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
                {statusMeta[s]?.label ?? s}
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

      {/* ── Cards ── */}
      {visible.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <ClipboardList size={40} color="rgba(40,167,69,0.25)" />
          <p style={{ color: "#6c757d", fontSize: 13 }}>No tasks found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStart={handleStart}
              onEnd={handleEnd}
              onReport={handleReport}
            />
          ))}
        </div>
      )}

      {/* ── Confirm Modal (Start / End) ── */}
      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() =>
          !actionLoading && setConfirm({ open: false, type: null, task: null })
        }
        onConfirm={handleConfirm}
        loading={actionLoading}
        {...confirmContent}
      />

      {/* ── Report Modal ── */}
      <ReportModal
        isOpen={reportModal.open}
        task={reportModal.task}
        onClose={() => !actionLoading && setReport({ open: false, task: null })}
        onSubmit={handleReportSubmit}
        loading={actionLoading}
      />
    </div>
  );
}
