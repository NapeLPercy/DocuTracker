// components/Sidebar.jsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, ContactRound, BarChart3, TrendingUp,
  Settings2, FileText, Upload, ClipboardList, ChevronLeft,
  ChevronRight, LogOut, ShieldCheck, HardHat,
} from "lucide-react";
import { getNavByRole } from "../../utils/navConfig";
// ── Icon registry — add any lucide icon you use in navConfig here ──────────
const ICONS = {
  LayoutDashboard, Users, ContactRound, BarChart3, TrendingUp,
  Settings2, FileText, Upload, ClipboardList,
};

const DocFlowLogo = () => (
  <svg width="30" height="30" viewBox="0 0 36 36" fill="none">
    <rect width="36" height="36" rx="9" fill="#28a745"/>
    <path d="M10 8h11l5 5v15a1 1 0 01-1 1H10a1 1 0 01-1-1V9a1 1 0 011-1z"
      fill="white" fillOpacity="0.92"/>
    <path d="M21 8l5 5h-4a1 1 0 01-1-1V8z" fill="white" fillOpacity="0.45"/>
    <line x1="13" y1="16" x2="23" y2="16" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="19.5" x2="23" y2="19.5" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="13" y1="23" x2="19" y2="23" stroke="#28a745" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function Sidebar({ user, onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const nav = getNavByRole(user?.role);
  const isManager = user?.role === "MANAGER";

  return (
    <aside
      style={{
        width: collapsed ? 68 : 240,
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a1628 0%, #0d1f12 100%)",
        borderRight: "1px solid rgba(40,167,69,0.15)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.28s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        zIndex: 40,
        flexShrink: 0,
      }}
    >
      {/* ── Logo ── */}
      <div style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        padding: collapsed ? "0 19px" : "0 20px",
        borderBottom: "1px solid rgba(40,167,69,0.1)",
        gap: 10,
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <DocFlowLogo/>
        {!collapsed && (
          <div>
            <p style={{ color: "white", fontWeight: 900, fontSize: 15, letterSpacing: "-0.02em", fontFamily: "Georgia, serif", lineHeight: 1 }}>
              DocuTracker
            </p>
            <p style={{ color: "#28a745", fontSize: 9, letterSpacing: "0.14em", marginTop: 2 }}>WORKSPACE</p>
          </div>
        )}
      </div>

      {/* ── Role badge ── */}
      {!collapsed && (
        <div style={{ padding: "12px 16px 4px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: isManager ? "rgba(40,167,69,0.12)" : "rgba(23,162,184,0.12)",
            border: `1px solid ${isManager ? "rgba(40,167,69,0.3)" : "rgba(23,162,184,0.3)"}`,
            borderRadius: 20, padding: "3px 10px",
          }}>
            {isManager
              ? <ShieldCheck size={11} color="#28a745"/>
              : <HardHat size={11} color="#17a2b8"/>}
            <span style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              color: isManager ? "#28a745" : "#17a2b8",
            }}>
              {isManager ? "MANAGER" : "WORKER"}
            </span>
          </div>
        </div>
      )}

      {/* ── Nav items ── */}
      <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "8px 0" }}>
        {nav.map((section) => (
          <div key={section.section} style={{ marginBottom: 4 }}>
            {!collapsed && (
              <p style={{
                fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
                color: "rgba(108,117,125,0.7)", padding: "10px 20px 4px",
                textTransform: "uppercase",
              }}>
                {section.section}
              </p>
            )}
            {collapsed && <div style={{ height: 8 }}/>}
            {section.items.map((item) => {
              const Icon = ICONS[item.icon];
              const active = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  title={collapsed ? item.label : undefined}
                  style={{
                    width: "100%", display: "flex", alignItems: "center",
                    gap: 11, padding: collapsed ? "10px 0" : "9px 20px",
                    justifyContent: collapsed ? "center" : "flex-start",
                    background: active
                      ? "linear-gradient(90deg, rgba(40,167,69,0.18) 0%, rgba(40,167,69,0.05) 100%)"
                      : "transparent",
                    border: "none",
                    borderLeft: active ? "3px solid #28a745" : "3px solid transparent",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    borderRadius: collapsed ? 0 : "0 8px 8px 0",
                    marginRight: collapsed ? 0 : 8,
                  }}
                  onMouseEnter={e => {
                    if (!active) {
                      e.currentTarget.style.background = "rgba(40,167,69,0.07)";
                      e.currentTarget.style.borderLeftColor = "rgba(40,167,69,0.4)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderLeftColor = "transparent";
                    }
                  }}
                >
                  {Icon && (
                    <Icon
                      size={17}
                      color={active ? "#28a745" : "#6c757d"}
                      strokeWidth={active ? 2.2 : 1.8}
                      style={{ flexShrink: 0, transition: "color 0.15s" }}
                    />
                  )}
                  {!collapsed && (
                    <span style={{
                      fontSize: 13, fontWeight: active ? 600 : 400,
                      color: active ? "#f1f5f9" : "#9ca3af",
                      whiteSpace: "nowrap", transition: "color 0.15s",
                    }}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ── User + Logout ── */}
      <div style={{
        borderTop: "1px solid rgba(40,167,69,0.1)",
        padding: collapsed ? "12px 0" : "12px 14px",
        display: "flex", flexDirection: "column", gap: 6,
      }}>
        {!collapsed && user && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10, padding: "8px 10px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #28a745, #155724)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
            }}>
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div style={{ overflow: "hidden" }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#f1f5f9", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.name}
              </p>
              <p style={{ fontSize: 10, color: "#6c757d", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={onLogout}
          title={collapsed ? "Sign Out" : undefined}
          style={{
            display: "flex", alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: 8, padding: collapsed ? "10px 0" : "8px 10px",
            background: "transparent", border: "none", borderRadius: 8,
            cursor: "pointer", width: "100%", transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(220,53,69,0.1)"}
          onMouseLeave={e => e.currentTarget.style.background = "transparent"}
        >
          <LogOut size={15} color="#dc3545" strokeWidth={1.8}/>
          {!collapsed && <span style={{ fontSize: 12, color: "#dc3545", fontWeight: 500 }}>Sign Out</span>}
        </button>
      </div>

      {/* ── Collapse toggle ── */}
      <button
        onClick={() => setCollapsed(p => !p)}
        style={{
          position: "absolute", top: 20, right: -12,
          width: 24, height: 24, borderRadius: "50%",
          background: "#0d1f12",
          border: "1px solid rgba(40,167,69,0.35)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 50, transition: "background 0.15s",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#28a745"}
        onMouseLeave={e => e.currentTarget.style.background = "#0d1f12"}
      >
        {collapsed
          ? <ChevronRight size={13} color="#28a745"/>
          : <ChevronLeft size={13} color="#28a745"/>}
      </button>
    </aside>
  );
}