import React from 'react';

export default function TrustedBy() {
  // 100% Secure Local Assets Mapping from Public Directory
  const companies = [
    { name: 'P2p Clouds', link: 'https://p2pclouds.com', logo: '/p2p.png' },
    { name: 'Keysol Global', link: 'https://keysolglobal.com', logo: '/keysol.png' },
    { name: 'S.jee', link: '#', logo: '/sjee.png' },
    { name: 'Kips Education System', link: 'https://kips.edu.pk', logo: '/kips.png' },
    { name: 'Nexskill', link: 'https://nexskill.com', logo: '/nexskill.png' },
    { name: 'Ideo Versity', link: 'https://ideoversity.com', logo: '/ideo.png' }
  ];

  // Infinite non-breaking marquee sliding row track duplication
  const doubleCompanies = [...companies, ...companies, ...companies];

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Trusted By</h2>
      
      {/* Infinite Scrolling Track Shell Grid */}
      <div style={styles.sliderContainer}>
        <div style={styles.marqueeTrack}>
          {doubleCompanies.map((company, index) => (
            <a 
              key={index} 
              href={company.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={styles.logoCard}
            >
              {/* FIXED AREA: Added real absolute <img> tag inside wrapper box */}
              <div style={styles.logoWrapper}>
                <img 
                  src={company.logo} 
                  alt={`${company.name} brand asset logo`} 
                  style={styles.logoImg} 
                />
              </div>
              <span style={styles.companyName}>{company.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { width: '100%', maxWidth: '1200px', margin: '45px auto 20px auto', padding: '0 20px', textAlign: 'left', overflow: 'hidden' },
  heading: { fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.5px' },
  sliderContainer: { width: '100%', overflow: 'hidden', position: 'relative', padding: '10px 0' },
  marqueeTrack: { display: 'flex', gap: '20px', width: 'max-content', animation: 'scrollMarquee 25s linear infinite' },
  logoCard: { display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 24px', backgroundColor: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '14px', textDecoration: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.01)', transition: 'transform 0.2s, border-color 0.2s', minWidth: '250px' },
  logoWrapper: { width: '42px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderRadius: '10px', padding: '4px', border: '1px solid #f0efe9' },
  logoImg: { width: '100%', height: '100%', objectFit: 'contain' },
  companyName: { fontSize: '0.95rem', fontWeight: '700', color: '#111111', whiteSpace: 'nowrap' }
};
