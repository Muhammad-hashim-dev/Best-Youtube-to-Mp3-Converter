import React from 'react';

export default function HowItWorks({ onBackToHome }) {
  return (
    <main style={styles.container}>
      {/* Breadcrumbs */}
      <div style={styles.breadcrumbs}>
        <span
          style={styles.crumbLink}
          onClick={onBackToHome}
        >
          Home
        </span>

        <span style={styles.crumbDivider}>/</span>

        <span style={styles.crumbActive}>
          How it works
        </span>
      </div>

      <h1 style={styles.mainHeading}>
        How to convert YouTube to MP3
      </h1>

      <p style={styles.leadText}>
        Five short steps, no software and no account. This
        guide also explains what to check before you convert
        anything.
      </p>

      <h2 style={styles.subHeading}>
        Before you start: check you are allowed to convert it
      </h2>

      <p style={styles.bodyText}>
        Converting is a technical action; whether it is lawful
        depends on the content. Convert your own uploads,
        openly licensed material, public-domain recordings,
        or content where the rights holder has given you
        permission. If none of those apply, do not convert it.
      </p>

      {/* Steps */}
      <div style={styles.stepsWrapper}>
        <div style={styles.stepBlock}>
          <span style={styles.stepNumber}>01</span>

          <div>
            <h3 style={styles.stepTitle}>
              Copy the video link
            </h3>

            <p style={styles.bodyText}>
              On desktop, copy the address from the browser
              bar. On mobile, tap <strong>Share</strong> then{' '}
              <strong>Copy link</strong>. The link should point
              to one video, not a playlist or a channel.
            </p>
          </div>
        </div>

        <div style={styles.stepBlock}>
          <span style={styles.stepNumber}>02</span>

          <div>
            <h3 style={styles.stepTitle}>
              Paste the link into the converter
            </h3>

            <p style={styles.bodyText}>
              Open the converter on the homepage and paste the
              link, or press the <strong>Paste</strong> button
              so your browser fills it in for you.
            </p>
          </div>
        </div>

        <div style={styles.stepBlock}>
          <span style={styles.stepNumber}>03</span>

          <div>
            <h3 style={styles.stepTitle}>
              Choose an audio quality
            </h3>

            <p style={styles.bodyText}>
              128 kbps keeps files small and is fine for
              speech. 192 kbps is a balanced default. Higher
              bitrates preserve more detail in music, but they
              cannot improve a low-quality source.
            </p>
          </div>
        </div>

        <div style={styles.stepBlock}>
          <span style={styles.stepNumber}>04</span>

          <div>
            <h3 style={styles.stepTitle}>
              Confirm your rights and start
            </h3>

            <p style={styles.bodyText}>
              Tick the confirmation box and press{' '}
              <strong>Convert to MP3</strong>. The status area
              shows the current processing state.
            </p>
          </div>
        </div>

        <div style={styles.stepBlock}>
          <span style={styles.stepNumber}>05</span>

          <div>
            <h3 style={styles.stepTitle}>
              Download the MP3
            </h3>

            <p style={styles.bodyText}>
              When the job completes you see the file name and
              a download button. Download the generated file
              to your device.
            </p>
          </div>
        </div>
      </div>

      {/* Error */}
      <h2 style={styles.errorHeading}>
        If something goes wrong
      </h2>

      <ul style={styles.errorList}>
        <li>
          <strong>
            “Please enter a valid supported YouTube URL.”
          </strong>{' '}
          The link is mistyped, points to a playlist, or
          belongs to another website.
        </li>

        <li>
          <strong>
            “This content cannot be processed.”
          </strong>{' '}
          The video is private, restricted, or otherwise not
          permitted for processing.
        </li>

        <li>
          <strong>“Server is currently busy.”</strong> Wait a
          minute and try again; the processing service may be
          under load.
        </li>
      </ul>

      <p style={styles.finalText}>
        Still stuck? The FAQ covers failures, limits and
        retention in more detail.
      </p>
    </main>
  );
}

const styles = {
  container: {
    width: '100%',
    maxWidth: '850px',
    margin: '0 auto',
    padding: '20px 0',
    textAlign: 'left',
  },

  breadcrumbs: {
    display: 'flex',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--text-muted)',
    marginBottom: '28px',
    fontWeight: '500',
  },

  crumbLink: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'var(--accent-color)',
    fontWeight: '700',
  },

  crumbDivider: {
    color: 'var(--border-color)',
  },

  crumbActive: {
    color: 'var(--text-muted)',
  },

  mainHeading: {
    fontSize: '2.7rem',
    fontWeight: '850',
    color: 'var(--text-primary)',
    margin: '0 0 16px',
    letterSpacing: '-1px',
    lineHeight: '1.15',
  },

  leadText: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.7',
    margin: '0 0 38px',
    maxWidth: '720px',
  },

  subHeading: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: '28px 0 12px',
  },

  bodyText: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
    margin: '0 0 16px',
  },

  stepsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '28px',
  },

  stepBlock: {
    display: 'grid',
    gridTemplateColumns: '58px 1fr',
    gap: '18px',
    padding: '22px',
    backgroundColor: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '18px',
    boxShadow: 'var(--card-shadow)',
    transition:
      'background-color 0.3s ease, border-color 0.3s ease',
  },

  stepNumber: {
    width: '42px',
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--accent-soft)',
    color: 'var(--accent-color)',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '900',
  },

  stepTitle: {
    fontSize: '1.05rem',
    fontWeight: '750',
    color: 'var(--text-primary)',
    margin: '0 0 7px',
  },

  errorHeading: {
    fontSize: '1.35rem',
    fontWeight: '800',
    color: '#ef4444',
    marginTop: '42px',
    marginBottom: '14px',
  },

  errorList: {
    listStyle: 'none',
    padding: 0,
    margin: '12px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    fontSize: '0.92rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },

  finalText: {
    marginTop: '28px',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    lineHeight: '1.6',
  },
};