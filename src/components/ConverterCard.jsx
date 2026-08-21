import React, { useState } from 'react';
import { Loader2, Download, RefreshCw, AlertTriangle, Clipboard } from 'lucide-react';

export default function ConverterCard({ inputUrl, setInputUrl, uiState, errorMessage, downloadPayload, onConvert, onReset }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputUrl(text);
    } catch (err) {
      console.error('Clipboard request denied');
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    const a = document.createElement('a');
    a.href = downloadPayload.downloadUrl;
    a.setAttribute('target', '_self');
    a.click();
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div style={styles.card}>
      {uiState !== 'SUCCESS' ? (
        <form onSubmit={(e) => { e.preventDefault(); if(isConfirmed) onConvert(e); }}>
          
          {/* Top Row Layout Form Segment */}
          <div style={styles.rowLayout}>
            <div style={styles.inputWrapper}>
              <label style={styles.fieldLabel}>YouTube video link</label>
              <div style={styles.inputContainer}>
                <input
                  type="url"
                  placeholder="https://youtube.com..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  style={styles.textInput}
                  required
                />
                <button type="button" onClick={handlePaste} style={styles.pasteBtn}>
                  <Clipboard size={14} style={{ marginRight: '5px' }} /> Paste
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={uiState === 'PROCESSING' || !isConfirmed} 
              style={{ ...styles.submitBtn, opacity: (!isConfirmed || uiState === 'PROCESSING') ? 0.6 : 1 }}
            >
              {uiState === 'PROCESSING' ? <Loader2 className="animate-spin" size={18} /> : 'Convert to MP3'}
            </button>
          </div>

          {/* Middle Row Controls Grid Array */}
          <div style={styles.rowLayout}>
            <div style={styles.dropdownWrapper}>
              <label style={styles.fieldLabel}>Audio quality</label>
              <select style={styles.selectMenu}>
                <option>192 kbps MP3</option>
                <option>128 kbps MP3</option>
                <option>320 kbps MP3 (HD)</option>
              </select>
              <p style={styles.dropdownSubtext}>A higher bitrate cannot add detail that isn't in the source audio.</p>
            </div>

            <label style={styles.checkboxContainer}>
              <input 
                type="checkbox" 
                checked={isConfirmed} 
                onChange={(e) => setIsConfirmed(e.target.checked)} 
                style={styles.checkboxInput} 
              />
              <span style={styles.checkboxText}>I confirm that I have the right or permission to download and convert this content.</span>
            </label>
          </div>

          {/* Core Interactive Baseline Status Window */}
          <div style={styles.guidanceBox}>Paste a supported YouTube URL to get started.</div>

          <p style={styles.legalFineprint}>
            Supported links: youtube.com/watch, youtu.be, youtube.com/shorts and music.youtube.com single videos. Maximum 90 minutes and 200 MB, up to 10 conversions per hour. Only convert content you own or are permitted to process — private, restricted or protected content is rejected.
          </p>
        </form>
      ) : (
        /* Success Completed Action Presenter Segment */
        <div style={styles.successBlock}>
          <div style={styles.guidanceBox}>✓ {downloadPayload.title}</div>
          <div style={styles.rowLayout}>
            <button onClick={handleDownload} disabled={isDownloading} style={{ ...styles.submitBtn, flex: 1 }}>
              {isDownloading ? 'Saving File...' : 'Download Now'}
            </button>
            <button onClick={() => { setIsConfirmed(false); onReset(); }} style={{ ...styles.submitBtn, flex: 1, backgroundColor: '#2d3142' }}>
              Convert Next
            </button>
          </div>
        </div>
      )}

      {uiState === 'ERROR' && (
        <div style={{ ...styles.guidanceBox, backgroundColor: 'rgba(239, 68, 68, 0.08)', color: '#dc3545', borderColor: '#f5c6cb', marginTop: '15px' }}>
          <AlertTriangle size={16} style={{ marginRight: '8px' }} /> {errorMessage}
        </div>
      )}
    </div>
  );
}

// 100% Match Production Variables CSS Mock Sheet
const styles = {
  card: { backgroundColor: '#ffffff', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', border: '1px solid #e8e8e2', width: '100%', maxWidth: '640px' },
  rowLayout: { display: 'flex', gap: '20px', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap' },
  inputWrapper: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '260px' },
  fieldLabel: { fontSize: '0.95rem', fontWeight: '700', color: '#111111' },
  inputContainer: { position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '12px', overflow: 'hidden' },
  textInput: { width: '100%', padding: '16px 85px 16px 16px', backgroundColor: 'transparent', border: 'none', color: '#111111', fontSize: '0.95rem', outline: 'none' },
  pasteBtn: { position: 'absolute', right: '10px', display: 'flex', alignItems: 'center', padding: '8px 12px', backgroundColor: '#f5f4ee', border: '1px solid #cccccc', borderRadius: '8px', color: '#111111', fontSize: '0.82rem', cursor: 'pointer', fontWeight: '600' },
  submitBtn: { padding: '16px 28px', height: '54px', backgroundColor: '#007074', color: '#ffffff', border: 'none', borderRadius: '25px', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s', whiteSpace: 'nowrap' },
  dropdownWrapper: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '240px' },
  selectMenu: { width: '100%', padding: '14px', backgroundColor: '#ffffff', border: '1px solid #cccccc', borderRadius: '14px', color: '#111111', fontSize: '0.95rem', cursor: 'pointer', outline: 'none' },
  dropdownSubtext: { margin: '4px 0 0 0', fontSize: '0.75rem', color: '#666666', lineHeight: '1.4' },
  checkboxContainer: { flex: 1, display: 'flex', gap: '12px', padding: '20px', backgroundColor: '#f3f2eb', borderRadius: '16px', cursor: 'pointer', userSelect: 'none', minWidth: '240px', alignItems: 'flex-start' },
  checkboxInput: { transform: 'scale(1.2)', marginTop: '3px', cursor: 'pointer' },
  checkboxText: { margin: '0', fontSize: '0.82rem', color: '#333333', lineHeight: '1.5', fontWeight: '500' },
  guidanceBox: { width: '100%', padding: '16px', backgroundColor: '#eeeeee', border: '1px solid #dddddd', borderRadius: '14px', color: '#444444', fontSize: '0.92rem', textAlign: 'center', marginBottom: '16px', fontWeight: '500' },
  legalFineprint: { margin: '0', fontSize: '0.75rem', color: '#777777', lineHeight: '1.6', textAlign: 'justify' },
  successBlock: { display: 'flex', flexDirection: 'column', gap: '16px' }
};
