import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function HowItWorks({ onBackToHome }) {
  const { t } = useLanguage();

  const steps = [
    {
      number: "01",
      title: t.howItWorks.step1Title,
      text: t.howItWorks.step1Text,
    },
    {
      number: "02",
      title: t.howItWorks.step2Title,
      text: t.howItWorks.step2Text,
    },
    {
      number: "03",
      title: t.howItWorks.step3Title,
      text: t.howItWorks.step3Text,
    },
    {
      number: "04",
      title: t.howItWorks.step4Title,
      text: t.howItWorks.step4Text,
    },
    {
      number: "05",
      title: t.howItWorks.step5Title,
      text: t.howItWorks.step5Text,
    },
  ];

  const errors = [
    {
      title: t.howItWorks.error1Title,
      text: t.howItWorks.error1Text,
    },
    {
      title: t.howItWorks.error2Title,
      text: t.howItWorks.error2Text,
    },
    {
      title: t.howItWorks.error3Title,
      text: t.howItWorks.error3Text,
    },
  ];

  return (
    <main className="howItWorksPage">
      <style>{`
        .howItWorksPage {
          width: min(1050px, calc(100% - 48px));
          margin: 0 auto;
          padding: 54px 0 90px;
          color: var(--text-primary);
          position: relative;
        }

        .howItWorksPage::before {
          content: "";
          position: absolute;
          top: 20px;
          right: -160px;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 0, 65, 0.09) 0%,
            rgba(255, 0, 65, 0.035) 38%,
            transparent 72%
          );
          pointer-events: none;
          z-index: -1;
        }

        .howItWorksPage::after {
          content: "";
          position: absolute;
          top: 520px;
          left: -220px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 0, 65, 0.055) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: -1;
        }

        /* Breadcrumb */

        .howBreadcrumbs {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 30px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .howCrumbLink {
          cursor: pointer;
          color: var(--accent-color);
          font-weight: 750;
          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .howCrumbLink:hover {
          opacity: 0.75;
        }

        .howCrumbDivider {
          color: var(--border-color);
        }

        .howCrumbActive {
          color: var(--text-muted);
        }

        /* Header */

        .howPageHeader {
          max-width: 820px;
          margin-bottom: 42px;
        }

        .howEyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 8px 13px;
          border: 1px solid rgba(255, 0, 65, 0.22);
          border-radius: 999px;
          background: rgba(255, 0, 65, 0.06);
          color: var(--accent-color);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.7px;
          text-transform: uppercase;
        }

        .howEyebrowDot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent-color);
          box-shadow: 0 0 12px rgba(255, 0, 65, 0.45);
        }

        .howMainHeading {
          margin: 0 0 17px;
          max-width: 850px;
          color: var(--text-primary);
          font-size: clamp(2.35rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.02;
          letter-spacing: -2px;
        }

        .howLeadText {
          max-width: 760px;
          margin: 0;
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.75;
        }

        /* Before start */

        .howBeforeStart {
          position: relative;
          margin-bottom: 42px;
          padding: 25px 28px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          background:
            linear-gradient(
              135deg,
              rgba(255, 0, 65, 0.055),
              transparent 55%
            ),
            var(--card-bg);
          box-shadow: var(--shadow-sm);
        }

        .howBeforeStart::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent-color);
          box-shadow: 0 0 18px rgba(255, 0, 65, 0.35);
        }

        .howSubHeading {
          margin: 0 0 10px;
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 800;
          line-height: 1.35;
          letter-spacing: -0.3px;
        }

        .howBodyText {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.75;
        }

        /* Steps */

        .howSectionHeader {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 17px;
        }

        .howSectionLine {
          width: 34px;
          height: 3px;
          border-radius: 10px;
          background: var(--accent-color);
          box-shadow: 0 0 12px rgba(255, 0, 65, 0.25);
        }

        .howSectionTitle {
          margin: 0;
          color: var(--text-primary);
          font-size: 1.25rem;
          font-weight: 800;
        }

        .howStepsWrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .howStepBlock {
          position: relative;
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 16px;
          min-height: 150px;
          padding: 22px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 18px;
          background: var(--card-bg);
          box-shadow: var(--shadow-sm);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background-color 0.25s ease;
        }

        .howStepBlock:nth-child(5) {
          grid-column: 1 / -1;
        }

        .howStepBlock::after {
          content: "";
          position: absolute;
          right: -70px;
          bottom: -90px;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 0, 65, 0.07),
            transparent 70%
          );
          pointer-events: none;
        }

        .howStepBlock:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 0, 65, 0.28);
          box-shadow:
            var(--shadow-md),
            0 0 30px rgba(255, 0, 65, 0.045);
        }

        .howStepNumber {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(255, 0, 65, 0.22);
          border-radius: 13px;
          background:
            linear-gradient(
              145deg,
              rgba(255, 0, 65, 0.15),
              rgba(255, 0, 65, 0.04)
            );
          color: var(--accent-color);
          font-size: 0.72rem;
          font-weight: 900;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.04),
            0 8px 20px rgba(255, 0, 65, 0.06);
        }

        .howStepContent {
          position: relative;
          z-index: 1;
        }

        .howStepTitle {
          margin: 1px 0 8px;
          color: var(--text-primary);
          font-size: 1rem;
          font-weight: 800;
          line-height: 1.4;
        }

        .howStepBlock .howBodyText {
          font-size: 0.88rem;
        }

        /* Errors */

        .howErrorSection {
          margin-top: 52px;
        }

        .howErrorHeading {
          margin: 0 0 16px;
          color: var(--text-primary);
          font-size: 1.35rem;
          font-weight: 850;
          line-height: 1.3;
        }

        .howErrorList {
          display: grid;
          grid-template-columns: 1fr;
          gap: 11px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .howErrorList li {
          position: relative;
          padding: 17px 20px 17px 23px;
          overflow: hidden;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          background: var(--card-bg);
          color: var(--text-secondary);
          font-size: 0.88rem;
          line-height: 1.65;
          transition:
            border-color 0.2s ease,
            transform 0.2s ease;
        }

        .howErrorList li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: #ef4444;
          opacity: 0.8;
        }

        .howErrorList li:hover {
          transform: translateX(3px);
          border-color: rgba(239, 68, 68, 0.25);
        }

        .howErrorList strong {
          color: var(--text-primary);
          font-weight: 800;
        }

        /* Final */

        .howFinalText {
          margin: 30px 0 0;
          padding: 18px 20px;
          border: 1px solid var(--border-color);
          border-radius: 15px;
          background: var(--soft-bg);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 600;
          line-height: 1.7;
        }

        /* Tablet */

        @media (max-width: 800px) {
          .howItWorksPage {
            width: calc(100% - 36px);
            padding: 42px 0 70px;
          }

          .howMainHeading {
            font-size: clamp(2.2rem, 7vw, 3.2rem);
            letter-spacing: -1.5px;
          }

          .howStepsWrapper {
            grid-template-columns: 1fr;
          }

          .howStepBlock:nth-child(5) {
            grid-column: auto;
          }
        }

        /* Mobile */

        @media (max-width: 520px) {
          .howItWorksPage {
            width: calc(100% - 24px);
            padding: 28px 0 52px;
          }

          .howItWorksPage::before {
            right: -190px;
            width: 320px;
            height: 320px;
          }

          .howItWorksPage::after {
            left: -190px;
            width: 300px;
            height: 300px;
          }

          .howBreadcrumbs {
            margin-bottom: 24px;
            font-size: 0.76rem;
          }

          .howPageHeader {
            margin-bottom: 30px;
          }

          .howEyebrow {
            margin-bottom: 13px;
            padding: 7px 11px;
            font-size: 0.64rem;
          }

          .howMainHeading {
            margin-bottom: 14px;
            font-size: 2.15rem;
            line-height: 1.04;
            letter-spacing: -1.1px;
          }

          .howLeadText {
            font-size: 0.88rem;
            line-height: 1.7;
          }

          .howBeforeStart {
            margin-bottom: 34px;
            padding: 19px 18px 19px 20px;
            border-radius: 16px;
          }

          .howSubHeading {
            font-size: 1.02rem;
          }

          .howBodyText {
            font-size: 0.84rem;
            line-height: 1.7;
          }

          .howSectionHeader {
            margin-bottom: 13px;
          }

          .howSectionTitle {
            font-size: 1.08rem;
          }

          .howStepsWrapper {
            gap: 10px;
          }

          .howStepBlock {
            grid-template-columns: 40px 1fr;
            gap: 12px;
            min-height: auto;
            padding: 16px;
            border-radius: 15px;
          }

          .howStepNumber {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            font-size: 0.64rem;
          }

          .howStepTitle {
            margin-top: 0;
            margin-bottom: 6px;
            font-size: 0.9rem;
          }

          .howStepBlock .howBodyText {
            font-size: 0.81rem;
          }

          .howErrorSection {
            margin-top: 38px;
          }

          .howErrorHeading {
            margin-bottom: 13px;
            font-size: 1.08rem;
          }

          .howErrorList {
            gap: 9px;
          }

          .howErrorList li {
            padding: 14px 15px 14px 18px;
            font-size: 0.81rem;
            line-height: 1.6;
            border-radius: 13px;
          }

          .howFinalText {
            margin-top: 22px;
            padding: 15px 16px;
            font-size: 0.81rem;
            line-height: 1.6;
            border-radius: 13px;
          }
        }

        /* Very small phones */

        @media (max-width: 360px) {
          .howItWorksPage {
            width: calc(100% - 18px);
            padding-top: 24px;
          }

          .howMainHeading {
            font-size: 1.85rem;
          }

          .howStepBlock {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .howStepNumber {
            width: 34px;
            height: 34px;
          }
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="howBreadcrumbs">
        <span
          className="howCrumbLink"
          onClick={onBackToHome}
        >
          {t.howItWorks.breadcrumbHome}
        </span>

        <span className="howCrumbDivider">/</span>

        <span className="howCrumbActive">
          {t.howItWorks.breadcrumbTitle}
        </span>
      </div>

      {/* Header */}
      <div className="howPageHeader">
        <div className="howEyebrow">
          <span className="howEyebrowDot" />
          ClearAudio Guide
        </div>

        <h1 className="howMainHeading">
          {t.howItWorks.title}
        </h1>

        <p className="howLeadText">
          {t.howItWorks.subtitle}
        </p>
      </div>

      {/* Before Start */}
      <section className="howBeforeStart">
        <h2 className="howSubHeading">
          {t.howItWorks.beforeStartTitle}
        </h2>

        <p className="howBodyText">
          {t.howItWorks.beforeStartText}
        </p>
      </section>

      {/* Steps */}
      <section>
        <div className="howSectionHeader">
          <span className="howSectionLine" />

          <h2 className="howSectionTitle">
            {t.howItWorks.breadcrumbTitle}
          </h2>
        </div>

        <div className="howStepsWrapper">
          {steps.map((step) => (
            <article
              className="howStepBlock"
              key={step.number}
            >
              <span className="howStepNumber">
                {step.number}
              </span>

              <div className="howStepContent">
                <h3 className="howStepTitle">
                  {step.title}
                </h3>

                <p className="howBodyText">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Errors */}
      <section className="howErrorSection">
        <h2 className="howErrorHeading">
          {t.howItWorks.errorTitle}
        </h2>

        <ul className="howErrorList">
          {errors.map((error, index) => (
            <li key={index}>
              <strong>{error.title}</strong>{" "}
              {error.text}
            </li>
          ))}
        </ul>
      </section>

      {/* Final */}
      <p className="howFinalText">
        {t.howItWorks.finalText}
      </p>
    </main>
  );
}