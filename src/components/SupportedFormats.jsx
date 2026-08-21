import React from 'react';

export default function SupportedFormats({ onBackToHome }) {
  // Simple table data array helper
  const bitrates = [
    { rate: '128 kbps', size: '~1 MB per minute', best: 'Speech, podcasts, lectures, small storage' },
    { rate: '192 kbps', size: '~1.4 MB per minute', best: 'Balanced default for most music' },
    { rate: '256 kbps', size: '~1.9 MB per minute', best: 'Detailed music on good headphones' },
    { rate: '320 kbps', size: '~2.4 MB per minute', best: 'Maximum MP3 detail from a good source' }
  ];

  return (
    <main style={styles.container}>
      {/* Breadcrumbs Layout Navigation Line */}
      <div style={styles.breadcrumbs}>
        <span style={styles.crumbLink} onClick={onBackToHome}>Home</span>
        <span style={styles.crumbDivider}>/</span>
        <span style={styles.crumbActive}>Supported formats</span>
      </div>

      <h1 style={styles.mainHeading}>Supported formats, bitrates and limits</h1>
      <p style={styles.leadText}>Exactly what this converter accepts and produces — no vague claims.</p>

      {/* Segment 1: Links Requirements Matrix */}
      <h2 style={styles.subHeading}>Accepted link formats</h2>
      <div style={styles.codeBlock}>
        <code>https://www.youtube.com/watch?v=VIDEOID</code><br />
        <code>https://youtu.be/VIDEOID</code><br />
        <code>https://www.youtube.com/shorts/VIDEOID</code><br />
        <code>https://www.youtube.com/embed/VIDEOID</code><br />
        <code>https://music.youtube.com/watch?v=VIDEOID</code>
      </div>
      <p style={styles.bodyText}>
        Playlists, channels, search pages, private or unlisted-restricted content and links from other websites are rejected by the server before any processing starts.
      </p>

      {/* Segment 2: Standard Extracted File Outputs specifications */}
      <h2 style={styles.subHeading}>Output format</h2>
      <p style={styles.bodyText}>
        Output is always MP3, the most widely compatible audio format. We do not currently offer M4A, WAV or FLAC, and we would rather list one format that always works than advertise options we do not support.
      </p>

      {/* Segment 3: Comparative Specifications Table */}
      <h2 style={styles.subHeading}>Bitrate comparison</h2>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.tableHeaderRow}>
              <th style={styles.th}>Bitrate</th>
              <th style={styles.th}>Approximate size</th>
              <th style={styles.th}>Best for</th>
            </tr>
          </thead>
          <tbody>
            {bitrates.map((b, i) => (
              <tr key={i} style={styles.tableRow}>
                <td style={{...styles.td, fontWeight: '700'}}>{b.rate}</td>
                <td style={styles.td}>{b.size}</td>
                <td style={styles.td}>{b.best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{...styles.bodyText, marginTop: '12px', fontSize: '0.88rem', fontStyle: 'italic'}}>
        <strong>Important:</strong> bitrate sets a ceiling, not a floor. If the source audio was uploaded at a low quality, choosing 320 kbps produces a larger file that still sounds the same. Pick the smallest bitrate that sounds right to you.
      </p>

      {/* Segment 4: Security Control Processing Rates boundary parameters */}
      <h2 style={styles.subHeading}>Processing limits</h2>
      <ul style={styles.limitsList}>
        <li>• <strong>Maximum duration:</strong> 90 minutes per video</li>
        <li>• <strong>Maximum output size:</strong> 200 MB</li>
        <li>• <strong>Fair-use rate limit:</strong> 10 conversions per hour per device</li>
        <li>• <strong>Download link and temporary file lifetime:</strong> 60 minutes</li>
      </ul>

      <p style={{...styles.bodyText, marginTop: '24px', fontWeight: '500'}}>
        See the <span style={{color: '#007074', textDecoration: 'underline', cursor: 'pointer'}}>FAQ</span> for what happens when a limit is reached, or <span onClick={onBackToHome} style={{color: '#007074', textDecoration: 'underline', cursor: 'pointer'}}>start from the converter</span>.
      </p>
    </main>
  );
}

// Pixel-Perfect Clean Inline Typography CSS Formatting Properties
const styles = {
  container: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px 0', textAlign: 'left', fontFamily: 'inherit' },
  breadcrumbs: { display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#777772', marginBottom: '24px', fontWeight: '500' },
  crumbLink: { cursor: 'pointer', textDecoration: 'underline', color: '#007074' },
  crumbDivider: { color: '#bbb' },
  crumbActive: { color: '#666666' },
  mainHeading: { fontSize: '2.4rem', fontWeight: '800', color: '#111111', margin: '0 0 16px 0', letterSpacing: '-0.5px' },
  leadText: { fontSize: '1.1rem', color: '#555555', lineHeight: '1.5', margin: '0 0 32px 0' },
  subHeading: { fontSize: '1.35rem', fontWeight: '800', color: '#111111', margin: '32px 0 12px 0' },
  bodyText: { fontSize: '0.95rem', color: '#333333', lineHeight: '1.6', margin: '0 0 16px 0', textAlign: 'justify' },
  codeBlock: { backgroundColor: '#f3f2eb', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e2dc', marginBottom: '14px', lineHeight: '1.8', fontFamily: 'monospace', fontSize: '0.92rem', color: '#111111' },
  tableWrapper: { width: '100%', overflowX: 'auto', border: '1px solid #e5e5e0', borderRadius: '12px', backgroundColor: '#ffffff' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' },
  tableHeaderRow: { backgroundColor: '#f9f8f4', borderBottom: '1px solid #e5e5e0' },
  th: { padding: '14px 16px', fontWeight: '700', color: '#111111' },
  tableRow: { borderBottom: '1px solid #f0efe9' },
  td: { padding: '14px 16px', color: '#444440' },
  limitsList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: '#333333' }
};
