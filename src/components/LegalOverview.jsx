import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function LegalOverview({ onBackToHome }) {
  const { t } = useLanguage();

  return (
    <main className="legalPage">
      <style>{`
        .legalPage {
          width: min(900px, calc(100% - 48px));
          margin: 0 auto;
          padding: 52px 0 80px;
          color: var(--text-primary);
        }

        /* Breadcrumbs */
        .legalBreadcrumbs {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 28px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .legalCrumbLink {
          cursor: pointer;
          color: var(--accent-color);
          transition: opacity 0.2s ease;
        }

        .legalCrumbLink:hover {
          opacity: 0.7;
        }

        .legalCrumbDivider {
          color: var(--border-color);
        }

        .legalCrumbActive {
          color: var(--text-muted);
        }

        /* Header */
        .legalHeader {
          position: relative;
          margin-bottom: 42px;
        }

        .legalHeader::before {
          content: "";
          position: absolute;
          width: 240px;
          height: 170px;
          top: -65px;
          left: -70px;
          background: var(--accent-color);
          opacity: 0.045;
          filter: blur(75px);
          border-radius: 50%;
          pointer-events: none;
        }

        .legalMainHeading {
          position: relative;
          margin: 0 0 14px;
          color: var(--text-primary);
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -1.7px;
        }

        .legalLeadText {
          position: relative;
          max-width: 740px;
          margin: 0;
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.75;
        }

        /* Sections */
        .legalSection {
          position: relative;
          margin-top: 34px;
        }

        .legalSubHeading {
          margin: 0 0 12px;
          color: var(--text-primary);
          font-size: 1.28rem;
          font-weight: 850;
          line-height: 1.35;
          letter-spacing: -0.35px;
        }

        .legalBodyText {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.94rem;
          line-height: 1.75;
        }

        .legalBodyText strong {
          color: var(--text-primary);
          font-weight: 800;
        }

        /* Bullet List */
        .legalBullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .legalBullets li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          padding: 14px 16px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.65;
          box-shadow: var(--shadow-sm);
          transition:
            transform 0.2s ease,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .legalBullets li:hover {
          transform: translateY(-1px);
          border-color: var(--accent-color);
          box-shadow: var(--shadow-md);
        }

        .legalBullet {
          width: 7px;
          height: 7px;
          min-width: 7px;
          margin-top: 8px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 0 4px var(--accent-soft);
        }

        /* Policy Cards */
        .legalPolicies {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .legalPolicyCard {
          position: relative;
          overflow: hidden;
          padding: 18px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 15px;
          box-shadow: var(--shadow-sm);
          transition:
            transform 0.22s ease,
            border-color 0.22s ease,
            box-shadow 0.22s ease;
        }

        .legalPolicyCard::after {
          content: "";
          position: absolute;
          width: 110px;
          height: 110px;
          right: -60px;
          top: -65px;
          border-radius: 50%;
          background: var(--accent-color);
          opacity: 0;
          filter: blur(35px);
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .legalPolicyCard:hover {
          transform: translateY(-2px);
          border-color: var(--accent-color);
          box-shadow: var(--shadow-md);
        }

        .legalPolicyCard:hover::after {
          opacity: 0.08;
        }

        .legalPolicyTitle {
          position: relative;
          z-index: 1;
          display: block;
          margin-bottom: 6px;
          color: var(--text-primary);
          font-size: 0.92rem;
          font-weight: 800;
        }

        .legalPolicyText {
          position: relative;
          z-index: 1;
          margin: 0;
          color: var(--text-muted);
          font-size: 0.83rem;
          line-height: 1.6;
        }

        /* Closing */
        .legalClosing {
          margin-top: 30px;
          padding: 18px 20px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          border-radius: 15px;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.7;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .legalPage {
            width: calc(100% - 32px);
            padding: 40px 0 60px;
          }

          .legalMainHeading {
            font-size: 2.4rem;
            letter-spacing: -1.2px;
          }

          .legalLeadText {
            font-size: 0.95rem;
          }

          .legalSubHeading {
            font-size: 1.18rem;
          }

          .legalPolicies {
            grid-template-columns: 1fr;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .legalPage {
            width: calc(100% - 24px);
            padding: 30px 0 48px;
          }

          .legalBreadcrumbs {
            margin-bottom: 22px;
            font-size: 0.78rem;
          }

          .legalMainHeading {
            font-size: 2rem;
            line-height: 1.1;
            letter-spacing: -0.9px;
          }

          .legalLeadText {
            font-size: 0.88rem;
            line-height: 1.65;
          }

          .legalHeader {
            margin-bottom: 32px;
          }

          .legalSection {
            margin-top: 28px;
          }

          .legalSubHeading {
            font-size: 1.08rem;
            line-height: 1.35;
          }

          .legalBodyText {
            font-size: 0.86rem;
            line-height: 1.7;
          }

          .legalBullets {
            gap: 9px;
          }

          .legalBullets li {
            padding: 13px 14px;
            gap: 10px;
            border-radius: 13px;
            font-size: 0.84rem;
            line-height: 1.6;
          }

          .legalBullet {
            width: 6px;
            height: 6px;
            min-width: 6px;
            margin-top: 7px;
          }

          .legalPolicies {
            gap: 9px;
          }

          .legalPolicyCard {
            padding: 16px;
            border-radius: 13px;
          }

          .legalPolicyTitle {
            font-size: 0.87rem;
          }

          .legalPolicyText {
            font-size: 0.8rem;
          }

          .legalClosing {
            margin-top: 26px;
            padding: 16px;
            border-radius: 13px;
            font-size: 0.83rem;
          }
        }

        /* Very Small Phones */
        @media (max-width: 360px) {
          .legalPage {
            width: calc(100% - 20px);
            padding-top: 24px;
          }

          .legalMainHeading {
            font-size: 1.75rem;
          }

          .legalPolicyCard {
            padding: 14px;
          }
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="legalBreadcrumbs">
        <span
          className="legalCrumbLink"
          onClick={onBackToHome}
        >
          {t.legal.breadcrumbHome}
        </span>

        <span className="legalCrumbDivider">
          /
        </span>

        <span className="legalCrumbActive">
          {t.legal.breadcrumbTitle}
        </span>
      </div>

      {/* Header */}
      <div className="legalHeader">
        <h1 className="legalMainHeading">
          {t.legal.title}
        </h1>

        <p className="legalLeadText">
          {t.legal.subtitle}
        </p>
      </div>

      {/* Designed For */}
      <section className="legalSection">
        <h2 className="legalSubHeading">
          {t.legal.designedHeading}
        </h2>

        <p className="legalBodyText">
          <strong>ClearAudio</strong>{" "}
          {t.legal.designedText}
        </p>
      </section>

      {/* Will Not */}
      <section className="legalSection">
        <h2 className="legalSubHeading">
          {t.legal.willNotHeading}
        </h2>

        <ul className="legalBullets">
          {t.legal.willNotBullets.map(
            (item, index) => (
              <li key={index}>
                <span className="legalBullet"></span>

                <span>{item}</span>
              </li>
            )
          )}
        </ul>
      </section>

      {/* Responsibility */}
      <section className="legalSection">
        <h2 className="legalSubHeading">
          {t.legal.responsibilityHeading}
        </h2>

        <p className="legalBodyText">
          {t.legal.responsibilityText}
        </p>
      </section>

      {/* Policies */}
      <section className="legalSection">
        <h2 className="legalSubHeading">
          {t.legal.policiesHeading}
        </h2>

        <ul className="legalPolicies">
          <li className="legalPolicyCard">
            <strong className="legalPolicyTitle">
              {t.legal.policies.terms.title}
            </strong>

            <p className="legalPolicyText">
              {t.legal.policies.terms.text}
            </p>
          </li>

          <li className="legalPolicyCard">
            <strong className="legalPolicyTitle">
              {t.legal.policies.privacy.title}
            </strong>

            <p className="legalPolicyText">
              {t.legal.policies.privacy.text}
            </p>
          </li>

          <li className="legalPolicyCard">
            <strong className="legalPolicyTitle">
              {t.legal.policies.acceptableUse.title}
            </strong>

            <p className="legalPolicyText">
              {t.legal.policies.acceptableUse.text}
            </p>
          </li>

          <li className="legalPolicyCard">
            <strong className="legalPolicyTitle">
              {t.legal.policies.copyright.title}
            </strong>

            <p className="legalPolicyText">
              {t.legal.policies.copyright.text}
            </p>
          </li>
        </ul>
      </section>

      {/* Closing */}
      <p className="legalClosing">
        {t.legal.closing}
      </p>
    </main>
  );
}