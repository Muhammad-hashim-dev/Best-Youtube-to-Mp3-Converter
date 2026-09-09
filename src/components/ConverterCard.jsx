import React, { useState } from "react";
import {
  Clipboard,
  Download,
  RotateCcw,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Music,
  ShieldCheck,
} from "lucide-react";

export default function ConverterCard({
  inputUrl,
  setInputUrl,
  uiState,
  errorMessage,
  downloadPayload,
  onConvert,
  onReset,
}) {
  const [quality, setQuality] = useState("192");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [pasteMessage, setPasteMessage] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (text) {
        setInputUrl(text);
        setPasteMessage("Pasted!");

        setTimeout(() => {
          setPasteMessage("");
        }, 1800);
      }
    } catch (error) {
      console.error("Clipboard error:", error);
      setPasteMessage("Paste failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rightsConfirmed) {
      return;
    }

    onConvert(e);
  };

  const handleDownload = () => {
    if (!downloadPayload?.downloadUrl) return;

    const link = document.createElement("a");
    link.href = downloadPayload.downloadUrl;
    link.download = `${downloadPayload.title || "clearaudio"}.mp3`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isProcessing = uiState === "PROCESSING";
  const isSuccess = uiState === "SUCCESS";
  const isError = uiState === "ERROR";

  return (
    <div
      className="converterCard"
      style={styles.card}
    >
      {/* Decorative glow */}
      <div style={styles.topGlow}></div>

      {/* Header */}
      <div style={styles.cardHeader}>
        <div style={styles.iconBox}>
          <Music size={22} strokeWidth={2.2} />
        </div>

        <div>
          <h2 style={styles.cardTitle}>
            Convert YouTube to MP3
          </h2>

          <p style={styles.cardSubtitle}>
            Paste a YouTube video link to get started.
          </p>
        </div>
      </div>

      {/* SUCCESS */}
      {isSuccess ? (
        <div style={styles.successBlock}>
          <div style={styles.successBox}>
            <div style={styles.successIcon}>
              <CheckCircle2 size={22} />
            </div>

            <div style={styles.successContent}>
              <strong style={styles.successTitle}>
                Conversion complete
              </strong>

              <span style={styles.successText}>
                Your MP3 is ready to download.
              </span>
            </div>
          </div>

          <div style={styles.fileCard}>
            <div style={styles.fileIcon}>
              <Music size={20} />
            </div>

            <div style={styles.fileInfo}>
              <strong style={styles.fileTitle}>
                {downloadPayload?.title || "Extracted Audio Track"}
              </strong>

              <span style={styles.fileMeta}>
                MP3 • {quality} kbps
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            style={styles.submitBtn}
          >
            <Download size={18} />
            Download MP3
          </button>

          <button
            type="button"
            onClick={onReset}
            style={styles.secondaryBtn}
          >
            <RotateCcw size={17} />
            Convert another video
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* URL INPUT */}
          <div style={styles.inputWrapper}>
            <label style={styles.fieldLabel}>
              YouTube video URL
            </label>

            <div style={styles.inputContainer}>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                style={styles.textInput}
                disabled={isProcessing}
                autoComplete="off"
              />

              <button
                type="button"
                onClick={handlePaste}
                style={styles.pasteBtn}
                disabled={isProcessing}
              >
                <Clipboard size={14} />

                {pasteMessage || "Paste"}
              </button>
            </div>
          </div>

          {/* OPTIONS */}
          <div style={styles.optionsGrid}>
            {/* QUALITY */}
            <div style={styles.dropdownWrapper}>
              <label style={styles.fieldLabel}>
                Audio quality
              </label>

              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
                style={styles.selectMenu}
                disabled={isProcessing}
              >
                <option value="128">
                  128 kbps — Small
                </option>

                <option value="192">
                  192 kbps — Balanced
                </option>

                <option value="256">
                  256 kbps — High
                </option>

                <option value="320">
                  320 kbps — Maximum
                </option>
              </select>

              <p style={styles.dropdownSubtext}>
                Higher bitrate usually means a larger file.
              </p>
            </div>
          </div>

          {/* RIGHTS CHECKBOX */}
          <label
            style={{
              ...styles.checkboxContainer,
              ...(rightsConfirmed
                ? styles.checkboxActive
                : {}),
            }}
          >
            <input
              type="checkbox"
              checked={rightsConfirmed}
              onChange={(e) =>
                setRightsConfirmed(e.target.checked)
              }
              style={styles.checkboxInput}
              disabled={isProcessing}
            />

            <div>
              <p style={styles.checkboxText}>
                I confirm that I have the right or permission
                to download and convert this content.
              </p>

              <span style={styles.checkboxHint}>
                Please only convert content you are legally
                allowed to use.
              </span>
            </div>
          </label>

          {/* GUIDANCE */}
          <div style={styles.guidanceBox}>
            <ShieldCheck size={17} />

            <span>
              Supported: individual YouTube videos, Shorts,
              embeds and YouTube Music links.
            </span>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={
              isProcessing ||
              !inputUrl.trim() ||
              !rightsConfirmed
            }
            style={{
              ...styles.submitBtn,
              ...(isProcessing ||
              !inputUrl.trim() ||
              !rightsConfirmed
                ? styles.submitBtnDisabled
                : {}),
            }}
          >
            {isProcessing ? (
              <>
                <Loader2
                  size={18}
                  style={styles.spinner}
                />

                Converting...
              </>
            ) : (
              <>
                <Music size={18} />

                Convert to MP3
              </>
            )}
          </button>

          {/* ERROR */}
          {isError && (
            <div style={styles.errorBox}>
              <AlertCircle size={18} />

              <span>
                {errorMessage ||
                  "Something went wrong. Please try again."}
              </span>
            </div>
          )}

          {/* LEGAL */}
          <p style={styles.legalFineprint}>
            ClearAudio only processes supported links. You are
            responsible for ensuring that you have the necessary
            rights or permission to download and convert the
            content.
          </p>
        </form>
      )}
    </div>
  );
}

const styles = {
  card: {
    background:
      "linear-gradient(145deg, var(--card-bg), var(--feature-bg))",
    padding: "32px",
    borderRadius: "26px",
    border: "1px solid var(--border-color)",
    boxShadow: "var(--card-shadow)",
    width: "100%",
    maxWidth: "640px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },

  topGlow: {
    position: "absolute",
    top: "-120px",
    right: "-100px",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, var(--accent-glow), transparent 70%)",
    pointerEvents: "none",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "28px",
    position: "relative",
    zIndex: 1,
  },

  iconBox: {
    width: "46px",
    height: "46px",
    minWidth: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, var(--accent-color), #ff1744)",
    color: "#ffffff",
    boxShadow:
      "0 8px 25px rgba(255, 0, 51, 0.25)",
  },

  cardTitle: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "1.18rem",
    fontWeight: "850",
    letterSpacing: "-0.4px",
  },

  cardSubtitle: {
    margin: "4px 0 0",
    color: "var(--text-muted)",
    fontSize: "0.78rem",
    lineHeight: "1.5",
  },

  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "20px",
    position: "relative",
    zIndex: 1,
  },

  fieldLabel: {
    fontSize: "0.85rem",
    fontWeight: "750",
    color: "var(--text-primary)",
  },

  inputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "14px",
    overflow: "hidden",
    transition: "all 0.2s ease",
  },

  textInput: {
    width: "100%",
    padding: "16px 90px 16px 16px",
    background: "transparent",
    border: "none",
    color: "var(--text-primary)",
    fontSize: "0.92rem",
    outline: "none",
  },

  pasteBtn: {
    position: "absolute",
    right: "8px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "8px 11px",
    background: "var(--soft-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "9px",
    color: "var(--text-primary)",
    fontSize: "0.78rem",
    cursor: "pointer",
    fontWeight: "700",
  },

  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "18px",
    marginBottom: "18px",
  },

  dropdownWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  selectMenu: {
    width: "100%",
    padding: "14px",
    background: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "14px",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    cursor: "pointer",
    outline: "none",
  },

  dropdownSubtext: {
    margin: "1px 0 0",
    fontSize: "0.7rem",
    color: "var(--text-muted)",
    lineHeight: "1.4",
  },

  checkboxContainer: {
    display: "flex",
    gap: "11px",
    padding: "17px",
    background: "var(--soft-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "15px",
    cursor: "pointer",
    userSelect: "none",
    alignItems: "flex-start",
    marginBottom: "16px",
    transition: "all 0.2s ease",
  },

  checkboxActive: {
    borderColor: "var(--accent-border)",
    background: "var(--accent-soft)",
  },

  checkboxInput: {
    transform: "scale(1.2)",
    marginTop: "3px",
    cursor: "pointer",
    accentColor: "var(--accent-color)",
  },

  checkboxText: {
    margin: 0,
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
    fontWeight: "600",
  },

  checkboxHint: {
    display: "block",
    marginTop: "4px",
    fontSize: "0.68rem",
    color: "var(--text-muted)",
    lineHeight: "1.4",
  },

  guidanceBox: {
    width: "100%",
    padding: "14px 16px",
    background: "var(--soft-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "14px",
    color: "var(--text-secondary)",
    fontSize: "0.78rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textAlign: "center",
    marginBottom: "16px",
    fontWeight: "600",
  },

  submitBtn: {
    width: "100%",
    minHeight: "54px",
    padding: "15px 25px",
    background:
      "linear-gradient(135deg, var(--accent-color), #ff1744)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "0.92rem",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    boxShadow:
      "0 10px 28px rgba(255, 0, 51, 0.22)",
    transition: "all 0.25s ease",
  },

  submitBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none",
  },

  secondaryBtn: {
    width: "100%",
    minHeight: "54px",
    padding: "15px 25px",
    background: "var(--secondary-button-bg)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-color)",
    borderRadius: "14px",
    fontSize: "0.92rem",
    fontWeight: "750",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },

  successBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    position: "relative",
    zIndex: 1,
  },

  successBox: {
    width: "100%",
    padding: "17px",
    background: "rgba(16, 185, 129, 0.08)",
    border: "1px solid rgba(16, 185, 129, 0.25)",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    gap: "11px",
  },

  successIcon: {
    width: "38px",
    height: "38px",
    minWidth: "38px",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(16, 185, 129, 0.12)",
    color: "#10b981",
  },

  successContent: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  successTitle: {
    color: "var(--text-primary)",
    fontSize: "0.9rem",
  },

  successText: {
    color: "var(--text-muted)",
    fontSize: "0.75rem",
  },

  fileCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "15px",
    background: "var(--soft-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "14px",
  },

  fileIcon: {
    width: "40px",
    height: "40px",
    minWidth: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "11px",
    background: "var(--accent-soft)",
    color: "var(--accent-color)",
  },

  fileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    minWidth: 0,
  },

  fileTitle: {
    color: "var(--text-primary)",
    fontSize: "0.82rem",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  fileMeta: {
    color: "var(--text-muted)",
    fontSize: "0.7rem",
  },

  errorBox: {
    marginTop: "15px",
    padding: "15px",
    background: "rgba(239, 68, 68, 0.08)",
    border: "1px solid rgba(239, 68, 68, 0.25)",
    borderRadius: "14px",
    color: "#ef4444",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "0.85rem",
    lineHeight: "1.5",
  },

  legalFineprint: {
    margin: "16px 0 0",
    fontSize: "0.68rem",
    color: "var(--text-muted)",
    lineHeight: "1.6",
    textAlign: "center",
  },

  spinner: {
    animation: "spin 1s linear infinite",
  },
};