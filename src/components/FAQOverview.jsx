import React from 'react';

export default function FAQOverview({ onBackToHome }) {
  const faqs = [
    {
      q: 'How does the converter work?',
      a: 'You paste a supported YouTube link and confirm you have the right to convert it. Our server checks the link, sends the request to an authorized media-processing service, and returns a private download link for the finished MP3. Nothing is processed in your browser and no software is installed.'
    },
    {
      q: 'What URLs are supported?',
      a: 'Single videos from youtube.com/watch, youtu.be short links, youtube.com/shorts, youtube.com/embed and music.youtube.com. Playlists, channels, private videos, members-only content and links from other websites are rejected.'
    },
    {
      q: 'What audio quality is available?',
      a: 'You can request 128, 192, 256 or 320 kbps MP3. Bitrate only controls how much of the source audio is preserved — it cannot add quality that the original recording does not contain, so a low-quality source will still sound low quality at 320 kbps.'
    },
    {
      q: 'Why did my conversion fail?',
      a: 'The most common reasons are an unsupported or mistyped link, content that is restricted or unavailable in the processing region, a video longer than the 90 minute limit, or a temporary problem with the processing service. Each failure shows a plain-language message so you know whether to retry or use a different link.'
    },
    {
      q: 'Is the service free?',
      a: 'The converter is free to use within the published fair-use limits of 10 conversions per hour per device. There is no account, no registration and no email required.'
    },
    {
      q: 'Where are temporary files stored?',
      a: "Converted audio is held in temporary server-side storage operated by the processing service, reachable only through a private, token-protected download link generated for your session. The provider's temporary URL is never exposed to your browser."
    },
    {
      q: 'How long are files retained?',
      a: 'Download links and temporary files expire 60 minutes after a conversion completes and are deleted automatically. Job records keep only technical metadata such as status, duration and file size — never your media.'
    },
    {
      q: 'What content can I legally convert?',
      a: 'Content you created, content you own the rights to, content licensed for reuse (for example Creative Commons), public-domain material, or content where the rights holder has given you permission. Converting copyrighted material without permission is not allowed and is a breach of our Acceptable Use Policy.'
    }
  ];

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
          FAQ
        </span>
      </div>

      <h1 style={styles.mainHeading}>
        YouTube to MP3 FAQ
      </h1>

      <p style={styles.leadText}>
        Everything people usually ask before their first conversion —
        written in plain language.
      </p>

      <div style={styles.faqListWrapper}>
        {faqs.map((item, idx) => (
          <div key={idx} style={styles.faqCard}>
            <div style={styles.questionRow}>
              <div style={styles.questionIcon}>?</div>

              <h3 style={styles.faqQuestion}>
                {item.q}
              </h3>
            </div>

            <p style={styles.faqAnswer}>
              {item.a}
            </p>
          </div>
        ))}
      </div>

      <div style={styles.baselineNotice}>
        <h3 style={styles.noticeTitle}>
          Anything else?
        </h3>

        <p style={styles.faqAnswer}>
          Read the{' '}
          <span style={styles.inlineLink}>
            step-by-step guide
          </span>
          , check the{' '}
          <span style={styles.inlineLink}>
            format and bitrate details
          </span>
          , or contact us.
        </p>
      </div>
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
    margin: '0 0 36px'
  },

  faqListWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },

  faqCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
    background: 'var(--card-bg)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    boxShadow: 'var(--card-shadow)',
    transition: 'transform 0.2s ease, border-color 0.2s ease'
  },

  questionRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },

  questionIcon: {
    width: '30px',
    height: '30px',
    minWidth: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--accent-soft)',
    border: '1px solid var(--accent-border)',
    color: 'var(--accent-color)',
    fontWeight: '900',
    fontSize: '0.9rem'
  },

  faqQuestion: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: 0,
    lineHeight: '1.4'
  },

  faqAnswer: {
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    lineHeight: '1.7',
    margin: 0
  },

  baselineNotice: {
    marginTop: '34px',
    padding: '22px',
    background: 'var(--accent-soft)',
    borderRadius: '16px',
    border: '1px solid var(--accent-border)'
  },

  noticeTitle: {
    fontSize: '1.1rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    margin: '0 0 8px'
  },

  inlineLink: {
    color: 'var(--accent-color)',
    textDecoration: 'underline',
    textUnderlineOffset: '3px',
    cursor: 'pointer',
    fontWeight: '700'
  }
};