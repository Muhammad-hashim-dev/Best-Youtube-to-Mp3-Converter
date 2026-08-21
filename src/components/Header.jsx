import React from 'react';

export default function Header() {
  return (
    <header style={styles.navBar}>
      <div style={styles.logoGroup}>
        <div style={styles.logoIcon}>🔊</div>
        <span style={styles.logoText}>ClearAudio</span>
      </div>
      <nav style={styles.navLinks}>
        <a href="#how" style={styles.link}>How it works</a>
        <a href="#formats" style={styles.link}>Formats</a>
        <a href="#faq" style={styles.link}>FAQ</a>
        <a href="#legal" style={styles.link}>Legal</a>
      </nav>
      <button style={styles.navBtn}>Convert</button>
    </header>
  );
}

const styles = {
  navBar: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', backgroundColor: 'transparent', borderBottom: '1px solid var(--border-color)', position: 'absolute', top: 0, left: 0 },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  logoIcon: { fontSize: '1.2rem' },
  logoText: { fontWeight: '800', fontSize: '1.2rem', color: 'var(--text-primary)' },
  navLinks: { display: 'flex', gap: '24px' },
  link: { textDecoration: 'none', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' },
  navBtn: { padding: '8px 20px', backgroundColor: 'var(--accent-teal)', color: '#fff', border: 'none', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }
};
