import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerGrid}>
        
        {/* Left Grid Side: Brand & Mission Statement */}
        <div style={styles.footerBrandBlock}>
          <div style={styles.brandTitle}>🔊 ClearAudio</div>
          <p style={styles.brandPitchText}>
            High-fidelity multimedia stream parsing gate built for fast, anonymous, and secure audio extraction.
          </p>
        </div>

        {/* Right Grid Side: Dynamic Internal Links Array mapping */}
        <div style={styles.footerLinksGrid}>
          <div style={styles.linkColumn}>
            <span style={styles.columnTitle}>Product</span>
            <a href="#how" style={styles.footerLink}>How it works</a>
            <a href="#formats" style={styles.footerLink}>Supported Formats</a>
          </div>
          
          <div style={styles.linkColumn}>
            <span style={styles.columnTitle}>Legal Policy</span>
            <a href="#tos" style={styles.footerLink}>Terms of Use</a>
            <a href="#privacy" style={styles.footerLink}>Privacy Policy</a>
          </div>
        </div>

      </div>

      {/* Dynamic Border Line Separator */}
      <hr style={styles.separatorLine} />

      {/* Bottom Horizontal Baseline Alignment Column */}
      <div style={styles.footerBottomRow}>
        <p style={styles.copyrightText}>
          &copy; {currentYear} <strong>ClearAudio</strong>. All rights reserved. Built with precision.
        </p>
        
        {/* M.Hashim Signature Branding Core Element Layout */}
        <div style={styles.signatureBlock}>
          <span style={styles.devLabel}>Developed by</span>
          <a 
            href="https://hilarious-lokum-367c26.netlify.app/" 
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

// 100% Fluid Responsive Footer Styling Blueprint Config
const styles = {
  footerContainer: { width: '100%', maxWidth: '1200px', padding: '60px 0 30px 0', borderTop: '1px solid var(--border-color)', marginTop: '80px', display: 'flex', flexDirection: 'column', gap: '30px', fontFamily: 'inherit' },
  footerGrid: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', width: '100%' },
  footerBrandBlock: { flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '12px' },
  brandTitle: { fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.5px' },
  brandPitchText: { fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0', maxWidth: '320px' },
  footerLinksGrid: { display: 'flex', gap: '60px', flexWrap: 'wrap' },
  linkColumn: { display: 'flex', flexDirection: 'column', gap: '10px' },
  columnTitle: { fontSize: '0.85rem', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' },
  footerLink: { textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.88rem', fontWeight: '500', transition: 'color 0.2s' },
  separatorLine: { width: '100%', border: 'none', borderTop: '1px solid var(--border-color)', margin: '10px 0 0 0' },
  footerBottomRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap-reverse', gap: '20px', width: '100%' },
  copyrightText: { margin: '0', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '500' },
  signatureBlock: { display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', backgroundColor: '#f0efe9', border: '1px solid var(--border-color)', borderRadius: '20px' },
  devLabel: { fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' },
  signatureAnchor: { position: 'relative', display: 'flex', alignItems: 'center', gap: '6px', color: '#007074', textDecoration: 'none', fontWeight: '800', fontSize: '0.85rem' },
  pulseDot: { width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%', inlineBlock: 'true' }
};

