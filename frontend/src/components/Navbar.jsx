// components/Navbar.jsx
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell, Search, ChevronRight, X, Check } from "lucide-react";

// Static mock notifications — replace with real API data
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    text: "Document #1042 approved by manager",
    time: "2m ago",
    read: false,
  },
  {
    id: 2,
    text: "New task assigned: Q2 Report Review",
    time: "18m ago",
    read: false,
  },
  {
    id: 3,
    text: "Team meeting scheduled for 3:00 PM",
    time: "1h ago",
    read: true,
  },
  {
    id: 4,
    text: "Upload deadline reminder: EOD today",
    time: "2h ago",
    read: true,
  },
];

// Build a readable breadcrumb from the current path
function useBreadcrumb() {
  const { pathname } = useLocation();
  const parts = pathname.replace(/^\//, "").split("/").filter(Boolean);
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
}

export default function Navbar({ user }) {
  const breadcrumb = useBreadcrumb();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [searchVal, setSearchVal] = useState("");

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const dismiss = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <header
      style={{
        height: 64,
        background: "rgba(10,22,40,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(40,167,69,0.12)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 30,
      }}
    >
      {/* ── Breadcrumb ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
        {breadcrumb.map((crumb, i) => (
          <span
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {i > 0 && <ChevronRight size={12} color="#6c757d" />}
            <span
              style={{
                fontSize: 13,
                color: i === breadcrumb.length - 1 ? "#f1f5f9" : "#6c757d",
                fontWeight: i === breadcrumb.length - 1 ? 600 : 400,
              }}
            >
              {crumb}
            </span>
          </span>
        ))}
      </div>

      {/* ── Search bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 10,
          padding: "6px 12px",
          width: 220,
          transition: "border 0.2s",
        }}
        onFocus={() => {}}
      >
        <Search size={14} color="#6c757d" />
        <input
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search documents…"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#f1f5f9",
            fontSize: 12,
            width: "100%",
          }}
        />
      </div>

      {/* ── Notifications ── */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setNotifOpen((p) => !p)}
          style={{
            position: "relative",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            width: 38,
            height: 38,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(40,167,69,0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
          }
        >
          <Bell size={16} color="#9ca3af" />
          {unread > 0 && (
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#dc3545",
                boxShadow: "0 0 6px rgba(220,53,69,0.7)",
              }}
            />
          )}
        </button>

        {/* Dropdown */}
        {notifOpen && (
          <div
            style={{
              position: "absolute",
              top: 46,
              right: 0,
              width: 320,
              background: "rgba(10,22,40,0.97)",
              border: "1px solid rgba(40,167,69,0.2)",
              borderRadius: 14,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              zIndex: 100,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px 10px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13 }}>
                Notifications{" "}
                {unread > 0 && (
                  <span
                    style={{
                      marginLeft: 6,
                      background: "#dc3545",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "1px 6px",
                      borderRadius: 20,
                    }}
                  >
                    {unread}
                  </span>
                )}
              </span>

              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#28a745",
                    fontSize: 11,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Check size={11} /> Mark all read
                </button>
              )}
            </div>
            <div style={{ maxHeight: 280, overflowY: "auto" }}>
              {notifications.length === 0 ? (
                <p
                  style={{
                    color: "#6c757d",
                    fontSize: 12,
                    textAlign: "center",
                    padding: "24px 0",
                  }}
                >
                  All caught up!
                </p>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      padding: "11px 16px",
                      background: n.read
                        ? "transparent"
                        : "rgba(40,167,69,0.05)",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      transition: "background 0.15s",
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        marginTop: 4,
                        flexShrink: 0,
                        background: n.read ? "transparent" : "#28a745",
                        boxShadow: n.read ? "none" : "0 0 6px #28a745",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          color: n.read ? "#9ca3af" : "#f1f5f9",
                          fontSize: 12,
                          lineHeight: 1.5,
                        }}
                      >
                        {n.text}
                      </p>
                      <p
                        style={{ color: "#6c757d", fontSize: 10, marginTop: 2 }}
                      >
                        {n.time}
                      </p>
                    </div>
                    <button
                      onClick={() => dismiss(n.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#6c757d",
                        lineHeight: 0,
                        padding: 0,
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#dc3545")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#6c757d")
                      }
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Avatar ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #28a745, #155724)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "white",
            border: "2px solid rgba(40,167,69,0.4)",
            flexShrink: 0,
          }}
        >
          {user?.name?.charAt(0).toUpperCase() ?? "U"}
        </div>
        <div className="hidden md:block">
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "#f1f5f9",
              lineHeight: 1.2,
            }}
          >
            {user?.name ?? "User"}
          </p>
          <p style={{ fontSize: 10, color: "#6c757d" }}>
            {user?.role === "MANAGER" ? "Manager" : "Worker"}
          </p>
        </div>
      </div>
    </header>
  );
}
