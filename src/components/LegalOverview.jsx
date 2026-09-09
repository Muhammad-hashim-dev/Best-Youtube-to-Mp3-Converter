import React from 'react';

export default function LegalOverview({ onBackToHome }) {
  return (
    <main style={styles.container}>
      <div style={styles.breadcrumbs}>
        <span
          style={styles.crumbLink}
          onClick={onBackToHome}
        >
          Home
        </span>

        <span style={styles.crumbDivider}>/</span>

        <span style={styles.crumbActive}>
          Legal
        </span>
      </div>

      <h1 style={styles.mainHeading}>
        Legal overview
      </h1>

      <p style={styles.leadText}>
        What this service is for, what it refuses to do,
        and where to find each policy.
      </p>

      <h2 style={styles.subHeading}>
        What this service is designed for
      </h2>

      <p style={styles.bodyText}>
        <strong>ClearAudio</strong> converts audio from supported
        YouTube links for people who are entitled to process that
        content: your own uploads, openly licensed or public-domain
        material, and content where the rights holder has given you
        permission. It is not designed to help anyone obtain
        copyrighted material without authorisation.
      </p>

      <h2 style={styles.subHeading}>
        What the service will not do
      </h2>

      <ul style={styles.bulletsList}>
        <li>
          <span style={styles.bullet}>•</span>
          Bypass DRM, encryption, paywalls, age gates or authentication
        </li>

        <li>
          <span style={styles.bullet}>•</span>
          Process private, unlisted-restricted or members-only content
        </li>

        <li>
          <span style={styles.bullet}>•</span>
          Accept playlists, channels or bulk automated jobs
        </li>

        <li>
          <span style={styles.bullet}>•</span>
          Store your media beyond the published retention window
        </li>
      </ul>

      <h2 style={styles.subHeading}>
        Your responsibility
      </h2>

      <p style={styles.bodyText}>
        Every conversion requires you to confirm that you have the
        right or permission to download and convert the content.
        Copyright law differs by country; you are responsible for
        your use of the tool in your jurisdiction.
      </p>

      <h2 style={styles.subHeading}>
        Policies
      </h2>

      <ul style={styles.policiesList}>
        <li>
          <strong>Terms of Service</strong> — the agreement between
          you and ClearAudio.
        </li>

        <li>
          <strong>Privacy Policy</strong> — what we process, and what
          we deliberately do not collect.
        </li>

        <li>
          <strong>Acceptable Use Policy</strong> — permitted and
          prohibited uses.
        </li>

        <li>
          <strong>Copyright & DMCA reporting</strong> — how rights
          holders can contact us.
        </li>
      </ul>

      <p
        style={{
          ...styles.bodyText,
          marginTop: '30px',
          fontWeight: '500'
        }}
      >
        Questions that are not covered here can go to our{' '}
        <span style={styles.inlineLink}>
          contact page
        </span>
        .
      </p>
    </main>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '28px 0 60px',
    textAlign: 'left',
    fontFamily: 'inherit',
    color: 'var(--text-primary)'
  },

  breadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '26px',
    fontWeight: '600'
  },

  crumbLink: {
    cursor: 'pointer',
    color: 'var(--accent-color)',
    textDecoration: 'none'
  },

  crumbDivider: {
    color: 'var(--text-muted)',
    opacity: 0.5
  },

  crumbActive: {
    color: 'var(--text-muted)'
  },

  mainHeading: {
    fontSize: 'clamp(2rem, 5vw, 2.6rem)',
    fontWeight: '900',
    color: 'var(--text-primary)',
    margin: '0 0 14px',
    letterSpacing: '-1px',
    lineHeight: '1.1'
  },

  leadText: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    margin: '0 0 34px'
  },

  subHeading: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: '34px 0 14px',
    letterSpacing: '-0.3px'
  },

  bodyText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
    margin: '0 0 16px',
    textAlign: 'left'
  },

  bulletsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },

  bullet: {
    color: 'var(--accent-color)',
    fontWeight: '900',
    marginRight: '8px'
  },

  policiesList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '13px',
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6'
  },

  inlineLink: {
    color: 'var(--accent-color)',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    cursor: 'pointer',
    fontWeight: '700'
  }
};