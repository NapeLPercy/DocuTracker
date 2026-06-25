import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ← adjust path to your AuthContext
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AppShell() {
  const { user, logout } = useAuth(); // ← adjust to match your context shape
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // call your context logout
    navigate("/"); // redirect to login
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      
      background: "#0a1628", // dark base — matches your auth background
    }}>

      {/* ── Sidebar ── */}
      <Sidebar user={user} onLogout={handleLogout}/>

      {/* ── Main column ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── Top navbar ── */}
        <Navbar user={user}/>

        {/* ── Page content ── */}
        <main style={{
          flex: 1,
          overflowY: "auto",
          padding: "28px 32px",
          background: "linear-gradient(160deg, #0a1628 0%, #0b1e10 100%)",
          position: "relative",
        }}>
          {/* Subtle grid texture */}
          <div style={{
            position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
            backgroundImage: `
              linear-gradient(rgba(40,167,69,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(40,167,69,0.03) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}/>

          {/* Radial glow */}
          <div style={{
            position: "fixed", top: 0, right: 0,
            width: "50vw", height: "50vh",
            background: "radial-gradient(ellipse, rgba(40,167,69,0.06) 0%, transparent 70%)",
            pointerEvents: "none", zIndex: 0,
          }}/>

          {/* Route outlet renders here */}
          <div style={{ position: "relative", zIndex: 1 }}>
            
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
}