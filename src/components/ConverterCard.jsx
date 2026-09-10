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

import { useLanguage } from "../context/LanguageContext";

export default function ConverterCard({
  inputUrl,
  setInputUrl,
  uiState,
  errorMessage,
  downloadPayload,
  onConvert,
  onReset,
}) {
  const { t } = useLanguage();

  const [quality, setQuality] = useState("192");
  const [rightsConfirmed, setRightsConfirmed] = useState(false);
  const [pasteMessage, setPasteMessage] = useState("");

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (text) {
        setInputUrl(text);
        setPasteMessage(
          t.converter?.pasted ||
            t.converter?.pasteSuccess ||
            "URL pasted successfully."
        );

        setTimeout(() => {
          setPasteMessage("");
        }, 1800);
      }
    } catch (error) {
      console.error("Clipboard error:", error);

      setPasteMessage(
        t.converter?.pasteFailed ||
          t.converter?.pasteError ||
          "Unable to paste from clipboard."
      );
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
    link.download = `${
      downloadPayload.title || "clearaudio"
    }.mp3`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // App.jsx uses "CONVERTING"
  // Keep PROCESSING support as well so existing behavior remains compatible.
  const isProcessing =
    uiState === "CONVERTING" ||
    uiState === "PROCESSING";

  const isSuccess = uiState === "SUCCESS";
  const isError = uiState === "ERROR";

  const qualityOptions = {
    small:
      t.converter?.qualityOptions?.small ||
      t.converter?.quality128 ||
      "128 kbps",

    balanced:
      t.converter?.qualityOptions?.balanced ||
      t.converter?.quality192 ||
      "192 kbps",

    high:
      t.converter?.qualityOptions?.high ||
      t.converter?.quality256 ||
      "256 kbps",

    maximum:
      t.converter?.qualityOptions?.maximum ||
      t.converter?.quality320 ||
      "320 kbps",
  };

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
            {t.converter?.title || "YouTube to MP3 Converter"}
          </h2>

          <p style={styles.cardSubtitle}>
            {t.converter?.subtitle ||
              t.converter?.description ||
              "Convert YouTube videos to high-quality MP3 audio."}
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
                {t.converter?.successTitle ||
                  t.converter?.success ||
                  "Conversion complete"}
              </strong>

              <span style={styles.successText}>
                {t.converter?.successText ||
                  t.converter?.completed ||
                  "Your MP3 is ready to download."}
              </span>
            </div>
          </div>

          <div style={styles.fileCard}>
            <div style={styles.fileIcon}>
              <Music size={20} />
            </div>

            <div style={styles.fileInfo}>
              <strong style={styles.fileTitle}>
                {downloadPayload?.title ||
                  t.converter?.fileFallback ||
                  "Extracted Audio Track"}
              </strong>

              <span style={styles.fileMeta}>
                {t.converter?.fileType || "MP3"} • {quality}{" "}
                {t.converter?.bitrate || "kbps"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            style={styles.submitBtn}
          >
            <Download size={18} />

            {t.converter?.download || "Download MP3"}
          </button>

          <button
            type="button"
            onClick={onReset}
            style={styles.secondaryBtn}
          >
            <RotateCcw size={17} />

            {t.converter?.another ||
              t.converter?.reset ||
              "Convert another"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* URL INPUT */}
          <div style={styles.inputWrapper}>
            <label style={styles.fieldLabel}>
              {t.converter?.urlLabel ||
                t.converter?.inputLabel ||
                "YouTube URL"}
            </label>

            <div style={styles.inputContainer}>
              <input
                type="url"
                value={inputUrl}
                onChange={(e) =>
                  setInputUrl(e.target.value)
                }
                placeholder={
                  t.converter?.placeholder ||
                  "Paste YouTube video URL here..."
                }
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

                {pasteMessage ||
                  t.converter?.paste ||
                  "Paste"}
              </button>
            </div>
          </div>

          {/* OPTIONS */}
          <div style={styles.optionsGrid}>
            {/* QUALITY */}
            <div style={styles.dropdownWrapper}>
              <label style={styles.fieldLabel}>
                {t.converter?.quality ||
                  t.converter?.qualityLabel ||
                  "Audio quality"}
              </label>

              <select
                value={quality}
                onChange={(e) =>
                  setQuality(e.target.value)
                }
                style={styles.selectMenu}
                disabled={isProcessing}
              >
                <option value="128">
                  {qualityOptions.small}
                </option>

                <option value="192">
                  {qualityOptions.balanced}
                </option>

                <option value="256">
                  {qualityOptions.high}
                </option>

                <option value="320">
                  {qualityOptions.maximum}
                </option>
              </select>

              <p style={styles.dropdownSubtext}>
                {t.converter?.qualityHint ||
                  "Higher bitrate provides better audio quality."}
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
                {t.converter?.rights ||
                  t.converter?.rightsText ||
                  "I confirm that I have the right to download this content."}
              </p>

              <span style={styles.checkboxHint}>
                {t.converter?.rightsHint ||
                  t.converter?.rightsConfirmation ||
                  "Only download content you are legally allowed to use."}
              </span>
            </div>
          </label>

          {/* GUIDANCE */}
          <div style={styles.guidanceBox}>
            <ShieldCheck size={17} />

            <span>
              {t.converter?.supported ||
                "Supports YouTube videos, Shorts, and YouTube Music links."}
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

                {t.converter?.converting ||
                  t.converter?.processing ||
                  "Converting..."}
              </>
            ) : (
              <>
                <Music size={18} />

                {t.converter?.convert ||
                  "Convert to MP3"}
              </>
            )}
          </button>

          {/* ERROR */}
          {isError && (
            <div style={styles.errorBox}>
              <AlertCircle size={18} />

              <span>
                {errorMessage ||
                  t.converter?.error ||
                  "Something went wrong. Please try again."}
              </span>
            </div>
          )}

          {/* LEGAL */}
          <p style={styles.legalFineprint}>
            {t.converter?.legal ||
              t.converter?.rightsText ||
              "By using this converter, you confirm that you have the necessary rights to download the content."}
          </p>
        </form>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "var(--card-bg)",
    padding: "28px",
    borderRadius: "24px",
    border: "1px solid var(--border-color)",
    boxShadow:
      "0 20px 50px rgba(0, 0, 0, 0.08)",
    width: "100%",
    maxWidth: "640px",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },

  topGlow: {
    position: "absolute",
    top: "-140px",
    right: "-120px",
    width: "360px",
    height: "360px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(255, 20, 70, 0.16) 0%, rgba(255, 20, 70, 0.08) 30%, rgba(255, 20, 70, 0.02) 55%, transparent 72%)",
    pointerEvents: "none",
    zIndex: 0,
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
    width: "48px",
    height: "48px",
    minWidth: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, #ff1744, #ff003c)",
    color: "#ffffff",
    boxShadow:
      "0 10px 26px rgba(255, 0, 55, 0.22)",
  },

  cardTitle: {
    margin: 0,
    color: "var(--text-primary)",
    fontSize: "1.2rem",
    fontWeight: "850",
    lineHeight: "1.25",
    letterSpacing: "-0.4px",
  },

  cardSubtitle: {
    margin: "5px 0 0",
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
    minHeight: "62px",
    background: "var(--input-bg)",
    border: "1px solid rgba(120, 120, 130, 0.28)",
    borderRadius: "15px",
    overflow: "hidden",
    transition:
      "border-color 0.2s ease, box-shadow 0.2s ease",
  },

  textInput: {
    width: "100%",
    height: "60px",
    padding: "14px 95px 14px 16px",
    background: "transparent",
    border: "none",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    outline: "none",
  },

  pasteBtn: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "9px 12px",
    background: "var(--soft-bg)",
    border: "1px solid rgba(120, 120, 130, 0.22)",
    borderRadius: "10px",
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
    position: "relative",
    zIndex: 1,
  },

  dropdownWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  selectMenu: {
    width: "100%",
    minHeight: "58px",
    padding: "0 15px",
    background: "var(--input-bg)",
    border: "1px solid rgba(120, 120, 130, 0.28)",
    borderRadius: "15px",
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
    border: "1px solid rgba(120, 120, 130, 0.20)",
    borderRadius: "15px",
    cursor: "pointer",
    userSelect: "none",
    alignItems: "flex-start",
    marginBottom: "16px",
    transition: "all 0.2s ease",
    position: "relative",
    zIndex: 1,
  },

  checkboxActive: {
    borderColor: "rgba(255, 20, 70, 0.45)",
    background:
      "rgba(255, 20, 70, 0.04)",
  },

  checkboxInput: {
    width: "18px",
    height: "18px",
    minWidth: "18px",
    marginTop: "2px",
    cursor: "pointer",
    accentColor: "#ff1744",
  },

  checkboxText: {
    margin: 0,
    fontSize: "0.78rem",
    color: "var(--text-secondary)",
    lineHeight: "1.5",
    fontWeight: "650",
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
    minHeight: "48px",
    padding: "12px 15px",
    background: "var(--soft-bg)",
    border: "1px solid rgba(120, 120, 130, 0.20)",
    borderRadius: "14px",
    color: "var(--text-secondary)",
    fontSize: "0.76rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textAlign: "center",
    marginBottom: "16px",
    fontWeight: "600",
    lineHeight: "1.4",
    position: "relative",
    zIndex: 1,
  },

  submitBtn: {
    width: "100%",
    minHeight: "54px",
    padding: "14px 22px",
    background:
      "linear-gradient(135deg, #ff1744, #f5003d)",
    color: "#ffffff",
    border: "none",
    borderRadius: "14px",
    fontSize: "0.9rem",
    fontWeight: "800",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    whiteSpace: "nowrap",
    boxShadow:
      "0 10px 28px rgba(255, 0, 55, 0.20)",
    transition: "all 0.25s ease",
    position: "relative",
    zIndex: 1,
  },

  submitBtnDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    boxShadow: "none",
  },

  secondaryBtn: {
    width: "100%",
    minHeight: "52px",
    padding: "13px 22px",
    background: "var(--secondary-button-bg)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-color)",
    borderRadius: "14px",
    fontSize: "0.88rem",
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
    gap: "14px",
    position: "relative",
    zIndex: 1,
  },

  successBox: {
    width: "100%",
    padding: "16px",
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
    fontSize: "0.88rem",
  },

  successText: {
    color: "var(--text-muted)",
    fontSize: "0.74rem",
  },

  fileCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
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
    padding: "14px",
    background: "rgba(239, 68, 68, 0.08)",
    border: "1px solid rgba(239, 68, 68, 0.25)",
    borderRadius: "14px",
    color: "#ef4444",
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "0.82rem",
    lineHeight: "1.5",
  },

  legalFineprint: {
    margin: "15px auto 0",
    maxWidth: "590px",
    fontSize: "0.67rem",
    color: "var(--text-muted)",
    lineHeight: "1.55",
    textAlign: "center",
    position: "relative",
    zIndex: 1,
  },

  spinner: {
    animation: "spin 1s linear infinite",
  },
};