import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function SupportedFormats({
  onBackToHome,
  onGoToFaq,
}) {
  const { t } = useLanguage();

  const bitrates = [
    {
      rate: "128 kbps",
      size: "~1 MB per minute",
      best: t.formats.bitrate128,
    },
    {
      rate: "192 kbps",
      size: "~1.4 MB per minute",
      best: t.formats.bitrate192,
    },
    {
      rate: "256 kbps",
      size: "~1.9 MB per minute",
      best: t.formats.bitrate256,
    },
    {
      rate: "320 kbps",
      size: "~2.4 MB per minute",
      best: t.formats.bitrate320,
    },
  ];

  return (
    <main className="formatsPage">
      <style>{`
        .formatsPage {
          width: min(1050px, calc(100% - 48px));
          margin: 0 auto;
          padding: 48px 0 80px;
          color: var(--text-primary);
        }

        /* Breadcrumbs */
        .formatsBreadcrumbs {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .formatsBreadcrumbLink {
          color: var(--accent-color);
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }

        .formatsBreadcrumbLink:hover {
          opacity: 0.75;
        }

        .formatsBreadcrumbDivider {
          color: var(--border-color);
        }

        /* Header */
        .formatsTitle {
          margin: 0 0 14px;
          font-size: 2.7rem;
          line-height: 1.12;
          letter-spacing: -1.2px;
          font-weight: 850;
          color: var(--text-primary);
        }

        .formatsSubtitle {
          max-width: 760px;
          margin: 0 0 42px;
          color: var(--text-muted);
          font-size: 1.02rem;
          line-height: 1.7;
        }

        /* Section */
        .formatsSection {
          margin-top: 38px;
        }

        .formatsSectionTitle {
          margin: 0 0 16px;
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .formatsSectionText {
          max-width: 850px;
          margin: 0 0 22px;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
        }

        /* Supported link cards */
        .formatCards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .formatCard {
          min-width: 0;
          padding: 20px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 18px;
          box-shadow: var(--shadow-sm);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
        }

        .formatCard:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: var(--accent-border);
        }

        .formatIcon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          border-radius: 12px;
          background: var(--accent-soft);
          color: var(--accent-color);
          font-size: 0.9rem;
          font-weight: 900;
        }

        .formatCardTitle {
          margin: 0;
          color: var(--text-primary);
          font-size: 0.95rem;
          font-weight: 800;
          line-height: 1.35;
        }

        .formatCardText {
          margin: 7px 0 0;
          color: var(--text-muted);
          font-size: 0.78rem;
          line-height: 1.55;
        }

        /* Output */
        .outputCard {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 22px;
          background:
            linear-gradient(
              135deg,
              var(--card-bg),
              var(--accent-soft)
            );
          border: 1px solid var(--border-color);
          border-radius: 18px;
          box-shadow: var(--shadow-sm);
        }

        .outputBadge {
          width: 52px;
          height: 52px;
          min-width: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: var(--accent-color);
          color: var(--page-bg);
          font-size: 0.78rem;
          font-weight: 900;
        }

        .outputTitle {
          margin: 0 0 5px;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 800;
        }

        .outputText {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.86rem;
          line-height: 1.6;
        }

        /* Bitrate table */
        .bitrateTableWrap {
          width: 100%;
          overflow-x: auto;
          border: 1px solid var(--border-color);
          border-radius: 18px;
          background: var(--card-bg);
          box-shadow: var(--shadow-sm);
        }

        .bitrateTable {
          width: 100%;
          min-width: 680px;
          border-collapse: collapse;
        }

        .bitrateTable th {
          padding: 16px 18px;
          text-align: left;
          color: var(--text-muted);
          background: var(--soft-bg);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        .bitrateTable td {
          padding: 17px 18px;
          color: var(--text-secondary);
          border-bottom: 1px solid var(--border-color);
          font-size: 0.84rem;
          line-height: 1.5;
          vertical-align: top;
        }

        .bitrateTable tr:last-child td {
          border-bottom: none;
        }

        .bitrateValue {
          color: var(--text-primary);
          font-weight: 800;
          white-space: nowrap;
        }

        /* Important note */
        .importantBox {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-top: 20px;
          padding: 19px 20px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          border-radius: 16px;
        }

        .importantMark {
          width: 34px;
          height: 34px;
          min-width: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: var(--accent-color);
          color: var(--page-bg);
          font-size: 0.85rem;
          font-weight: 900;
        }

        .importantContent strong {
          display: block;
          margin-bottom: 4px;
          color: var(--text-primary);
          font-size: 0.88rem;
          font-weight: 800;
        }

        .importantContent p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.82rem;
          line-height: 1.55;
        }

        /* Limits */
        .limitsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .limitCard {
          padding: 19px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 16px;
          box-shadow: var(--shadow-sm);
        }

        .limitLabel {
          margin: 0 0 8px;
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 700;
          line-height: 1.45;
        }

        .limitValue {
          margin: 0;
          color: var(--text-primary);
          font-size: 0.9rem;
          font-weight: 800;
          line-height: 1.45;
        }

        /* Bottom CTA */
        .formatsBottom {
          margin-top: 48px;
          padding: 26px;
          text-align: center;
          background:
            linear-gradient(
              135deg,
              var(--card-bg),
              var(--accent-soft)
            );
          border: 1px solid var(--border-color);
          border-radius: 20px;
          box-shadow: var(--shadow-sm);
        }

        .formatsBottomText {
          max-width: 760px;
          margin: 0 auto 18px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.65;
        }

        .formatsFaqButton {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 0;
          border: none;
          background: transparent;
          color: var(--accent-color);
          font: inherit;
          font-weight: 800;
          cursor: pointer;
        }

        .formatsFaqButton:hover {
          text-decoration: underline;
        }

        .formatsStartButton {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 48px;
          padding: 12px 22px;
          border: none;
          border-radius: 12px;
          background: var(--accent-color);
          color: var(--page-bg);
          font-size: 0.86rem;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease;
        }

        .formatsStartButton:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        /* Tablet */
        @media (max-width: 900px) {
          .formatCards {
            grid-template-columns: repeat(2, 1fr);
          }

          .limitsGrid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .formatsPage {
            width: calc(100% - 28px);
            padding: 32px 0 55px;
          }

          .formatsTitle {
            font-size: 2rem;
            letter-spacing: -0.8px;
          }

          .formatsSubtitle {
            font-size: 0.9rem;
            margin-bottom: 32px;
          }

          .formatsSection {
            margin-top: 30px;
          }

          .formatsSectionTitle {
            font-size: 1.15rem;
          }

          .formatsSectionText {
            font-size: 0.87rem;
          }

          .formatCards {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .formatCard {
            padding: 16px;
            border-radius: 15px;
          }

          .formatIcon {
            width: 38px;
            height: 38px;
            margin-bottom: 11px;
          }

          .formatCardTitle {
            font-size: 0.84rem;
          }

          .formatCardText {
            font-size: 0.7rem;
          }

          .outputCard {
            padding: 17px;
          }

          .outputBadge {
            width: 45px;
            height: 45px;
            min-width: 45px;
          }

          .limitsGrid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .limitCard {
            padding: 15px;
          }

          .limitValue {
            font-size: 0.8rem;
          }

          .importantBox {
            padding: 16px;
          }

          .formatsBottom {
            padding: 21px 17px;
          }
        }

        /* Small phones */
        @media (max-width: 380px) {
          .formatsPage {
            width: calc(100% - 20px);
          }

          .formatsTitle {
            font-size: 1.75rem;
          }

          .formatCards {
            grid-template-columns: 1fr;
          }

          .limitsGrid {
            grid-template-columns: 1fr;
          }

          .outputCard {
            align-items: flex-start;
          }
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="formatsBreadcrumbs">
        <span
          className="formatsBreadcrumbLink"
          onClick={onBackToHome}
        >
          {t.formats.breadcrumbHome}
        </span>

        <span className="formatsBreadcrumbDivider">
          /
        </span>

        <span>
          {t.formats.breadcrumbTitle}
        </span>
      </div>

      {/* Header */}
      <h1 className="formatsTitle">
        {t.formats.title}
      </h1>

      <p className="formatsSubtitle">
        {t.formats.subtitle}
      </p>

      {/* Accepted formats */}
      <section className="formatsSection">
        <h2 className="formatsSectionTitle">
          {t.formats.acceptedTitle}
        </h2>

        <p className="formatsSectionText">
          {t.formats.acceptedText}
        </p>

        <div className="formatCards">
          <div className="formatCard">
            <div className="formatIcon">YT</div>

            <h3 className="formatCardTitle">
              {t.formats.youtubeVideo}
            </h3>

            <p className="formatCardText">
              Individual YouTube video links.
            </p>
          </div>

          <div className="formatCard">
            <div className="formatIcon">S</div>

            <h3 className="formatCardTitle">
              {t.formats.shorts}
            </h3>

            <p className="formatCardText">
              YouTube Shorts links.
            </p>
          </div>

          <div className="formatCard">
            <div className="formatIcon">▶</div>

            <h3 className="formatCardTitle">
              {t.formats.embed}
            </h3>

            <p className="formatCardText">
              Supported embedded video links.
            </p>
          </div>

          <div className="formatCard">
            <div className="formatIcon">♫</div>

            <h3 className="formatCardTitle">
              {t.formats.music}
            </h3>

            <p className="formatCardText">
              YouTube Music video links.
            </p>
          </div>
        </div>
      </section>

      {/* Output */}
      <section className="formatsSection">
        <h2 className="formatsSectionTitle">
          {t.formats.output}
        </h2>

        <div className="outputCard">
          <div className="outputBadge">
            MP3
          </div>

          <div>
            <h3 className="outputTitle">
              {t.formats.outputTitle}
            </h3>

            <p className="outputText">
              {t.formats.outputText}
            </p>
          </div>
        </div>
      </section>

      {/* Bitrates */}
      <section className="formatsSection">
        <h2 className="formatsSectionTitle">
          {t.formats.bitrateTitle}
        </h2>

        <div className="bitrateTableWrap">
          <table className="bitrateTable">
            <thead>
              <tr>
                <th>{t.formats.bitrate}</th>
                <th>{t.formats.approximateSize}</th>
                <th>{t.formats.bestFor}</th>
              </tr>
            </thead>

            <tbody>
              {bitrates.map((item) => (
                <tr key={item.rate}>
                  <td className="bitrateValue">
                    {item.rate}
                  </td>

                  <td>
                    {item.size}
                  </td>

                  <td>
                    {item.best}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="importantBox">
          <div className="importantMark">
            !
          </div>

          <div className="importantContent">
            <strong>
              {t.formats.important}
            </strong>

            <p>
              {t.formats.importantText}
            </p>
          </div>
        </div>
      </section>

      {/* Limits */}
      <section className="formatsSection">
        <h2 className="formatsSectionTitle">
          {t.formats.limitsTitle}
        </h2>

        <div className="limitsGrid">
          <div className="limitCard">
            <p className="limitLabel">
              {t.formats.maximumDuration}
            </p>

            <p className="limitValue">
              {t.formats.maximumDurationValue}
            </p>
          </div>

          <div className="limitCard">
            <p className="limitLabel">
              {t.formats.maximumOutputSize}
            </p>

            <p className="limitValue">
              {t.formats.maximumOutputSizeValue}
            </p>
          </div>

          <div className="limitCard">
            <p className="limitLabel">
              {t.formats.fairUse}
            </p>

            <p className="limitValue">
              {t.formats.fairUseValue}
            </p>
          </div>

          <div className="limitCard">
            <p className="limitLabel">
              {t.formats.downloadLifetime}
            </p>

            <p className="limitValue">
              {t.formats.downloadLifetimeValue}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom */}
      <section className="formatsBottom">
        <p className="formatsBottomText">
          {t.formats.bottomBeforeFaq}{" "}
          <button
            type="button"
            className="formatsFaqButton"
            onClick={onGoToFaq}
          >
            {t.formats.faq}
          </button>{" "}
          {t.formats.bottomMiddle}
        </p>

        <button
          type="button"
          className="formatsStartButton"
          onClick={onBackToHome}
        >
          {t.formats.startConverter}
        </button>
      </section>
    </main>
  );
}