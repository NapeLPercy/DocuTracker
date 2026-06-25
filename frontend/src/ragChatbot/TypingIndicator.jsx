import {Bot} from "lucide-react";
import styles from "./chatbotStyles";
export default function TypingIndicator() {
  return (
    <div style={styles.typingRow}>
      <div style={styles.messageAvatar(false)}>
        <Bot size={14} />
      </div>
      <div style={styles.typingBubble}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={styles.typingDot(i)} />
        ))}
      </div>
      <style>{`
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0);   opacity: 0.4; }
          30%            { transform: translateY(-5px); opacity: 1;   }
        }
      `}</style>
    </div>
  );
}
