import React from 'react';

export default function HowItWorks({ onBackToHome }) {
  return (
    <main style={styles.container}>
      {/* Breadcrumbs */}
      <div style={styles.breadcrumbs}>
        <span style={styles.crumbLink} onClick={onBackToHome}>Home</span>
        <span style={styles.crumbDivider}>/</span>
        <span style={styles.crumbActive}>How it works</span>
      </div>

      <h1 style={styles.mainHeading}>How to convert YouTube to MP3</h1>
      <p style={styles.leadText}>Five short steps, no software and no account. This guide also explains what to check before you convert anything.</p>

      <h2 style={styles.subHeading}>Before you start: check you are allowed to convert it</h2>
      <p style={styles.bodyText}>Converting is a technical action; whether it is lawful depends on the content. Convert your own uploads, openly licensed material, public-domain recordings, or content where the rights holder has given you permission. If none of those apply, do not convert it.</p>

      {/* 5 Steps Render Grid */}
      <div style={styles.stepsWrapper}>
        <div style={styles.stepBlock}>
          <h3 style={styles.stepTitle}>Step 1 — Copy the video link</h3>
          <p style={styles.bodyText}>On desktop, copy the address from the browser bar. On mobile, tap <strong>Share</strong> then <strong>Copy link</strong>. The link should point to one video, not a playlist or a channel.</p>
        </div>

        <div style={styles.stepBlock}>
          <h3 style={styles.stepTitle}>Step 2 — Paste the link into the converter</h3>
          <p style={styles.bodyText}>Open the converter on the homepage and paste the link, or press the <strong>Paste</strong> button so your browser fills it in for you. Supported forms include <em>://youtube.com…</em>, <em>youtu.be/…</em>, <em>://youtube.com…</em> and <em>music.youtube.com</em>.</p>
        </div>

        <div style={styles.stepBlock}>
          <h3 style={styles.stepTitle}>Step 3 — Choose an audio quality</h3>
          <p style={styles.bodyText}>128 kbps keeps files small and is fine for speech. 192 kbps is a balanced default. 256 and 320 kbps preserve more detail in music, but they cannot improve a source that was recorded or uploaded at low quality.</p>
        </div>

        <div style={styles.stepBlock}>
          <h3 style={styles.stepTitle}>Step 4 — Confirm your rights and start</h3>
          <p style={styles.bodyText}>Tick the confirmation box and press <strong>Convert to MP3</strong>. The status area shows “Checking URL”, then “Preparing your audio”. Progress is only shown when the processing service reports real progress.</p>
        </div>

        <div style={styles.stepBlock}>
          <h3 style={styles.stepTitle}>Step 5 — Download the MP3</h3>
          <p style={styles.bodyText}>When the job completes you see the file name, format, bitrate and size, plus a download button. The link is private to your session and expires after 60 minutes, when the temporary file is deleted from the server.</p>
        </div>
      </div>

      {/* Error Troubleshooting Guidelines */}
      <h2 style={{...styles.subHeading, marginTop: '40px', color: '#dc3545'}}>If something goes wrong</h2>
      <ul style={styles.errorList}>
        <li><strong>“Please enter a valid supported YouTube URL.”</strong> The link is mistyped, points to a playlist, or belongs to another website.</li>
        <li><strong>“This content cannot be processed.”</strong> The video is private, restricted, or otherwise not permitted for processing.</li>
        <li><strong>“Server is currently busy.”</strong> Wait a minute and try again; the processing service is under load.</li>
      </ul>

      <p style={{...styles.bodyText, marginTop: '24px', fontWeight: '600'}}>Still stuck? The FAQ covers failures, limits and retention in more detail.</p>
    </main>
  );
}

const styles = {
  container: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px 0', textAlign: 'left' },
  breadcrumbs: { display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#777772', marginBottom: '24px', fontWeight: '500' },
  crumbLink: { cursor: 'pointer', textDecoration: 'underline', color: '#007074' },
  crumbDivider: { color: '#bbb' },
  crumbActive: { color: '#666666' },
  mainHeading: { fontSize: '2.4rem', fontWeight: '800', color: '#111111', margin: '0 0 16px 0', letterSpacing: '-0.5px' },
  leadText: { fontSize: '1.1rem', color: '#555555', lineHeight: '1.5', margin: '0 0 32px 0' },
  subHeading: { fontSize: '1.35rem', fontWeight: '800', color: '#111111', margin: '24px 0 12px 0' },
  bodyText: { fontSize: '0.95rem', color: '#333333', lineHeight: '1.6', margin: '0 0 16px 0', textAlign: 'justify' },
  stepsWrapper: { display: 'flex', flexDirection: 'column', gap: '20px' },
  stepBlock: { borderLeft: '3px solid #007074', paddingLeft: '16px' },
  stepTitle: { fontSize: '1.1rem', fontWeight: '700', color: '#111111', margin: '0 0 6px 0' },
  errorList: { listStyle: 'none', padding: 0, margin: '12px 0 0 0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: '#333333', lineHeight: '1.5' }
};
