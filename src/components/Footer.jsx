import React from 'react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerGrid}>
        <div style={styles.footerBrandBlock}>
          <div
            style={styles.brandTitle}
            onClick={() => handleNavigation('home')}
          >
            <span style={styles.brandIcon}>▶</span>
            ClearAudio
          </div>

          <p style={styles.brandPitchText}>
            Convert YouTube videos to MP3 online with a fast,
            free, and easy-to-use converter. Choose your
            preferred audio quality and download on desktop
            or mobile.
          </p>
        </div>

        <div style={styles.footerLinksGrid}>
          <div style={styles.linkColumn}>
            <span style={styles.columnTitle}>Product</span>

            <button
              type="button"
              style={styles.footerLink}
              onClick={() =>
                handleNavigation('how-it-works')
              }
            >
              How it works
            </button>

            <button
              type="button"
              style={styles.footerLink}
              onClick={() =>
                handleNavigation('formats')
              }
            >
              Supported Formats
            </button>

            <button
              type="button"
              style={styles.footerLink}
              onClick={() => handleNavigation('faq')}
            >
              FAQ
            </button>
          </div>

          <div style={styles.linkColumn}>
            <span style={styles.columnTitle}>
              Legal Policy
            </span>

            <button
              type="button"
              style={styles.footerLink}
              onClick={() =>
                handleNavigation('legal')
              }
            >
              Terms of Use
            </button>

            <button
              type="button"
              style={styles.footerLink}
              onClick={() =>
                handleNavigation('legal')
              }
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>

      <hr style={styles.separatorLine} />

      <div style={styles.footerBottomRow}>
        <p style={styles.copyrightText}>
          &copy; {currentYear}{' '}
          <strong>ClearAudio</strong>. All rights reserved.
          Built with precision.
        </p>

        <div style={styles.signatureBlock}>
          <span style={styles.devLabel}>Developed by</span>

          <a
            href="https://muhammad-hashim-port.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.signatureAnchor}
          >
            M.Hashim
            <span style={styles.pulseDot}></span>
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footerContainer: {
    width: '100%',
    maxWidth: '1200px',
    padding: '60px 0 30px',
    borderTop: '1px solid var(--border-color)',
    marginTop: '80px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    fontFamily: 'inherit',
  },

  footerGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
    width: '100%',
  },

  footerBrandBlock: {
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },

  brandTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '9px',
    fontSize: '1.15rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: '-0.5px',
    cursor: 'pointer',
  },

  brandIcon: {
    width: '27px',
    height: '27px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--accent-color)',
    color: '#fff',
    fontSize: '0.7rem',
  },

  brandPitchText: {
    fontSize: '0.88rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
    margin: '0',
    maxWidth: '340px',
  },

  footerLinksGrid: {
    display: 'flex',
    gap: '70px',
    flexWrap: 'wrap',
  },

  linkColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  columnTitle: {
    fontSize: '0.8rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '5px',
  },

  footerLink: {
    textDecoration: 'none',
    color: 'var(--text-muted)',
    fontSize: '0.88rem',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    background: 'none',
    border: 'none',
    padding: '0',
    margin: '0',
    fontFamily: 'inherit',
    cursor: 'pointer',
    textAlign: 'left',
  },

  separatorLine: {
    width: '100%',
    border: 'none',
    borderTop: '1px solid var(--border-color)',
    margin: '10px 0 0',
  },

  footerBottomRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap-reverse',
    gap: '20px',
    width: '100%',
  },

  copyrightText: {
    margin: '0',
    fontSize: '0.82rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
  },

  signatureBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '7px 14px',
    backgroundColor: 'var(--soft-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '20px',
  },

  devLabel: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },

  signatureAnchor: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    color: 'var(--accent-color)',
    textDecoration: 'none',
    fontWeight: '800',
    fontSize: '0.85rem',
  },

  pulseDot: {
    width: '6px',
    height: '6px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    display: 'inline-block',
  },
};