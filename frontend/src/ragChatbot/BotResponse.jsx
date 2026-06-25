import {AlertCircle} from "lucide-react";
import styles from "./chatbotStyles";

export default function BotResponse({ data }) {
  if (!data) return null;

  const { type, title, summary, items, sections } = data;

  // not_found
  if (type === "not_found") {
    return (
      <div>
        {title && <p style={styles.responseTitle}>{title}</p>}
        <div style={styles.notFoundBox}>
          <AlertCircle size={15} color="#dc3545" style={{ flexShrink: 0 }} />
          <p style={styles.notFoundText}>
            {summary ??
              "I couldn't find information on that. Try rephrasing your question."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Title */}
      {title && <p style={styles.responseTitle}>{title}</p>}

      {/* Summary */}
      {summary && <p style={styles.responseSummary}>{summary}</p>}

      {/* Items — list type */}
      {type === "list" && items?.length > 0 && (
        <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {items.map((item, i) => (
            <li key={i} style={styles.listItem}>
              <div style={styles.listBullet}>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#28a745"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span style={styles.listText}>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Items — steps type */}
      {type === "steps" && items?.length > 0 && (
        <ol style={{ padding: 0, margin: 0, listStyle: "none" }}>
          {items.map((item, i) => (
            <li key={i} style={styles.stepItem}>
              <div style={styles.stepNumber(i)}>{i + 1}</div>
              <span style={styles.listText}>{item}</span>
            </li>
          ))}
        </ol>
      )}

      {/* Items — paragraph type (just renders as text) */}
      {type === "paragraph" && items?.length > 0 && (
        <div>
          {items.map((item, i) => (
            <p key={i} style={{ ...styles.listText, marginBottom: 8 }}>
              {item}
            </p>
          ))}
        </div>
      )}

      {/* Sections — mixed type */}
      {sections?.length > 0 && (
        <div style={{ marginTop: items?.length ? 14 : 0 }}>
          {sections.map((sec, i) => (
            <div key={i} style={styles.sectionBlock}>
              {sec.title && <p style={styles.sectionTitle}>{sec.title}</p>}
              {Array.isArray(sec.content) ? (
                sec.content.map((line, j) => (
                  <p
                    key={j}
                    style={{ ...styles.sectionContent, marginBottom: 4 }}
                  >
                    {line}
                  </p>
                ))
              ) : sec.content ? (
                <p style={styles.sectionContent}>{sec.content}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}