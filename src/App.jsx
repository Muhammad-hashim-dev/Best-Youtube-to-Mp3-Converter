import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ArrowRight,
  Gauge,
  Moon,
  Play,
  ShieldCheck,
  Smartphone,
  Sun,
  Zap,
} from "lucide-react";

import ConverterCard from "./components/ConverterCard";
import HowItWorks from "./components/HowItWorks";
import SupportedFormats from "./components/SupportedFormats";
import LegalOverview from "./components/LegalOverview";
import FAQOverview from "./components/FAQOverview";
import Footer from "./components/Footer";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { useLanguage } from "./context/LanguageContext";

const API_URL = "https://youtube-mp36.p.rapidapi.com/dl";
const API_HOST = "youtube-mp36.p.rapidapi.com";

export default function App() {
  const { t } = useLanguage();

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
    return localStorage.getItem("clearaudio-theme") || "dark";
  });

  const navItems = [
    {
      label: t.nav.home,
      path: "/",
    },
    {
      label: t.nav.howItWorks,
      path: "/how-it-works",
    },
    {
      label: t.nav.formats,
      path: "/formats",
    },
    {
      label: t.nav.faq,
      path: "/faq",
    },
    {
      label: t.nav.legal,
      path: "/legal",
    },
  ];

  /* =========================
     THEME
  ========================= */

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("clearaudio-theme", theme);
  }, [theme]);

  /* =========================
     BROWSER BACK / FORWARD
  ========================= */

  useEffect(() => {
    const handlePopState = () => {
      setCurrentTab(window.location.pathname);
      setMenuOpen(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  /* =========================
     THEME TOGGLE
  ========================= */

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "dark" ? "light" : "dark"
    );
  };

  /* =========================
     NAVIGATION
  ========================= */

  const navigate = (route) => {
    const routeMap = {
      home: "/",
      "how-it-works": "/how-it-works",
      formats: "/formats",
      faq: "/faq",
      legal: "/legal",
    };

    const path =
      routeMap[route] ||
      (route.startsWith("/") ? route : `/${route}`);

    if (window.location.pathname !== path) {
      window.history.pushState({}, "", path);
    }

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

  /* =========================
     YOUTUBE VALIDATION
  ========================= */

  const isValidYouTubeUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/|music\.youtube\.com\/watch\?v=)[\w-]+/i.test(
      url.trim()
    );
  };

  /* =========================
     YOUTUBE ID
  ========================= */

  const extractYouTubeId = (url) => {
    try {
      const parsedUrl = new URL(
        url.startsWith("http")
          ? url
          : `https://${url}`
      );

      const hostname = parsedUrl.hostname.replace(
        /^www\./,
        ""
      );

      if (hostname === "youtu.be") {
        return parsedUrl.pathname
          .slice(1)
          .split("/")[0];
      }

      if (
        hostname === "youtube.com" ||
        hostname === "music.youtube.com"
      ) {
        const videoId =
          parsedUrl.searchParams.get("v");

        if (videoId) {
          return videoId;
        }

        const pathParts = parsedUrl.pathname
          .split("/")
          .filter(Boolean);

        if (
          pathParts[0] === "shorts" ||
          pathParts[0] === "embed"
        ) {
          return pathParts[1] || "";
        }
      }

      return "";
    } catch {
      return "";
    }
  };

  /* =========================
     CONVERSION LOGIC
     DO NOT CHANGE
  ========================= */

  const handleConvert = async () => {
    const url = inputUrl.trim();

    if (!url) {
      setErrorMessage(
        t.converter?.validationRequired ||
          "Please enter a YouTube URL."
      );

      setUiState("ERROR");
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      setErrorMessage(
        t.converter?.validationInvalid ||
          "Please enter a valid YouTube URL."
      );

      setUiState("ERROR");
      return;
    }

    const videoId = extractYouTubeId(url);

    if (!videoId) {
      setErrorMessage(
        t.converter?.validationInvalid ||
          "Unable to extract the YouTube video ID."
      );

      setUiState("ERROR");
      return;
    }

    const rapidApiKey =
      import.meta.env.VITE_RAPIDAPI_KEY;

    if (!rapidApiKey) {
      setErrorMessage(
        t.converter?.apiMissing ||
          "RapidAPI key is missing. Please check your environment variables."
      );

      setUiState("ERROR");
      return;
    }

    setUiState("CONVERTING");
    setErrorMessage("");
    setDownloadPayload(null);

    try {
      const response = await axios.get(API_URL, {
        params: {
          id: videoId,
        },
        headers: {
          "X-RapidAPI-Key": rapidApiKey,
          "X-RapidAPI-Host": API_HOST,
        },
      });

      const data = response?.data;

      if (!data) {
        throw new Error(
          t.converter?.noResponse ||
            "No response received from the conversion service."
        );
      }

      if (data.status === "ERROR") {
        throw new Error(
          data.msg ||
            t.converter?.apiUnable ||
            "The conversion service could not process this video."
        );
      }

      if (!data.link) {
        throw new Error(
          data.msg ||
            t.converter?.conversionFailed ||
            "Conversion failed. Please try again."
        );
      }

      setDownloadPayload({
        downloadUrl: data.link,
        title:
          data.title ||
          t.converter?.fileFallback ||
          "ClearAudio MP3",
      });

      setUiState("SUCCESS");
    } catch (error) {
      console.error("Conversion error:", error);

      const fallbackMessage =
        t.converter?.conversionFailed ||
        "Conversion failed. Please try again.";

      const apiMessage =
        error?.response?.data?.msg ||
        error?.response?.data?.message ||
        error?.message;

      setErrorMessage(
        apiMessage || fallbackMessage
      );

      setUiState("ERROR");
    }
  };

  /* =========================
     RESET
  ========================= */

  const handleReset = () => {
    setInputUrl("");
    setConversionType("192");
    setUiState("IDLE");
    setErrorMessage("");
    setDownloadPayload(null);
  };

  /* =========================
     DOWNLOAD
  ========================= */

  const handleDownload = () => {
    if (!downloadPayload?.downloadUrl) {
      return;
    }

    window.open(
      downloadPayload.downloadUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =========================
     HOME
  ========================= */

  const renderHome = () => {
    return (
      <main>
        <section className="heroSection">
          <div className="heroBackgroundGlow heroGlowOne" />
          <div className="heroBackgroundGlow heroGlowTwo" />

          <div className="heroContainer">
            <div className="heroGrid">

              {/* LEFT SIDE */}
              <div className="heroContent">
                <div className="heroBadge">
                  <span className="heroBadgeDot" />

                  <span>
                    {t.hero.badge}
                  </span>
                </div>

                <h1 className="heroTitle">
                  {t.hero.titleMain}{" "}
                  <span className="heroHighlight">
                    {t.hero.titleHighlight}
                  </span>
                </h1>

                <p className="heroDescription">
                  {t.hero.description}
                </p>

                <div className="heroActions">
                  <button
                    type="button"
                    className="heroPrimaryButton"
                    onClick={() => {
                      document
                        .getElementById("converter")
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                    }}
                  >
                    {t.hero.button}

                    <ArrowRight size={18} />
                  </button>
                </div>

                {/* FEATURES */}
                <div className="heroFeatures">

                  <div className="heroFeatureCard">
                    <div className="heroFeatureIcon">
                      <Zap size={20} />
                    </div>

                    <div>
                      <h3>
                        {t.hero.features?.fast?.title}
                      </h3>

                      <p>
                        {t.hero.features?.fast?.text}
                      </p>
                    </div>
                  </div>

                  <div className="heroFeatureCard">
                    <div className="heroFeatureIcon">
                      <Gauge size={20} />
                    </div>

                    <div>
                      <h3>
                        {t.hero.features?.quality?.title}
                      </h3>

                      <p>
                        {t.hero.features?.quality?.text}
                      </p>
                    </div>
                  </div>

                  <div className="heroFeatureCard">
                    <div className="heroFeatureIcon">
                      <ShieldCheck size={20} />
                    </div>

                    <div>
                      <h3>
                        {t.hero.features?.private?.title}
                      </h3>

                      <p>
                        {t.hero.features?.private?.text}
                      </p>
                    </div>
                  </div>

                  <div className="heroFeatureCard">
                    <div className="heroFeatureIcon">
                      <Smartphone size={20} />
                    </div>

                    <div>
                      <h3>
                        {t.hero.features?.device?.title}
                      </h3>

                      <p>
                        {t.hero.features?.device?.text}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* RIGHT SIDE CONVERTER */}
              <div
                id="converter"
                className="converterWrapper"
              >
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
                  onDownload={handleDownload}
                />
              </div>

            </div>
          </div>
        </section>
      </main>
    );
  };

  /* =========================
     PAGE ROUTING
  ========================= */

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
            onGoToFaq={() => navigate("/faq")}
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
      case "":
      default:
        return renderHome();
    }
  };

  return (
    <div className="app">

      {/* =========================
          HEADER
      ========================= */}

      <header className="siteHeader">
        <div className="headerContainer">

          {/* BRAND */}
          <button
            type="button"
            className="brandButton"
            onClick={goHome}
            aria-label="ClearAudio Home"
          >
            <div className="brandIcon">
              <Play
                size={17}
                fill="currentColor"
              />
            </div>

            <span className="brandName">
              ClearAudio
            </span>
          </button>

          {/* DESKTOP NAV */}
          <nav className="desktopNav">
            {navItems.map((item) => (
              <button
                key={item.path}
                type="button"
                className={`navLink ${
                  currentTab === item.path
                    ? "navLinkActive"
                    : ""
                }`}
                onClick={() =>
                  navigate(item.path)
                }
              >
                {item.label}
              </button>
            ))}

            <LanguageSwitcher />

            <button
              type="button"
              className="themeButton"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? t.nav.lightMode
                  : t.nav.darkMode
              }
              title={
                theme === "dark"
                  ? t.nav.lightMode
                  : t.nav.darkMode
              }
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              type="button"
              className="headerConvertButton"
              onClick={() => {
                navigate("/");

                setTimeout(() => {
                  document
                    .getElementById("converter")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                }, 50);
              }}
            >
              {t.nav.convert}
            </button>
          </nav>

          {/* MOBILE HEADER */}
          <div className="mobileHeaderActions">

            <LanguageSwitcher mobile />

            <button
              type="button"
              className="themeButton"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? t.nav.lightMode
                  : t.nav.darkMode
              }
              title={
                theme === "dark"
                  ? t.nav.lightMode
                  : t.nav.darkMode
              }
            >
              {theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              type="button"
              className="mobileMenuButton"
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              aria-expanded={menuOpen}
              aria-label={
                menuOpen
                  ? t.nav.closeMenu
                  : t.nav.openMenu
              }
            >
              {menuOpen ? (
                <span>×</span>
              ) : (
                <span>☰</span>
              )}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="mobileMenu">
            <nav className="mobileNav">

              {navItems.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  className={`mobileNavLink ${
                    currentTab === item.path
                      ? "mobileNavLinkActive"
                      : ""
                  }`}
                  onClick={() =>
                    navigate(item.path)
                  }
                >
                  {item.label}
                </button>
              ))}

              <button
                type="button"
                className="mobileNavConvert"
                onClick={() => {
                  navigate("/");

                  setTimeout(() => {
                    document
                      .getElementById("converter")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                  }, 50);
                }}
              >
                {t.nav.convert}

                <ArrowRight size={17} />
              </button>

            </nav>
          </div>
        )}
      </header>

      {renderPage()}

      <Footer onNavigate={navigate} />

      {/* =========================
          GLOBAL STYLES
      ========================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          background: var(--bg-primary);
          color: var(--text-primary);
        }

        body::selection {
          background: var(--accent);
          color: #ffffff;
        }

        button,
        input,
        select,
        textarea {
          font: inherit;
        }

        button {
          cursor: pointer;
        }

        :root {
          /* =========================
             DARK THEME
          ========================= */

          --bg-primary: #050505;
          --bg-secondary: #0a0a0a;

          --bg-card: #101010;
          --bg-card-hover: #151515;

          --border: rgba(255, 255, 255, 0.08);
          --border-strong: rgba(255, 255, 255, 0.14);

          --text-primary: #f7f7f8;
          --text-secondary: #a7adba;
          --text-muted: #747b89;

          --accent: #ff315f;
          --accent-hover: #ff4c73;

          --accent-soft: rgba(
            255,
            49,
            95,
            0.10
          );

          --shadow:
            0 20px 60px rgba(0, 0, 0, 0.38);

          --card-bg: var(--bg-card);
          --border-color: var(--border);
          --accent-color: var(--accent);

          --accent-border: rgba(
            255,
            49,
            95,
            0.22
          );

          --soft-bg: var(--bg-secondary);

          --feature-bg: #111111;
          --card-shadow:
            0 25px 70px rgba(0, 0, 0, 0.45);

          --input-bg: #0b0b0b;
          --input-border:
            rgba(255, 255, 255, 0.11);

          --accent-glow:
            rgba(255, 49, 95, 0.18);

          --secondary-button-bg: #101010;
        }

        :root[data-theme="light"] {

          --bg-primary: #f5f6f8;
          --bg-secondary: #ffffff;

          --bg-card: #ffffff;
          --bg-card-hover: #fafafa;

          --border:
            rgba(15, 23, 42, 0.09);

          --border-strong:
            rgba(15, 23, 42, 0.14);

          --text-primary: #111827;
          --text-secondary: #5f6775;
          --text-muted: #7c8491;

          --accent: #e91e4d;
          --accent-hover: #d91644;

          --accent-soft:
            rgba(233, 30, 77, 0.08);

          --shadow:
            0 20px 60px rgba(
              15,
              23,
              42,
              0.08
            );

          --card-bg: var(--bg-card);
          --border-color: var(--border);
          --accent-color: var(--accent);

          --accent-border:
            rgba(233, 30, 77, 0.18);

          --soft-bg: #f8f9fb;

          --feature-bg: #ffffff;

          --card-shadow:
            0 25px 70px rgba(
              15,
              23,
              42,
              0.10
            );

          --input-bg: #fafafa;

          --input-border:
            rgba(15, 23, 42, 0.12);

          --accent-glow:
            rgba(233, 30, 77, 0.10);

          --secondary-button-bg:
            #ffffff;
        }

        /* =========================
           APP BACKGROUND
        ========================= */

        .app {
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;

          background:
            radial-gradient(
              circle at 78% 22%,
              rgba(255, 49, 95, 0.055),
              transparent 28%
            ),
            radial-gradient(
              circle at 18% 55%,
              rgba(255, 49, 95, 0.025),
              transparent 30%
            ),
            #050505;

          color: var(--text-primary);
        }

        :root[data-theme="light"] .app {
          background:
            radial-gradient(
              circle at 78% 20%,
              rgba(233, 30, 77, 0.035),
              transparent 28%
            ),
            var(--bg-primary);
        }

        /* =========================
           HEADER
        ========================= */

        .siteHeader {
          position: sticky;
          top: 0;
          z-index: 1000;

          background:
            color-mix(
              in srgb,
              var(--bg-primary) 88%,
              transparent
            );

          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          border-bottom:
            1px solid var(--border);
        }

        .headerContainer {
          width: min(
            1240px,
            calc(100% - 48px)
          );

          min-height: 78px;
          margin: 0 auto;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 24px;
        }

        .brandButton {
          display: inline-flex;
          align-items: center;
          gap: 11px;

          padding: 0;

          border: 0;
          background: transparent;

          color: var(--text-primary);
        }

        .brandIcon {
          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          border-radius: 11px;

          color: #ffffff;

          background:
            linear-gradient(
              135deg,
              #ff174d,
              #ff315f
            );

          box-shadow:
            0 8px 28px
            rgba(255, 49, 95, 0.28);
        }

        .brandName {
          font-size: 20px;
          font-weight: 850;
          letter-spacing: -0.04em;
        }

        .desktopNav {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .navLink {
          border: 0;
          background: transparent;

          color: var(--text-secondary);

          padding: 10px 13px;
          border-radius: 10px;

          font-size: 14px;
          font-weight: 700;

          transition:
            color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .navLink:hover {
          color: var(--text-primary);
          background: var(--accent-soft);
        }

        .navLinkActive {
          color: var(--accent);
          background: var(--accent-soft);
        }

        /* =========================
           LANGUAGE
        ========================= */

        .languageSwitcher {
          position: relative;
          display: inline-flex;
        }

        .languageSwitcherButton {
          min-height: 38px;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 7px;
          padding: 0 11px;

          border:
            1px solid var(--border);

          border-radius: 10px;

          background:
            color-mix(
              in srgb,
              var(--bg-card) 94%,
              transparent
            );

          color: var(--text-secondary);

          font-size: 13px;
          font-weight: 700;

          transition:
            border-color 0.2s ease,
            color 0.2s ease,
            background 0.2s ease;
        }

        .languageSwitcherButton:hover {
          color: var(--text-primary);

          border-color:
            var(--border-strong);

          background:
            var(--bg-card-hover);
        }

        .languageFlag {
          font-size: 16px;
          line-height: 1;
        }

        .languageCurrent {
          white-space: nowrap;
        }

        .languageChevron {
          transition:
            transform 0.2s ease;
        }

        .languageChevronOpen {
          transform: rotate(180deg);
        }

        .languageDropdown {
          position: absolute;

          top: calc(100% + 8px);
          right: 0;

          width: 170px;
          padding: 6px;

          border:
            1px solid var(--border);

          border-radius: 13px;

          background:
            var(--bg-secondary);

          box-shadow:
            0 18px 50px
            rgba(0, 0, 0, 0.32);

          z-index: 2000;
        }

        .languageOption {
          width: 100%;

          display: flex;
          align-items: center;

          gap: 9px;
          padding: 10px;

          border: 0;
          border-radius: 9px;

          background: transparent;

          color: var(--text-secondary);

          text-align: left;

          font-size: 13px;
          font-weight: 700;
        }

        .languageOption:hover {
          color: var(--text-primary);
          background: var(--accent-soft);
        }

        .languageOptionActive {
          color: var(--accent);
          background: var(--accent-soft);
        }

        .languageOptionFlag {
          font-size: 17px;
          line-height: 1;
        }

        .languageOptionName {
          flex: 1;
        }

        .languageCheck {
          color: var(--accent);
        }

        /* =========================
           THEME
        ========================= */

        .themeButton {
          width: 40px;
          height: 40px;

          display: grid;
          place-items: center;

          border:
            1px solid var(--border);

          border-radius: 50%;

          background: transparent;

          color: var(--text-primary);

          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .themeButton:hover {
          border-color:
            var(--border-strong);

          background:
            var(--accent-soft);

          transform:
            translateY(-1px);
        }

        /* =========================
           CONVERT BUTTON
        ========================= */

        .headerConvertButton,
        .mobileNavConvert {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 8px;

          border: 0;
          border-radius: 11px;

          padding: 11px 19px;

          background:
            linear-gradient(
              135deg,
              #ff174d,
              #ff315f
            );

          color: #ffffff;

          font-size: 14px;
          font-weight: 800;

          box-shadow:
            0 9px 26px
            rgba(255, 49, 95, 0.20);

          transition:
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .headerConvertButton:hover,
        .mobileNavConvert:hover {
          background:
            linear-gradient(
              135deg,
              #ff315f,
              #ff4c73
            );

          transform:
            translateY(-1px);

          box-shadow:
            0 12px 30px
            rgba(255, 49, 95, 0.28);
        }

        /* =========================
           MOBILE HEADER
        ========================= */

        .mobileHeaderActions {
          display: none;
          align-items: center;
          gap: 8px;
        }

        .mobileMenuButton {
          width: 40px;
          height: 40px;

          display: grid;
          place-items: center;

          border:
            1px solid var(--border);

          border-radius: 10px;

          background:
            var(--bg-card);

          color:
            var(--text-primary);

          font-size: 22px;
          line-height: 1;
        }

        .mobileMenu {
          border-top:
            1px solid var(--border);

          background:
            color-mix(
              in srgb,
              var(--bg-secondary) 96%,
              transparent
            );

          backdrop-filter:
            blur(20px);
        }

        .mobileNav {
          width: min(
            calc(100% - 28px),
            1240px
          );

          margin: 0 auto;

          padding:
            13px 0 18px;

          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .mobileNavLink {
          width: 100%;

          text-align: left;

          border: 0;
          background: transparent;

          color:
            var(--text-secondary);

          padding:
            12px 13px;

          border-radius: 10px;

          font-size: 14px;
          font-weight: 700;
        }

        .mobileNavLink:hover {
          color: var(--text-primary);
          background: var(--accent-soft);
        }

        .mobileNavLinkActive {
          color: var(--accent);
          background: var(--accent-soft);
        }

        .mobileNavConvert {
          margin-top: 8px;
          width: 100%;
        }

        /* =========================
           HERO
        ========================= */

        .heroSection {
          position: relative;
          overflow: hidden;

          padding:
            105px 0 90px;

          background:
            radial-gradient(
              circle at 82% 12%,
              rgba(255, 49, 95, 0.075),
              transparent 25%
            ),
            radial-gradient(
              circle at 15% 75%,
              rgba(255, 49, 95, 0.025),
              transparent 30%
            ),
            #050505;
        }

        :root[data-theme="light"] .heroSection {
          background:
            radial-gradient(
              circle at 82% 12%,
              rgba(233, 30, 77, 0.055),
              transparent 27%
            ),
            var(--bg-primary);
        }

        .heroSection::before {
          content: "";

          position: absolute;

          width: 650px;
          height: 650px;

          top: -260px;
          right: -230px;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                49,
                95,
                0.07
              ),
              transparent 68%
            );

          filter: blur(45px);

          border-radius: 50%;

          pointer-events: none;
        }

        .heroSection::after {
          content: "";

          position: absolute;

          width: 450px;
          height: 450px;

          bottom: -300px;
          left: -200px;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                49,
                95,
                0.025
              ),
              transparent 70%
            );

          filter: blur(55px);

          pointer-events: none;
        }

        .heroBackgroundGlow {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(90px);
        }

        .heroGlowOne {
          width: 420px;
          height: 420px;

          right: 20%;
          top: 15%;

          background:
            rgba(
              255,
              49,
              95,
              0.025
            );
        }

        .heroGlowTwo {
          width: 300px;
          height: 300px;

          left: 25%;
          bottom: 0;

          background:
            rgba(
              255,
              49,
              95,
              0.018
            );
        }

        .heroContainer,
        .sectionContainer {
          width: min(
            1240px,
            calc(100% - 48px)
          );

          margin: 0 auto;
        }

        .heroGrid {
          position: relative;
          z-index: 1;

          display: grid;

          grid-template-columns:
            minmax(0, 0.92fr)
            minmax(500px, 1.08fr);

          align-items: center;

          gap: 72px;
        }

        .heroContent {
          min-width: 0;
        }

        .heroBadge {
          width: fit-content;

          display: inline-flex;
          align-items: center;

          gap: 9px;

          margin-bottom: 22px;

          padding:
            8px 12px;

          border:
            1px solid var(--accent-border);

          border-radius: 999px;

          background:
            var(--accent-soft);

          color:
            var(--accent);

          font-size: 12px;
          font-weight: 800;

          letter-spacing: 0.08em;

          text-transform: uppercase;
        }

        .heroBadgeDot {
          width: 7px;
          height: 7px;

          border-radius: 50%;

          background:
            var(--accent);

          box-shadow:
            0 0 14px
            var(--accent);
        }

        .heroTitle {
          max-width: 680px;

          margin: 0;

          font-size:
            clamp(
              48px,
              5.5vw,
              78px
            );

          line-height: 0.97;

          letter-spacing:
            -0.065em;

          font-weight: 950;

          color:
            var(--text-primary);
        }

        .heroHighlight {
          color:
            var(--accent);

          text-shadow:
            0 0 30px
            rgba(
              255,
              49,
              95,
              0.08
            );
        }

        .heroDescription {
          max-width: 610px;

          margin:
            27px 0 0;

          color:
            var(--text-secondary);

          font-size: 17px;
          line-height: 1.75;
        }

        .heroActions {
          margin-top: 31px;
        }

        .heroPrimaryButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          gap: 9px;

          border: 0;
          border-radius: 12px;

          padding:
            14px 20px;

          background:
            linear-gradient(
              135deg,
              #ff174d,
              #ff315f
            );

          color: #ffffff;

          font-weight: 800;

          box-shadow:
            0 14px 38px
            rgba(
              255,
              49,
              95,
              0.24
            );

          transition:
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .heroPrimaryButton:hover {
          background:
            linear-gradient(
              135deg,
              #ff315f,
              #ff4c73
            );

          transform:
            translateY(-2px);

          box-shadow:
            0 18px 42px
            rgba(
              255,
              49,
              95,
              0.30
            );
        }

        /* =========================
           FEATURE CARDS
        ========================= */

        .heroFeatures {
          margin-top: 48px;

          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 12px;

          text-align: left;
        }

        .heroFeatureCard {
          display: flex;

          gap: 12px;

          min-width: 0;

          padding: 16px;

          border:
            1px solid var(--border);

          border-radius: 14px;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.035),
              rgba(255, 255, 255, 0.012)
            );

          box-shadow:
            0 15px 40px
            rgba(0, 0, 0, 0.22);

          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }

        :root[data-theme="light"]
          .heroFeatureCard {
          background:
            var(--bg-card);
        }

        .heroFeatureCard:hover {
          transform:
            translateY(-2px);

          border-color:
            var(--border-strong);

          background:
            linear-gradient(
              145deg,
              rgba(
                255,
                49,
                95,
                0.055
              ),
              rgba(
                255,
                255,
                255,
                0.015
              )
            );
        }

        .heroFeatureIcon {
          flex: 0 0 auto;

          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          border-radius: 10px;

          background:
            var(--accent-soft);

          color:
            var(--accent);

          box-shadow:
            inset 0 0 0 1px
            rgba(
              255,
              49,
              95,
              0.05
            );
        }

        .heroFeatureCard h3 {
          margin:
            1px 0 4px;

          color:
            var(--text-primary);

          font-size: 13px;
          font-weight: 800;
        }

        .heroFeatureCard p {
          margin: 0;

          color:
            var(--text-muted);

          font-size: 11px;
          line-height: 1.5;
        }

        /* =========================
           CONVERTER
        ========================= */

        .converterWrapper {
          width: 100%;

          min-width: 0;

          position: relative;
        }

        .converterWrapper::before {
          content: "";

          position: absolute;

          inset:
            -12% -10% -12%;

          background:
            radial-gradient(
              ellipse at center,
              rgba(
                255,
                49,
                95,
                0.13
              ),
              rgba(
                255,
                49,
                95,
                0.035
              ) 38%,
              transparent 70%
            );

          filter: blur(32px);

          z-index: 0;

          pointer-events: none;
        }

        .converterWrapper::after {
          content: "";

          position: absolute;

          width: 70%;
          height: 70%;

          top: 15%;
          left: 15%;

          border-radius: 50%;

          background:
            rgba(
              255,
              49,
              95,
              0.025
            );

          filter: blur(55px);

          z-index: 0;

          pointer-events: none;
        }

        .converterWrapper > * {
          position: relative;
          z-index: 1;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 1050px) {

          .desktopNav {
            display: none;
          }

          .mobileHeaderActions {
            display: flex;
          }

          .heroGrid {
            grid-template-columns: 1fr;
            gap: 55px;
          }

          .heroContent {
            text-align: center;
          }

          .heroBadge {
            margin-left: auto;
            margin-right: auto;
          }

          .heroTitle {
            margin-left: auto;
            margin-right: auto;
          }

          .heroDescription {
            margin-left: auto;
            margin-right: auto;
          }

          .heroActions {
            display: flex;
            justify-content: center;
          }

          .heroFeatures {
            text-align: left;
          }

          .converterWrapper {
            max-width: 720px;
            margin: 0 auto;
          }
        }

        /* =========================
           SMALL TABLET
        ========================= */

        @media (max-width: 720px) {

          .headerContainer,
          .heroContainer,
          .sectionContainer {
            width: min(
              calc(100% - 32px),
              1240px
            );
          }

          .heroSection {
            padding:
              65px 0 55px;
          }

          .heroTitle {
            font-size:
              clamp(
                42px,
                10vw,
                62px
              );
          }

          .heroDescription {
            font-size: 15px;
          }

          .heroFeatures {
            grid-template-columns: 1fr;

            margin-top: 38px;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 520px) {

          .headerContainer {
            min-height: 68px;
          }

          .brandIcon {
            width: 35px;
            height: 35px;

            border-radius: 10px;
          }

          .brandName {
            font-size: 18px;
          }

          .mobileHeaderActions {
            gap: 6px;
          }

          .themeButton,
          .mobileMenuButton {
            width: 37px;
            height: 37px;
          }

          .languageSwitcherMobile
            .languageSwitcherButton {
            min-height: 37px;

            width: 43px;

            padding: 0;
          }

          .languageSwitcherMobile
            .languageCurrent,
          .languageSwitcherMobile
            .languageChevron {
            display: none;
          }

          .languageSwitcherMobile
            .languageSwitcherButton
            svg:first-child {
            display: none;
          }

          .languageSwitcherMobile
            .languageDropdown {
            right: 0;
            width: 165px;
          }

          .heroSection {
            padding:
              52px 0 45px;
          }

          .heroTitle {
            font-size:
              clamp(
                39px,
                12vw,
                53px
              );

            letter-spacing:
              -0.06em;
          }

          .heroDescription {
            font-size: 14px;
            line-height: 1.65;
          }

          .heroPrimaryButton {
            width: 100%;
            padding:
              14px 18px;
          }

          .heroFeatures {
            gap: 10px;
          }

          .heroFeatureCard {
            padding: 14px;
          }

          .converterWrapper {
            width: 100%;
          }
        }

        /* =========================
           VERY SMALL MOBILE
        ========================= */

        @media (max-width: 380px) {

          .headerContainer,
          .heroContainer,
          .sectionContainer {
            width:
              calc(100% - 22px);
          }

          .brandName {
            font-size: 17px;
          }

          .heroTitle {
            font-size: 38px;
          }

          .mobileHeaderActions {
            gap: 4px;
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;

            transition-duration:
              0.01ms !important;

            animation-duration:
              0.01ms !important;
          }
        }

      `}</style>
    </div>
  );
}