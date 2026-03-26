import { ClipboardList, Hash, ShieldCheck, Users } from "lucide-react";
export default function SelectField({
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
