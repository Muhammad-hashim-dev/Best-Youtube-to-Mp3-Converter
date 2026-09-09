import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Menu,
  X,
  Sun,
  Moon,
  Play,
  Zap,
  Headphones,
  LockKeyhole,
  Smartphone,
} from "lucide-react";

import ConverterCard from "./components/ConverterCard";
import HowItWorks from "./components/HowItWorks";
import SupportedFormats from "./components/SupportedFormats";
import LegalOverview from "./components/LegalOverview";
import FAQOverview from "./components/FAQOverview";
import Footer from "./components/Footer";

export default function App() {
  /* =========================================================
     STATE
  ========================================================= */

  const [inputUrl, setInputUrl] = useState("");
  const [conversionType, setConversionType] = useState("192");

  const [uiState, setUiState] = useState("IDLE");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadPayload, setDownloadPayload] = useState(null);

  const [currentTab, setCurrentTab] = useState(
    window.location.pathname
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("clearaudio-theme") || "light";
  });

  /* =========================================================
     THEME
  ========================================================= */

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("clearaudio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  /* =========================================================
     ROUTING
  ========================================================= */

  useEffect(() => {
    const handlePopState = () => {
      setCurrentTab(window.location.pathname);
      setMenuOpen(false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentTab(path);
    setMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goHome = () => {
    navigate("/");
  };

  /* =========================================================
     YOUTUBE URL VALIDATION
  ========================================================= */

  const isValidYouTubeUrl = (url) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/|music\.youtube\.com\/watch\?v=)[\w-]+/i;

    return regex.test(url.trim());
  };

  /* =========================================================
     CONVERSION
  ========================================================= */

  const handleConvert = async (e) => {
    if (e) {
      e.preventDefault();
    }

    const url = inputUrl.trim();

    setErrorMessage("");

    if (!url) {
      setUiState("ERROR");
      setErrorMessage(
        "Please enter a YouTube video URL."
      );
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setUiState("ERROR");
      setErrorMessage(
        "Please enter a valid YouTube video URL."
      );
      return;
    }

    setUiState("PROCESSING");
    setDownloadPayload(null);

    try {
      const apiKey =
        import.meta.env.VITE_RAPIDAPI_KEY;

      if (!apiKey) {
        throw new Error(
          "RapidAPI key is missing. Please add VITE_RAPIDAPI_KEY to your .env file."
        );
      }

      const response = await axios.get(
        "https://youtube-mp36.p.rapidapi.com/dl",
        {
          params: {
            id: extractYouTubeId(url),
          },

          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host":
              "youtube-mp36.p.rapidapi.com",
          },
        }
      );

      const data = response.data;

      if (!data) {
        throw new Error(
          "No response received from conversion service."
        );
      }

      if (
        data.status &&
        data.status.toLowerCase() === "error"
      ) {
        throw new Error(
          data.msg ||
            "Unable to convert this YouTube video."
        );
      }

      if (!data.link) {
        throw new Error(
          data.msg ||
            "Conversion failed. Please try another video."
        );
      }

      setDownloadPayload({
        downloadUrl: data.link,
        title:
          data.title ||
          "ClearAudio MP3",
      });

      setUiState("SUCCESS");
    } catch (error) {
      console.error(
        "Conversion error:",
        error
      );

      let message =
        "Something went wrong. Please try again.";

      if (
        error?.response?.data?.message
      ) {
        message =
          error.response.data.message;
      } else if (error?.message) {
        message = error.message;
      }

      setErrorMessage(message);
      setUiState("ERROR");
    }
  };

  /* =========================================================
     EXTRACT YOUTUBE ID
  ========================================================= */

  const extractYouTubeId = (url) => {
    try {
      const parsed = new URL(url);

      if (
        parsed.hostname.includes("youtu.be")
      ) {
        return parsed.pathname.substring(1);
      }

      if (
        parsed.hostname.includes("youtube.com")
      ) {
        const videoId =
          parsed.searchParams.get("v");

        if (videoId) {
          return videoId;
        }

        const parts =
          parsed.pathname.split("/");

        const type = parts[1];

        if (
          type === "shorts" ||
          type === "embed"
        ) {
          return parts[2];
        }
      }

      return "";
    } catch {
      return "";
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = () => {
    setInputUrl("");
    setErrorMessage("");
    setDownloadPayload(null);
    setUiState("IDLE");
  };

  /* =========================================================
     HOME PAGE
  ========================================================= */

  const renderHome = () => {
    return (
      <main className="homePage">
        <section className="heroSection">

          {/* LEFT SIDE */}
          <div className="heroContent">

            <div className="eyebrow">
              <span className="eyebrowDot"></span>
              FAST • FREE • ONLINE
            </div>

            <h1 className="heroTitle">
              YouTube to
              <span> MP3 Converter</span>
            </h1>

            <p className="heroDescription">
              ClearAudio is a fast and simple YouTube
              to MP3 converter. Convert supported
              YouTube videos to high-quality MP3 audio
              with no software installation.
            </p>

            <div className="featureGrid">

              <FeatureCard
                icon={<Zap size={20} />}
                title="Lightning Fast"
                text="Quick audio processing"
              />

              <FeatureCard
                icon={<Headphones size={20} />}
                title="High Quality"
                text="Up to 320 kbps MP3"
              />

              <FeatureCard
                icon={<LockKeyhole size={20} />}
                title="Private"
                text="No account required"
              />

              <FeatureCard
                icon={<Smartphone size={20} />}
                title="Every Device"
                text="Mobile, tablet & desktop"
              />

            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="converterColumn">
            <ConverterCard
              inputUrl={inputUrl}
              setInputUrl={setInputUrl}
              conversionType={conversionType}
              setConversionType={
                setConversionType
              }
              uiState={uiState}
              errorMessage={errorMessage}
              downloadPayload={downloadPayload}
              onConvert={handleConvert}
              onReset={handleReset}
            />
          </div>

        </section>
      </main>
    );
  };

  /* =========================================================
     PAGES
  ========================================================= */

  const renderPage = () => {
    switch (currentTab) {
      case "/how-it-works":
        return (
          <HowItWorks
            onBackToHome={goHome}
          />
        );

      case "/formats":
        return (
          <SupportedFormats
            onBackToHome={goHome}
          />
        );

      case "/faq":
        return (
          <FAQOverview
            onBackToHome={goHome}
          />
        );

      case "/legal":
        return (
          <LegalOverview
            onBackToHome={goHome}
          />
        );

      case "/":
      default:
        return renderHome();
    }
  };

  /* =========================================================
     NAVIGATION LINKS
  ========================================================= */

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "How it works",
      path: "/how-it-works",
    },
    {
      label: "Formats",
      path: "/formats",
    },
    {
      label: "FAQ",
      path: "/faq",
    },
    {
      label: "Legal",
      path: "/legal",
    },
  ];

  return (
    <>
      <style>{`

        /* =====================================================
           THEME VARIABLES
        ===================================================== */

        :root {
          --page-bg: #fafafa;
          --card-bg: #ffffff;
          --feature-bg: #f4f4f5;

          --nav-bg: rgba(255,255,255,0.94);

          --text-primary: #111111;
          --text-secondary: #3f3f46;
          --text-muted: #71717a;

          --border-color: #e4e4e7;

          --input-bg: #ffffff;
          --input-border: #d4d4d8;

          --soft-bg: #f4f4f5;
          --secondary-button-bg: #e4e4e7;

          --accent-color: #ff0033;
          --accent-dark: #d9002b;

          --accent-soft: rgba(255,0,51,0.08);
          --accent-border: rgba(255,0,51,0.28);
          --accent-glow: rgba(255,0,51,0.18);

          --card-shadow:
            0 25px 70px rgba(0,0,0,0.12);
        }

        :root[data-theme="dark"] {
          --page-bg: #070707;
          --card-bg: #111111;
          --feature-bg: #171717;

          --nav-bg: rgba(7,7,7,0.94);

          --text-primary: #ffffff;
          --text-secondary: #e4e4e7;
          --text-muted: #a1a1aa;

          --border-color: #292929;

          --input-bg: #0b0b0b;
          --input-border: #303030;

          --soft-bg: #181818;
          --secondary-button-bg: #292929;

          --accent-color: #ff0033;
          --accent-dark: #ff1744;

          --accent-soft: rgba(255,0,51,0.12);
          --accent-border: rgba(255,0,51,0.35);
          --accent-glow: rgba(255,0,51,0.22);

          --card-shadow:
            0 25px 70px rgba(0,0,0,0.45);
        }

        /* =====================================================
           GLOBAL
        ===================================================== */

        * {
          box-sizing: border-box;
        }

        html {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
        }

        body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-width: 0;
          min-height: 100vh;

          background:
            radial-gradient(
              circle at 80% 20%,
              var(--accent-soft),
              transparent 28%
            ),
            var(--page-bg);

          color: var(--text-primary);

          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          overflow-x: hidden;

          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }

        #root {
          width: 100%;
          min-width: 0;
          overflow-x: hidden;
        }

        button,
        input,
        select {
          font: inherit;
        }

        /* =====================================================
           NAVBAR
        ===================================================== */

        .navBar {
          width: 100%;
          min-height: 104px;

          display: flex;
          align-items: center;

          padding: 18px 52px;

          background: var(--nav-bg);

          border-bottom:
            1px solid var(--border-color);

          position: sticky;
          top: 0;
          z-index: 1000;

          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);

          transition:
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .navInner {
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 30px;
        }

        .brandButton {
          display: flex;
          align-items: center;
          gap: 12px;

          background: none;
          border: none;

          color: var(--text-primary);

          cursor: pointer;

          padding: 0;
        }

        .logoIcon {
          width: 48px;
          height: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              var(--accent-color),
              var(--accent-dark)
            );

          color: white;

          border-radius: 14px;

          box-shadow:
            0 10px 30px
            rgba(255,0,51,0.25);
        }

        .logoText {
          font-size: 1.2rem;
          font-weight: 850;
          letter-spacing: -0.5px;
        }

        .desktopNav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 34px;
          flex: 1;
        }

        .navLink {
          border: none;
          background: transparent;

          color: var(--text-muted);

          font-size: 0.95rem;
          font-weight: 700;

          cursor: pointer;

          padding: 10px 2px;

          transition:
            color 0.2s ease;
        }

        .navLink:hover,
        .navLink.active {
          color: var(--accent-color);
        }

        .navActions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .themeButton {
          width: 52px;
          height: 52px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          border:
            1px solid var(--text-primary);

          background: transparent;

          color: var(--text-primary);

          cursor: pointer;

          transition:
            all 0.2s ease;
        }

        .themeButton:hover {
          background: var(--soft-bg);
          transform: translateY(-2px);
        }

        .convertNavButton {
          min-height: 52px;

          padding: 0 28px;

          border: none;
          border-radius: 14px;

          background:
            linear-gradient(
              135deg,
              var(--accent-color),
              var(--accent-dark)
            );

          color: #ffffff;

          font-weight: 800;

          cursor: pointer;

          box-shadow:
            0 10px 30px
            rgba(255,0,51,0.20);
        }

        .mobileMenuBtn {
          display: none;

          width: 44px;
          height: 44px;

          align-items: center;
          justify-content: center;

          border: 1px solid var(--border-color);
          border-radius: 12px;

          background: var(--card-bg);
          color: var(--text-primary);

          cursor: pointer;
        }

        .mobileNav {
          display: none;
        }

        /* =====================================================
           HOME
        ===================================================== */

        .homePage {
          width: 100%;
          max-width: 1500px;

          margin: 0 auto;

          padding:
            76px 52px 90px;
        }

        .heroSection {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(420px, 640px);

          align-items: center;

          gap: 70px;
        }

        .heroContent {
          min-width: 0;
        }

        .eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;

          color: var(--accent-color);

          font-size: 0.85rem;
          font-weight: 850;

          letter-spacing: 1px;

          margin-bottom: 28px;
        }

        .eyebrowDot {
          width: 9px;
          height: 9px;

          border-radius: 50%;

          background: var(--accent-color);

          box-shadow:
            0 0 18px
            var(--accent-color);
        }

        .heroTitle {
          margin: 0;

          max-width: 700px;

          font-size:
            clamp(3rem, 6vw, 5.5rem);

          line-height: 0.98;

          letter-spacing: -4px;

          font-weight: 900;

          color: var(--text-primary);
        }

        .heroTitle span {
          display: block;
          color: var(--accent-color);
        }

        .heroDescription {
          max-width: 720px;

          margin:
            30px 0 38px;

          color: var(--text-muted);

          font-size:
            clamp(1rem, 1.5vw, 1.18rem);

          line-height: 1.75;
        }

        .featureGrid {
          width: 100%;
          max-width: 760px;

          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 16px;
        }

        .featureCard {
          min-width: 0;

          display: flex;
          align-items: center;

          gap: 14px;

          padding: 22px;

          border-radius: 18px;

          background: var(--card-bg);

          border:
            1px solid var(--border-color);

          box-shadow:
            0 12px 35px
            rgba(0,0,0,0.06);

          transition:
            transform 0.2s ease,
            border-color 0.2s ease;
        }

        :root[data-theme="dark"]
        .featureCard {
          box-shadow:
            0 12px 35px
            rgba(0,0,0,0.25);
        }

        .featureCard:hover {
          transform: translateY(-3px);
          border-color: var(--accent-border);
        }

        .featureIcon {
          min-width: 38px;
          height: 38px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 11px;

          background: var(--accent-soft);

          color: var(--accent-color);
        }

        .featureInfo {
          min-width: 0;
        }

        .featureTitle {
          margin: 0 0 4px;

          color: var(--text-primary);

          font-size: 0.9rem;
          font-weight: 850;
        }

        .featureText {
          margin: 0;

          color: var(--text-muted);

          font-size: 0.75rem;

          line-height: 1.45;
        }

        .converterColumn {
          width: 100%;
          min-width: 0;

          display: flex;
          justify-content: flex-end;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 1100px) {

          .navBar {
            padding-left: 28px;
            padding-right: 28px;
          }

          .homePage {
            padding:
              55px 28px 70px;
          }

          .heroSection {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(360px, 560px);

            gap: 40px;
          }

          .desktopNav {
            gap: 20px;
          }

          .navLink {
            font-size: 0.88rem;
          }

          .heroTitle {
            font-size:
              clamp(2.8rem, 6vw, 4.5rem);

            letter-spacing: -3px;
          }

        }

        /* =====================================================
           MOBILE / TABLET
        ===================================================== */

        @media (max-width: 768px) {

          .navBar {
            min-height: 76px;

            padding:
              12px 16px;
          }

          .navInner {
            gap: 10px;
          }

          .logoIcon {
            width: 42px;
            height: 42px;

            border-radius: 12px;
          }

          .logoText {
            font-size: 1rem;
          }

          .desktopNav,
          .convertNavButton {
            display: none;
          }

          .navActions {
            margin-left: auto;
          }

          .themeButton {
            width: 42px;
            height: 42px;
          }

          .mobileMenuBtn {
            display: flex;
          }

          .mobileNav {
            position: absolute;

            top: calc(100% + 8px);
            left: 12px;
            right: 12px;

            display: flex;

            flex-direction: column;

            gap: 4px;

            padding: 10px;

            background:
              var(--card-bg);

            border:
              1px solid var(--border-color);

            border-radius: 16px;

            box-shadow:
              0 20px 50px
              rgba(0,0,0,0.18);

            z-index: 9999;
          }

          .mobileNav button {
            width: 100%;

            min-height: 44px;

            padding:
              10px 14px;

            border: none;

            background: transparent;

            color: var(--text-muted);

            border-radius: 10px;

            text-align: left;

            font-weight: 700;

            cursor: pointer;
          }

          .mobileNav button:hover,
          .mobileNav button.active {
            background: var(--accent-soft);
            color: var(--accent-color);
          }

          .mobileConvert {
            background:
              var(--accent-color) !important;

            color: white !important;

            text-align: center !important;

            margin-top: 4px;
          }

          .homePage {
            padding:
              42px 16px 60px;
          }

          .heroSection {
            grid-template-columns: 1fr;

            gap: 40px;
          }

          .heroContent {
            text-align: center;
          }

          .eyebrow {
            justify-content: center;
            margin-bottom: 20px;
          }

          .heroTitle {
            max-width: 100%;

            font-size:
              clamp(2.5rem, 11vw, 4rem);

            line-height: 1.02;

            letter-spacing: -2px;
          }

          .heroDescription {
            max-width: 650px;

            margin:
              22px auto 30px;

            font-size: 0.95rem;

            line-height: 1.65;
          }

          .featureGrid {
            max-width: 620px;
            margin: 0 auto;

            gap: 12px;
          }

          .featureCard {
            padding: 17px;

            text-align: left;
          }

          .converterColumn {
            justify-content: center;
          }

          .converterColumn > * {
            width: 100% !important;
            max-width: 640px !important;
          }

        }

        /* =====================================================
           SMALL PHONES
        ===================================================== */

        @media (max-width: 480px) {

          .homePage {
            padding:
              32px 12px 45px;
          }

          .heroSection {
            gap: 32px;
          }

          .heroTitle {
            font-size:
              clamp(2.15rem, 12vw, 3rem);

            letter-spacing: -1.5px;
          }

          .heroDescription {
            font-size: 0.88rem;
          }

          .featureGrid {
            grid-template-columns: 1fr;
          }

          .featureCard {
            padding: 15px;
          }

          .mobileNav {
            left: 8px;
            right: 8px;
          }

        }

        /* =====================================================
           VERY SMALL PHONES
        ===================================================== */

        @media (max-width: 360px) {

          .logoText {
            display: none;
          }

          .navBar {
            padding-left: 12px;
            padding-right: 12px;
          }

          .homePage {
            padding-left: 10px;
            padding-right: 10px;
          }

          .heroTitle {
            font-size: 2rem;
          }

        }

      `}</style>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navBar">
        <div className="navInner">

          <button
            className="brandButton"
            onClick={goHome}
            type="button"
          >
            <span className="logoIcon">
              <Play
                size={22}
                fill="currentColor"
              />
            </span>

            <span className="logoText">
              ClearAudio
            </span>
          </button>

          <nav className="desktopNav">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                className={`navLink ${
                  currentTab === item.path
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  navigate(item.path)
                }
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="navActions">

            <button
              type="button"
              className="themeButton"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? (
                <Sun size={20} />
              ) : (
                <Moon size={20} />
              )}
            </button>

            <button
              type="button"
              className="convertNavButton"
              onClick={goHome}
            >
              Convert
            </button>

            <button
              type="button"
              className="mobileMenuBtn"
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              aria-label="Open menu"
            >
              {menuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="mobileNav">

              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className={
                    currentTab === item.path
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    navigate(item.path)
                  }
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                className="mobileConvert"
                onClick={goHome}
              >
                Convert
              </button>

            </div>
          )}

        </div>
      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      {renderPage()}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <Footer
        onNavigate={navigate}
      />
    </>
  );
}

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  icon,
  title,
  text,
}) {
  return (
    <div className="featureCard">

      <div className="featureIcon">
        {icon}
      </div>

      <div className="featureInfo">

        <p className="featureTitle">
          {title}
        </p>

        <p className="featureText">
          {text}
        </p>

      </div>

    </div>
  );
}