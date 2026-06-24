// components/chatbot/chatbotStyles.js

const styles = {
  // ── Shell ────────────────────────────────────────────────────────────────
  wrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    minHeight: 0,
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(40,167,69,0.15)",
    borderRadius: 20,
    overflow: "hidden",
    boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
  },

  // ── Header ───────────────────────────────────────────────────────────────
  header: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(40,167,69,0.05)",
    flexShrink: 0,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#28a745,#155724)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 0 12px rgba(40,167,69,0.4)",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#f1f5f9",
    lineHeight: 1.2,
  },
  headerSub: {
    fontSize: 11,
    color: "#6c757d",
    display: "flex",
    alignItems: "center",
    gap: 5,
    marginTop: 1,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#28a745",
    boxShadow: "0 0 6px #28a745",
  },

  // ── Messages area ─────────────────────────────────────────────────────────
  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "20px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    scrollBehavior: "smooth",
  },

  // ── Empty state ───────────────────────────────────────────────────────────
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 12,
    padding: "40px 20px",
    textAlign: "center",
  },
  emptyIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    background: "rgba(40,167,69,0.1)",
    border: "1px solid rgba(40,167,69,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "#f1f5f9",
    fontFamily: "Georgia, serif",
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6c757d",
    lineHeight: 1.6,
    maxWidth: 280,
  },

  // ── Message row ───────────────────────────────────────────────────────────
  messageRow: (isUser) => ({
    display: "flex",
    flexDirection: isUser ? "row-reverse" : "row",
    alignItems: "flex-start",
    gap: 10,
    animation: "msgIn 0.25s ease both",
  }),
  messageAvatar: (isUser) => ({
    width: 30,
    height: 30,
    borderRadius: "50%",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    background: isUser
      ? "linear-gradient(135deg,#17a2b8,#138496)"
      : "linear-gradient(135deg,#28a745,#155724)",
    color: "white",
    boxShadow: isUser
      ? "0 0 8px rgba(23,162,184,0.3)"
      : "0 0 8px rgba(40,167,69,0.3)",
  }),
  messageBubble: (isUser) => ({
    maxWidth: "78%",
    padding: isUser ? "10px 16px" : "14px 18px",
    borderRadius: isUser ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
    background: isUser
      ? "linear-gradient(135deg,rgba(23,162,184,0.25),rgba(23,162,184,0.15))"
      : "rgba(255,255,255,0.04)",
    border: isUser
      ? "1px solid rgba(23,162,184,0.3)"
      : "1px solid rgba(255,255,255,0.08)",
    color: "#f1f5f9",
    fontSize: 13,
    lineHeight: 1.65,
    wordBreak: "break-word",
  }),

  // ── Bot response rendering ─────────────────────────────────────────────────
  responseTitle: {
    fontSize: 15,
    fontWeight: 800,
    color: "#f1f5f9",
    fontFamily: "Georgia, serif",
    letterSpacing: "-0.01em",
    marginBottom: 6,
  },
  responseSummary: {
    fontSize: 13,
    color: "#9ca3af",
    lineHeight: 1.7,
    marginBottom: 12,
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 8,
  },
  listBullet: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: "rgba(40,167,69,0.15)",
    border: "1px solid rgba(40,167,69,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 2,
  },
  listText: {
    fontSize: 13,
    color: "#d1d5db",
    lineHeight: 1.65,
  },
  stepItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  stepNumber: (i) => ({
    width: 22,
    height: 22,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#28a745,#155724)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 800,
    color: "white",
    flexShrink: 0,
    marginTop: 1,
    boxShadow: "0 0 8px rgba(40,167,69,0.3)",
  }),
  sectionBlock: {
    marginBottom: 14,
    paddingLeft: 12,
    borderLeft: "2px solid rgba(40,167,69,0.35)",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#28a745",
    marginBottom: 5,
    letterSpacing: "0.02em",
  },
  sectionContent: {
    fontSize: 13,
    color: "#d1d5db",
    lineHeight: 1.7,
  },
  notFoundBox: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    borderRadius: 10,
    background: "rgba(220,53,69,0.07)",
    border: "1px solid rgba(220,53,69,0.2)",
  },
  notFoundText: {
    fontSize: 13,
    color: "#9ca3af",
  },

  // ── Typing loader ─────────────────────────────────────────────────────────
  typingRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    animation: "msgIn 0.25s ease both",
  },
  typingBubble: {
    padding: "12px 16px",
    borderRadius: "4px 18px 18px 18px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    alignItems: "center",
    gap: 5,
  },
  typingDot: (i) => ({
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#28a745",
    animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
  }),

  // ── Input bar ─────────────────────────────────────────────────────────────
  inputBar: {
    display: "flex",
    alignItems: "flex-end",
    gap: 10,
    padding: "14px 16px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    background: "rgba(0,0,0,0.2)",
    flexShrink: 0,
  },
  textarea: {
    flex: 1,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "10px 14px",
    color: "#f1f5f9",
    fontSize: 13,
    lineHeight: 1.6,
    resize: "none",
    outline: "none",
    fontFamily: "inherit",
    maxHeight: 120,
    transition: "border 0.2s, box-shadow 0.2s",
  },
  sendBtn: (disabled) => ({
    width: 42,
    height: 42,
    borderRadius: 12,
    background: disabled
      ? "rgba(40,167,69,0.2)"
      : "linear-gradient(135deg,#28a745,#218838)",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all 0.2s",
    boxShadow: disabled ? "none" : "0 4px 16px rgba(40,167,69,0.35)",
  }),
};

export default styles;