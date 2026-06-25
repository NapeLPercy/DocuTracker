import { chat } from "../services/chatbotService";
import { useState, useRef, useEffect } from "react";
import { Send, Bot, MessageSquare } from "lucide-react";
import styles from "./chatbotStyles";
import BotResponse from "./BotResponse";
import TypingIndicator from "./TypingIndicator";

// ── Main Chatbot ──────────────────────────────────────────────────────────────
export default function Chatbot({
  placeholder = "Ask anything about DocuTracker…",
  userName = "You",
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Auto-grow textarea
  const handleInput = (e) => {
    setInput(e.target.value);
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    // Add user message
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      // Call parent's send handler — expects structured JSON back
      const response = await chat(text);
      console.log(response.data.answer);
      const reply = JSON.parse(response.data.answer);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "bot", data: reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "bot",
          data: {
            type: "not_found",
            title: "Something went wrong",
            summary: "Unable to get a response. Please try again.",
            items: null,
            sections: null,
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const canSend = input.trim().length > 0 && !loading;

  return (
    <div style={styles.wrapper}>
      {/* ── Header ── */}
      <div style={styles.header}>
        <div style={styles.headerAvatar}>
          <Bot size={18} color="white" />
        </div>
        <div>
          <p style={styles.headerTitle}>DocuBot: DocuTracker's Intelligent Assistant</p>
          <div style={styles.headerSub}>
            <span style={styles.statusDot} />
            <span>Online · Ask me anything</span>
          </div>
        </div>
      </div>

      {/* ── Messages ── */}
      <div style={styles.messagesArea}>
        {/* Empty state */}
        {messages.length === 0 && !loading && (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>
              <MessageSquare size={24} color="#28a745" />
            </div>
            <p style={styles.emptyTitle}>Hello I am DocuBot, How can I help?</p>
            <p style={styles.emptySubtitle}>
              Ask about roles, workflow steps, task statuses, reports, or
              anything about the platform.
            </p>
          </div>
        )}

        {/* Message list */}
        {messages.map((msg) => (
          <div key={msg.id} style={styles.messageRow(msg.role === "user")}>
            {/* Avatar */}
            <div style={styles.messageAvatar(msg.role === "user")}>
              {msg.role === "user" ? (
                <span>{userName.charAt(0).toUpperCase()}</span>
              ) : (
                <Bot size={14} />
              )}
            </div>

            {/* Bubble */}
            <div style={styles.messageBubble(msg.role === "user")}>
              {msg.role === "user" ? (
                <span>{msg.text}</span>
              ) : (
                <BotResponse data={msg.data} />
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {loading && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* ── Input bar ── */}
      <div style={styles.inputBar}>
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={loading}
          style={{
            ...styles.textarea,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "text",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid rgba(40,167,69,0.5)";
            e.target.style.boxShadow = "0 0 0 3px rgba(40,167,69,0.12)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          style={styles.sendBtn(!canSend)}
          onMouseEnter={(e) => {
            if (canSend) e.currentTarget.style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
          title="Send (Enter)"
        >
          {loading ? (
            <svg
              className="animate-spin"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="3"
              />
              <path
                d="M12 2a10 10 0 0 1 10 10"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <Send size={16} color="white" />
          )}
        </button>
      </div>

      <style>{`
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        @keyframes typingDot {
          0%,60%,100% { transform:translateY(0); opacity:0.4; }
          30%          { transform:translateY(-5px); opacity:1; }
        }
      `}</style>
    </div>
  );
}
