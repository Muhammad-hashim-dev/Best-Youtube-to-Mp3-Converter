import React from 'react';

export default function LegalOverview({ onBackToHome }) {
  return (
    <main style={styles.container}>
      {/* Breadcrumbs Navigation */}
      <div style={styles.breadcrumbs}>
        <span style={styles.crumbLink} onClick={onBackToHome}>Home</span>
        <span style={styles.crumbDivider}>/</span>
        <span style={styles.crumbActive}>Legal</span>
      </div>

      <h1 style={styles.mainHeading}>Legal overview</h1>
      <p style={styles.leadText}>What this service is for, what it refuses to do, and where to find each policy.</p>

      {/* Section 1 */}
      <h2 style={styles.subHeading}>What this service is designed for</h2>
      <p style={styles.bodyText}>
        <strong>ClearAudio</strong> converts audio from supported YouTube links for people who are entitled to process that content: your own uploads, openly licensed or public-domain material, and content where the rights holder has given you permission. It is not designed to help anyone obtain copyrighted material without authorisation.
      </p>

      {/* Section 2 */}
      <h2 style={styles.subHeading}>What the service will not do</h2>
      <ul style={styles.bulletsList}>
        <li>• Bypass DRM, encryption, paywalls, age gates or authentication</li>
        <li>• Process private, unlisted-restricted or members-only content</li>
        <li>• Accept playlists, channels or bulk automated jobs</li>
        <li>• Store your media beyond the published retention window</li>
      </ul>

      {/* Section 3 */}
      <h2 style={styles.subHeading}>Your responsibility</h2>
      <p style={styles.bodyText}>
        Every conversion requires you to confirm that you have the right or permission to download and convert the content. Copyright law differs by country; you are responsible for your use of the tool in your jurisdiction.
      </p>

      {/* Section 4 */}
      <h2 style={styles.subHeading}>Policies</h2>
      <ul style={styles.policiesList}>
        <li><strong>Terms of Service</strong> — the agreement between you and ClearAudio.</li>
        <li><strong>Privacy Policy</strong> — what we process, and what we deliberately do not collect.</li>
        <li><strong>Acceptable Use Policy</strong> — permitted and prohibited uses.</li>
        <li><strong>Copyright & DMCA reporting</strong> — how rights holders can contact us.</li>
      </ul>

      <p style={{...styles.bodyText, marginTop: '28px', fontWeight: '500'}}>
        Questions that are not covered here can go to our <span style={styles.inlineLink}>contact page</span>.
      </p>
    </main>
  );
}

const styles = {
  container: { width: '100%', maxWidth: '800px', margin: '0 auto', padding: '20px 0', textAlign: 'left', fontFamily: 'inherit' },
  breadcrumbs: { display: 'flex', gap: '8px', fontSize: '0.85rem', color: '#777772', marginBottom: '24px', fontWeight: '500' },
  crumbLink: { cursor: 'pointer', textDecoration: 'underline', color: '#007074' },
  crumbDivider: { color: '#bbb' },
  crumbActive: { color: '#666666' },
  mainHeading: { fontSize: '2.4rem', fontWeight: '800', color: '#111111', margin: '0 0 16px 0', letterSpacing: '-0.5px' },
  leadText: { fontSize: '1.1rem', color: '#555555', lineHeight: '1.5', margin: '0 0 32px 0' },
  subHeading: { fontSize: '1.35rem', fontWeight: '800', color: '#111111', margin: '28px 0 12px 0' },
  bodyText: { fontSize: '0.95rem', color: '#333333', lineHeight: '1.6', margin: '0 0 16px 0', textAlign: 'justify' },
  bulletsList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: '#333333' },
  policiesList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', color: '#333333', lineHeight: '1.5' },
  inlineLink: { color: '#007074', textDecoration: 'underline', cursor: 'pointer' }
};
