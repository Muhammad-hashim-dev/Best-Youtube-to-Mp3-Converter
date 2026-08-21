import React from 'react';

export default function FAQOverview({ onBackToHome }) {
  // Frequently Asked Questions array structure data map
  const faqs = [
    {
      q: "How does the converter work?",
      a: "You paste a supported YouTube link and confirm you have the right to convert it. Our server checks the link, sends the request to an authorized media-processing service, and returns a private download link for the finished MP3. Nothing is processed in your browser and no software is installed."
    },
    {
      q: "What URLs are supported?",
      a: "Single videos from youtube.com/watch, youtu.be short links, youtube.com/shorts, youtube.com/embed and music.youtube.com. Playlists, channels, private videos, members-only content and links from other websites are rejected."
    },
    {
      q: "What audio quality is available?",
      a: "You can request 128, 192, 256 or 320 kbps MP3. Bitrate only controls how much of the source audio is preserved — it cannot add quality that the original recording does not contain, so a low-quality source will still sound low quality at 320 kbps."
    },
    {
      q: "Why did my conversion fail?",
      a: "The most common reasons are an unsupported or mistyped link, content that is restricted or unavailable in the processing region, a video longer than the 90 minute limit, or a temporary problem with the processing service. Each failure shows a plain-language message so you know whether to retry or use a different link."
    },
    {
      q: "Is the service free?",
      a: "The converter is free to use within the published fair-use limits of 10 conversions per hour per device. There is no account, no registration and no email required."
    },
    {
      q: "Where are temporary files stored?",
      a: "Converted audio is held in temporary server-side storage operated by the processing service, reachable only through a private, token-protected download link generated for your session. The provider's temporary URL is never exposed to your browser."
    },
    {
      q: "How long are files retained?",
      a: "Download links and temporary files expire 60 minutes after a conversion completes and are deleted automatically. Job records keep only technical metadata such as status, duration and file size — never your media."
    },
    {
      q: "What content can I legally convert?",
      a: "Content you created, content you own the rights to, content licensed for reuse (for example Creative Commons), public-domain material, or content where the rights holder has given you permission. Converting copyrighted material without permission is not allowed and is a breach of our Acceptable Use Policy."
    }
  ];

  return (
    <main style={styles.container}>
      {/* Breadcrumbs Navigation UI */}
      <div style={styles.breadcrumbs}>
        <span style={styles.crumbLink} onClick={onBackToHome}>Home</span>
        <span style={styles.crumbDivider}>/</span>
        <span style={styles.crumbActive}>FAQ</span>
      </div>

      <h1 style={styles.mainHeading}>YouTube to MP3 FAQ</h1>
      <p style={styles.leadText}>Everything people usually ask before their first conversion — written in plain language.</p>

      {/* Accordion/Block FAQ list tracking */}
      <div style={styles.faqListWrapper}>
        {faqs.map((item, idx) => (
          <div key={idx} style={styles.faqCard}>
            <h3 style={styles.faqQuestion}>{item.q}</h3>
            <p style={styles.faqAnswer}>{item.a}</p>
          </div>
        ))}
      </div>

      <div style={styles.baselineNotice}>
        <h3 style={styles.faqQuestion}>Anything else?</h3>
        <p style={styles.faqAnswer}>
          Read the <span style={styles.inlineLink}>step-by-step guide</span>, check the <span style={styles.inlineLink}>format and bitrate details</span>, or contact us.
        </p>
      </div>
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
  faqListWrapper: { display: 'flex', flexDirection: 'column', gap: '28px' },
  faqCard: { display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid #f0efe9' },
  faqQuestion: { fontSize: '1.25rem', fontWeight: '800', color: '#111111', margin: '0' },
  faqAnswer: { fontSize: '0.95rem', color: '#333333', lineHeight: '1.6', margin: '0', textAlign: 'justify' },
  baselineNotice: { marginTop: '40px', padding: '20px', backgroundColor: '#f9f8f4', borderRadius: '12px', border: '1px solid #e5e5e0' },
  inlineLink: { color: '#007074', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600' }
};
