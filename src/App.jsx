import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import ConverterCard from './components/ConverterCard';
import HowItWorks from './components/HowItWorks';
import SupportedFormats from './components/SupportedFormats';
import LegalOverview from './components/LegalOverview';
import FAQOverview from './components/FAQOverview';
import TrustedBy from './components/TrustedBy';

export default function App() {
  const [inputUrl, setInputUrl] = useState('');
  const [conversionType, setConversionType] = useState('mp3');
  const [uiState, setUiState] = useState('IDLE');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadPayload, setDownloadPayload] = useState({ title: '', downloadUrl: '' });
  const [currentTab, setCurrentTab] = useState('home');

  // ✅ Mobile hamburger menu state
  const [menuOpen, setMenuOpen] = useState(false);

  // YouTube match regex patterns
  const ytPattern = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  // AAPKI EXACT WORKING LOGIC (0% Changes)
  const initiateConversion = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const match = inputUrl.match(ytPattern);
    const videoId = match ? match[1] : null;

    if (!videoId) {
      setUiState('ERROR');
      setErrorMessage('Invalid YouTube URL pattern. Please copy directly from your browser bar.');
      return;
    }

    setUiState('PROCESSING');

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      params: { id: videoId },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY || 'bff3290149mshf4065f20034ffc6p18bedejsn43cb9c4bb150',
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);

      if (response.data && response.data.status === "ok") {
        setDownloadPayload({
          title: response.data.title || "Extracted Audio Track",
          downloadUrl: response.data.link
        });
        setUiState('SUCCESS');
      } else if (response.data && response.data.status === "processing") {
        setUiState('ERROR');
        setErrorMessage('Server is still parsing this clip. Please click "Format" again in 5 seconds.');
      } else {
        throw new Error(response.data?.msg || 'Target conversion server rejected structural file parsing.');
      }
    } catch (err) {
      console.error("RapidAPI Gateway exception handled:", err);
      setUiState('ERROR');
      setErrorMessage(err.response?.data?.msg || err.message || 'Network error or wrong connection setup.');
    }
  };

  const purgeState = () => {
    setInputUrl('');
    setUiState('IDLE');
    setErrorMessage('');
  };

  // ✅ Helper for mobile menu navigation
  const handleMobileNavigation = (tab) => {
    setCurrentTab(tab);
    setMenuOpen(false);
  };

  return (
    <div style={styles.appWrapper}>

      {/* NAVBAR WITH DYNAMIC CLICK TOGGLES */}
      <header style={styles.navBar}>

        {/* Logo */}
        <div
          style={styles.logoGroup}
          onClick={() => handleMobileNavigation('home')}
        >
          <div style={styles.logoIcon}>🔊</div>
          <span style={styles.logoText}>ClearAudio</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktopNav" style={styles.navLinks}>
          <button
            onClick={() => setCurrentTab('home')}
            style={{
              ...styles.linkBtn,
              ...(currentTab === 'home' ? styles.activeLink : {})
            }}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentTab('how-it-works')}
            style={{
              ...styles.linkBtn,
              ...(currentTab === 'how-it-works' ? styles.activeLink : {})
            }}
          >
            How it works
          </button>

          <button
            onClick={() => setCurrentTab('formats')}
            style={{
              ...styles.linkBtn,
              ...(currentTab === 'formats' ? styles.activeLink : {})
            }}
          >
            Formats
          </button>

          <button
            onClick={() => setCurrentTab('faq')}
            style={{
              ...styles.linkBtn,
              ...(currentTab === 'faq' ? styles.activeLink : {})
            }}
          >
            FAQ
          </button>

          <button
            onClick={() => setCurrentTab('legal')}
            style={{
              ...styles.linkBtn,
              ...(currentTab === 'legal' ? styles.activeLink : {})
            }}
          >
            Legal
          </button>
        </nav>

        {/* ✅ Mobile Hamburger Button */}
        <button
          className="mobileMenuBtn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        {/* Convert Button */}
        <button
          className="desktopConvertBtn"
          style={styles.navBtn}
          onClick={() => setCurrentTab('home')}
        >
          Convert
        </button>

        {/* ✅ Mobile Dropdown Menu */}
        {menuOpen && (
          <nav className="mobileNav">

            <button
              className={currentTab === 'home' ? 'mobileActiveLink' : ''}
              onClick={() => handleMobileNavigation('home')}
            >
              Home
            </button>

            <button
              className={currentTab === 'how-it-works' ? 'mobileActiveLink' : ''}
              onClick={() => handleMobileNavigation('how-it-works')}
            >
              How it works
            </button>

            <button
              className={currentTab === 'formats' ? 'mobileActiveLink' : ''}
              onClick={() => handleMobileNavigation('formats')}
            >
              Formats
            </button>

            <button
              className={currentTab === 'faq' ? 'mobileActiveLink' : ''}
              onClick={() => handleMobileNavigation('faq')}
            >
              FAQ
            </button>

            <button
              className={currentTab === 'legal' ? 'mobileActiveLink' : ''}
              onClick={() => handleMobileNavigation('legal')}
            >
              Legal
            </button>

            <button
              className="mobileConvertBtn"
              onClick={() => handleMobileNavigation('home')}
            >
              Convert
            </button>

          </nav>
        )}

      </header>

      {/* DYNAMIC VIEW ROUTER */}
      {currentTab === 'home' ? (
        <>
          {/* Main Landing Split Screen Layout */}
          <main style={styles.splitLayout}>
            <div style={styles.textColumn}>
              <span style={styles.badge}>Permission-first audio tool</span>

              <h2 style={styles.mainTitle}>
                YouTube to<br />MP3 Converter
              </h2>

              <p style={styles.tagline}>
                Convert supported YouTube content to high-quality MP3 audio quickly and easily.
              </p>

              <ul style={styles.bulletList}>
                <li>• Works on phones, tablets and desktops</li>
                <li>• No sign-up, no software to install</li>
                <li>• Files removed automatically after 60 minutes</li>
              </ul>
            </div>

            <div style={styles.cardColumn}>
              <ConverterCard
                inputUrl={inputUrl}
                setInputUrl={setInputUrl}
                conversionType={conversionType}
                setConversionType={setConversionType}
                uiState={uiState}
                errorMessage={errorMessage}
                downloadPayload={downloadPayload}
                onConvert={initiateConversion}
                onReset={purgeState}
              />
            </div>
          </main>

          <TrustedBy />
        </>
      ) : (
        <div style={styles.subPageContainer}>
          {currentTab === 'how-it-works' && (
            <HowItWorks onBackToHome={() => setCurrentTab('home')} />
          )}

          {currentTab === 'formats' && (
            <SupportedFormats onBackToHome={() => setCurrentTab('home')} />
          )}

          {currentTab === 'faq' && (
            <FAQOverview onBackToHome={() => setCurrentTab('home')} />
          )}

          {currentTab === 'legal' && (
            <LegalOverview onBackToHome={() => setCurrentTab('home')} />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

// Fluid Grid Layout Architecture Config
const styles = {
  appWrapper: {
    width: '100vw',
    minHeight: '100vh',
    padding: '140px 40px 40px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxSizing: 'border-box'
  },

  navBar: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 40px',
    borderBottom: '1px solid var(--border-color)',
    position: 'absolute',
    top: 0,
    left: 0,
    boxSizing: 'border-box'
  },

  logoGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },

  logoIcon: {
    fontSize: '1.2rem'
  },

  logoText: {
    fontWeight: '800',
    fontSize: '1.2rem',
    color: 'var(--text-primary)'
  },

  navLinks: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },

  linkBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    outline: 'none',
    padding: '8px 16px',
    borderRadius: '16px',
    transition: 'all 0.15s'
  },

  activeLink: {
    backgroundColor: '#eef5f5',
    color: '#007074',
    fontWeight: '700'
  },

  navBtn: {
    padding: '8px 20px',
    backgroundColor: '#007074',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '0.85rem'
  },

  splitLayout: {
    width: '100%',
    maxWidth: '1200px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '60px',
    alignItems: 'center',
    margin: 'auto 0'
  },

  textColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingRight: '20px'
  },

  badge: {
    alignSelf: 'flex-start',
    padding: '6px 12px',
    backgroundColor: '#e2f0f0',
    color: '#007074',
    borderRadius: '20px',
    fontSize: '0.78rem',
    fontWeight: '700'
  },

  mainTitle: {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.1',
    color: 'var(--text-primary)',
    margin: '0'
  },

  tagline: {
    fontSize: '1.05rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    margin: '4px 0'
  },

  bulletList: {
    listStyle: 'none',
    padding: '0',
    margin: '10px 0 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    color: 'var(--text-muted)',
    fontSize: '0.9rem',
    fontWeight: '500'
  },

  cardColumn: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '620px'
  },

  subPageContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto 0'
  }
};