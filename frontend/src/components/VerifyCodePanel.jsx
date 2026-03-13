import { useState, useEffect, useRef } from "react";
import GlassCard from "./GlassCard";
import BrandHeader from "./ui/BrandHeader";
import PrimaryBtn from "./ui/PrimaryBtn";
import Input from "./ui/Input";
// ── SVG Icons ──────────────────────────────────────────────────────────────

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);
const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default function VerifyCodePanel  ({ email, onBack, onVerify }){
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef([]);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(p => p - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (val, idx) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    setError("");
    if (val && idx < 5) inputRefs.current[idx + 1]?.focus();
  };
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) inputRefs.current[idx - 1]?.focus();
  };
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (paste.length === 6) {
      setCode(paste.split(""));
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };
  const handleVerify = () => {
    const full = code.join("");
    if (full.length < 5) { setError("Enter all 6 digits"); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onVerify(full); }, 1500);
  };

  return (
    <GlassCard visible={mounted}>
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-medium mb-6 transition-colors duration-150"
        style={{ background: "none", border: "none", cursor: "pointer", color: "#6c757d", padding: 0 }}
        onMouseEnter={e => e.currentTarget.style.color = "#28a745"}
        onMouseLeave={e => e.currentTarget.style.color = "#6c757d"}>
        <ArrowLeftIcon/> Back
      </button>
      <BrandHeader subtitle={`We sent a 6-digit code to ${email}`}/>
      <div className="flex justify-center mb-6">
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(40,167,69,0.12)",
          border: "1px solid rgba(40,167,69,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#28a745"
        }}>
          <ShieldIcon/>
        </div>
      </div>
      <label className="block text-xs font-semibold tracking-widest uppercase mb-3"
        style={{ color: "#6c757d", letterSpacing: "0.1em" }}>Verification Code</label>
      <div className="flex gap-2 justify-center mb-2" onPaste={handlePaste}>
        {code.map((digit, i) => (
          <input key={i} ref={el => (inputRefs.current[i] = el)}
            type="text" inputMode="numeric" maxLength={1} value={digit}
            onChange={e => handleChange(e.target.value, i)}
            onKeyDown={e => handleKeyDown(e, i)}
            className="text-center text-xl font-bold rounded-xl transition-all duration-200 outline-none"
            style={{
              width: 48, height: 56,
              background: digit ? "rgba(40,167,69,0.12)" : "rgba(255,255,255,0.04)",
              border: digit ? "1px solid rgba(40,167,69,0.5)" : "1px solid rgba(255,255,255,0.1)",
              color: digit ? "#5dd879" : "#f1f5f9",
              caretColor: "#28a745",
            }}
            onFocus={e => { e.target.style.border = "1px solid #28a745"; e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.15)"; }}
            onBlur={e => { e.target.style.border = digit ? "1px solid rgba(40,167,69,0.5)" : "1px solid rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
          />
        ))}
      </div>
      {error && <p className="text-xs text-center mt-1 mb-3" style={{ color: "#dc3545" }}>{error}</p>}
      <div className="text-center mb-5 mt-3">
        {resendTimer > 0 ? (
          <span className="text-xs" style={{ color: "#6c757d" }}>Resend code in <span style={{ color: "#28a745" }}>{resendTimer}s</span></span>
        ) : (
          <button className="text-xs font-medium" style={{ background: "none", border: "none", cursor: "pointer", color: "#28a745", padding: 0 }}
            onClick={() => setResendTimer(30)}
            onMouseEnter={e => e.currentTarget.style.color = "#5dd879"}
            onMouseLeave={e => e.currentTarget.style.color = "#28a745"}>
            Resend code
          </button>
        )}
      </div>
      <PrimaryBtn loading={loading} onClick={handleVerify}>Verify Code →</PrimaryBtn>
    </GlassCard>
  );
};
