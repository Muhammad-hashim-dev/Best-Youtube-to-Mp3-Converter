import React from "react";
import { Music } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer({ onNavigate }) {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  // Convert footer route names into the exact paths
  // expected by App.jsx
  const handleNavigation = (page) => {
    if (!onNavigate) return;

    const routes = {
      home: "/",
      "how-it-works": "/how-it-works",
      formats: "/formats",
      faq: "/faq",
      legal: "/legal",
    };

    const path = routes[page] || page;

    onNavigate(path);
  };

  return (
    <footer className="footer">
      <div className="footerInner">
        {/* =========================
            TOP FOOTER
        ========================= */}
        <div className="footerTop">
          {/* BRAND */}
          <div className="footerBrand">
            <button
              type="button"
              className="footerBrandButton"
              onClick={() => handleNavigation("home")}
              aria-label="Go to home"
            >
              <span className="footerBrandIcon">
                <Music size={20} strokeWidth={2.5} />
              </span>

              <span className="footerBrandName">HowToMp3</span>
            </button>

            <p className="footerDescription">{t.footer.description}</p>
          </div>

          {/* LINKS */}
          <div className="footerLinks">
            {/* QUICK LINKS */}
            <div className="footerColumn">
              <span className="footerColumnTitle">{t.footer.quickLinks}</span>

              <button
                type="button"
                className="footerLink"
                onClick={() => handleNavigation("how-it-works")}
              >
                {t.footer.howItWorks}
              </button>

              <button
                type="button"
                className="footerLink"
                onClick={() => handleNavigation("formats")}
              >
                {t.footer.formats}
              </button>

              <button
                type="button"
                className="footerLink"
                onClick={() => handleNavigation("faq")}
              >
                {t.footer.faq}
              </button>
            </div>

            {/* LEGAL */}
            <div className="footerColumn">
              <span className="footerColumnTitle">{t.footer.legal}</span>

              <button
                type="button"
                className="footerLink"
                onClick={() => handleNavigation("legal")}
              >
                {t.footer.terms}
              </button>

              <button
                type="button"
                className="footerLink"
                onClick={() => handleNavigation("legal")}
              >
                {t.footer.privacy}
              </button>

              <button
                type="button"
                className="footerLink"
                onClick={() => handleNavigation("legal")}
              >
                {t.footer.copyright}
              </button>
            </div>
          </div>
        </div>

        {/* =========================
            SEPARATOR
        ========================= */}
        <div className="footerSeparator" />

        {/* =========================
            BOTTOM FOOTER
        ========================= */}
        <div className="footerBottom">
          <p className="footerCopyright">
            © {currentYear} <strong>ClearAudio</strong>.{" "}
            {t.footer.allRightsReserved || t.footer.copyright}
          </p>

          <div className="footerSignature">
            <span className="footerDevLabel">{t.footer.developedBy}</span>

            <a
              href="https://muhammad-hashim-dev.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="footerDeveloper"
            >
              Muhammad Hashim
              <span className="footerPulseDot" />
            </a>
          </div>
        </div>
      </div>

      {/* =========================
          FOOTER STYLES
      ========================= */}
      <style>{`
        .footer {
          width: 100%;
          margin-top: 70px;
          padding: 0 24px 28px;
          background: transparent;
        }

        .footerInner {
          width: min(1200px, 100%);
          margin: 0 auto;
          padding-top: 45px;
          border-top: 1px solid var(--border-color);
        }

        /* =========================
           TOP
        ========================= */

        .footerTop {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 60px;
        }

        .footerBrand {
          flex: 1 1 420px;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footerBrandButton {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0;
          margin: 0;
          border: 0;
          background: transparent;
          color: var(--text-primary);
          font-family: inherit;
          cursor: pointer;
        }

        .footerBrandIcon {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: linear-gradient(
            135deg,
            var(--accent-color),
            #ff1744
          );
          color: #ffffff;
          font-size: 0.75rem;
          box-shadow:
            0 8px 24px rgba(255, 0, 51, 0.22);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .footerBrandButton:hover .footerBrandIcon {
          transform: translateY(-2px);
          box-shadow:
            0 10px 28px rgba(255, 0, 51, 0.30);
        }

        .footerBrandName {
          font-size: 1.25rem;
          font-weight: 850;
          letter-spacing: -0.6px;
        }

        .footerDescription {
          max-width: 430px;
          margin: 15px 0 0;
          color: var(--text-muted);
          font-size: 0.86rem;
          line-height: 1.7;
          font-weight: 500;
        }

        /* =========================
           LINKS
        ========================= */

        .footerLinks {
          display: flex;
          align-items: flex-start;
          gap: 85px;
          flex-shrink: 0;
        }

        .footerColumn {
          min-width: 120px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .footerColumnTitle {
          margin-bottom: 6px;
          color: var(--text-primary);
          font-size: 0.74rem;
          font-weight: 850;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .footerLink {
          padding: 0;
          margin: 0;
          border: 0;
          background: transparent;
          color: var(--text-muted);
          font-family: inherit;
          font-size: 0.84rem;
          font-weight: 550;
          line-height: 1.5;
          text-align: left;
          cursor: pointer;
          transition:
            color 0.2s ease,
            transform 0.2s ease;
        }

        .footerLink:hover {
          color: var(--accent-color);
          transform: translateX(2px);
        }

        /* =========================
           SEPARATOR
        ========================= */

        .footerSeparator {
          width: 100%;
          height: 1px;
          margin: 35px 0 24px;
          background: var(--border-color);
          opacity: 0.9;
        }

        /* =========================
           BOTTOM
        ========================= */

        .footerBottom {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .footerCopyright {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.76rem;
          line-height: 1.5;
          font-weight: 500;
        }

        .footerCopyright strong {
          color: var(--text-secondary);
          font-weight: 750;
        }

        .footerSignature {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 13px;
          border: 1px solid var(--border-color);
          border-radius: 999px;
          background: var(--soft-bg);
          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            transform 0.2s ease;
        }

        .footerSignature:hover {
          border-color: var(--accent-border);
          background: var(--accent-soft);
          transform: translateY(-1px);
        }

        .footerDevLabel {
          color: var(--text-muted);
          font-size: 0.72rem;
          font-weight: 600;
        }

        .footerDeveloper {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--accent-color);
          text-decoration: none;
          font-size: 0.79rem;
          font-weight: 850;
          transition: opacity 0.2s ease;
        }

        .footerDeveloper:hover {
          opacity: 0.82;
        }

        .footerPulseDot {
          width: 6px;
          height: 6px;
          display: inline-block;
          border-radius: 50%;
          background: #10b981;
          box-shadow:
            0 0 8px rgba(16, 185, 129, 0.45);
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 760px) {
          .footer {
            margin-top: 55px;
            padding: 0 18px 24px;
          }

          .footerInner {
            padding-top: 38px;
          }

          .footerTop {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 35px;
          }

          .footerBrand {
            width: 100%;
            align-items: center;
            flex: none;
          }

          .footerDescription {
            max-width: 520px;
            margin-left: auto;
            margin-right: auto;
          }

          .footerLinks {
            width: 100%;
            justify-content: center;
            gap: 65px;
          }

          .footerColumn {
            align-items: center;
          }

          .footerLink {
            text-align: center;
          }

          .footerLink:hover {
            transform: translateY(-1px);
          }

          .footerBottom {
            flex-direction: column-reverse;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 16px;
          }

          .footerCopyright {
            text-align: center;
          }

          .footerSignature {
            justify-content: center;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 520px) {
          .footer {
            margin-top: 45px;
            padding: 0 14px 22px;
          }

          .footerInner {
            padding-top: 32px;
          }

          .footerTop {
            gap: 30px;
          }

          .footerBrandButton {
            justify-content: center;
          }

          .footerBrandIcon {
            width: 34px;
            height: 34px;
          }

          .footerBrandName {
            font-size: 1.15rem;
          }

          .footerDescription {
            max-width: 330px;
            font-size: 0.81rem;
            line-height: 1.65;
          }

          .footerLinks {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 28px;
            justify-items: center;
          }

          .footerColumn {
            width: 100%;
            min-width: 0;
            align-items: center;
          }

          .footerColumnTitle {
            font-size: 0.7rem;
          }

          .footerLink {
            font-size: 0.8rem;
          }

          .footerSeparator {
            margin: 30px 0 20px;
          }

          .footerBottom {
            gap: 14px;
          }

          .footerCopyright {
            max-width: 330px;
            font-size: 0.72rem;
          }

          .footerSignature {
            padding: 7px 11px;
          }
        }

        /* =========================
           VERY SMALL MOBILE
        ========================= */

        @media (max-width: 360px) {
          .footer {
            padding-left: 11px;
            padding-right: 11px;
          }

          .footerLinks {
            gap: 22px;
          }

          .footerLink {
            font-size: 0.76rem;
          }

          .footerDescription {
            font-size: 0.78rem;
          }

          .footerDevLabel {
            font-size: 0.68rem;
          }

          .footerDeveloper {
            font-size: 0.75rem;
          }
        }

        /* =========================
           REDUCED MOTION
        ========================= */

        @media (prefers-reduced-motion: reduce) {
          .footerBrandIcon,
          .footerLink,
          .footerSignature,
          .footerDeveloper {
            transition: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
