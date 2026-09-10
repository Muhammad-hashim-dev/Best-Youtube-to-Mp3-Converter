import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function FAQOverview({ onBackToHome }) {
  const { t } = useLanguage();

  const faqs = [
    {
      q: t.faq.q1,
      a: t.faq.a1,
    },
    {
      q: t.faq.q2,
      a: t.faq.a2,
    },
    {
      q: t.faq.q3,
      a: t.faq.a3,
    },
    {
      q: t.faq.q4,
      a: t.faq.a4,
    },
    {
      q: t.faq.q5,
      a: t.faq.a5,
    },
    {
      q: t.faq.q6,
      a: t.faq.a6,
    },
    {
      q: t.faq.q7,
      a: t.faq.a7,
    },
    {
      q: t.faq.q8,
      a: t.faq.a8,
    },
  ];

  return (
    <main className="faqPage">
      <style>{`
        .faqPage {
          width: min(920px, calc(100% - 48px));
          margin: 0 auto;
          padding: 52px 0 80px;
          color: var(--text-primary);
        }

        /* Breadcrumbs */
        .faqBreadcrumbs {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 28px;
          font-size: 0.84rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .faqCrumbLink {
          cursor: pointer;
          color: var(--accent-color);
          transition: opacity 0.2s ease;
        }

        .faqCrumbLink:hover {
          opacity: 0.7;
        }

        .faqCrumbDivider {
          color: var(--border-color);
        }

        .faqCrumbActive {
          color: var(--text-muted);
        }

        /* Header */
        .faqHeader {
          position: relative;
          margin-bottom: 38px;
        }

        .faqHeader::before {
          content: "";
          position: absolute;
          width: 230px;
          height: 160px;
          top: -60px;
          left: -70px;
          background: var(--accent-color);
          opacity: 0.045;
          filter: blur(70px);
          border-radius: 50%;
          pointer-events: none;
        }

        .faqMainHeading {
          position: relative;
          margin: 0 0 14px;
          color: var(--text-primary);
          font-size: clamp(2.2rem, 5vw, 3.25rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -1.8px;
        }

        .faqLeadText {
          position: relative;
          max-width: 720px;
          margin: 0;
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.75;
        }

        /* FAQ List */
        .faqListWrapper {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faqCard {
          position: relative;
          overflow: hidden;
          padding: 21px 22px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 17px;
          box-shadow: var(--shadow-sm);
          transition:
            transform 0.25s ease,
            border-color 0.25s ease,
            box-shadow 0.25s ease,
            background-color 0.25s ease;
        }

        .faqCard::before {
          content: "";
          position: absolute;
          width: 130px;
          height: 130px;
          top: -80px;
          right: -55px;
          border-radius: 50%;
          background: var(--accent-color);
          opacity: 0;
          filter: blur(45px);
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .faqCard:hover {
          transform: translateY(-2px);
          border-color: var(--accent-color);
          box-shadow: var(--shadow-md);
        }

        .faqCard:hover::before {
          opacity: 0.08;
        }

        /* Question */
        .faqQuestionRow {
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .faqQuestionIcon {
          width: 32px;
          height: 32px;
          min-width: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
          border-radius: 10px;
          background: var(--accent-soft);
          border: 1px solid var(--accent-border);
          color: var(--accent-color);
          font-size: 0.92rem;
          font-weight: 900;
          transition:
            transform 0.25s ease,
            background-color 0.25s ease;
        }

        .faqCard:hover .faqQuestionIcon {
          transform: scale(1.05);
        }

        .faqQuestion {
          margin: 0;
          color: var(--text-primary);
          font-size: 1.02rem;
          font-weight: 800;
          line-height: 1.45;
        }

        /* Answer */
        .faqAnswer {
          margin: 12px 0 0 45px;
          color: var(--text-secondary);
          font-size: 0.93rem;
          line-height: 1.75;
        }

        /* Bottom Notice */
        .faqNotice {
          position: relative;
          overflow: hidden;
          margin-top: 34px;
          padding: 24px 25px;
          background:
            linear-gradient(
              135deg,
              var(--accent-soft),
              var(--card-bg)
            );
          border: 1px solid var(--accent-border);
          border-radius: 18px;
          box-shadow: var(--shadow-sm);
        }

        .faqNotice::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          right: -90px;
          top: -100px;
          border-radius: 50%;
          background: var(--accent-color);
          opacity: 0.055;
          filter: blur(45px);
          pointer-events: none;
        }

        .faqNoticeTitle {
          position: relative;
          z-index: 1;
          margin: 0 0 8px;
          color: var(--text-primary);
          font-size: 1.08rem;
          font-weight: 850;
        }

        .faqNoticeText {
          position: relative;
          z-index: 1;
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.7;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .faqPage {
            width: calc(100% - 32px);
            padding: 40px 0 60px;
          }

          .faqMainHeading {
            font-size: 2.35rem;
            letter-spacing: -1.2px;
          }

          .faqLeadText {
            font-size: 0.95rem;
          }

          .faqCard {
            padding: 19px;
          }

          .faqQuestion {
            font-size: 0.98rem;
          }

          .faqAnswer {
            margin-left: 45px;
            font-size: 0.9rem;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .faqPage {
            width: calc(100% - 24px);
            padding: 30px 0 48px;
          }

          .faqBreadcrumbs {
            margin-bottom: 22px;
            font-size: 0.78rem;
          }

          .faqMainHeading {
            font-size: 2rem;
            line-height: 1.1;
            letter-spacing: -0.9px;
          }

          .faqLeadText {
            font-size: 0.88rem;
            line-height: 1.65;
          }

          .faqHeader {
            margin-bottom: 30px;
          }

          .faqListWrapper {
            gap: 11px;
          }

          .faqCard {
            padding: 16px;
            border-radius: 14px;
          }

          .faqQuestionRow {
            gap: 10px;
          }

          .faqQuestionIcon {
            width: 29px;
            height: 29px;
            min-width: 29px;
            border-radius: 9px;
            font-size: 0.82rem;
          }

          .faqQuestion {
            font-size: 0.9rem;
            line-height: 1.45;
          }

          .faqAnswer {
            margin: 10px 0 0 39px;
            font-size: 0.84rem;
            line-height: 1.65;
          }

          .faqNotice {
            margin-top: 26px;
            padding: 19px;
            border-radius: 15px;
          }

          .faqNoticeTitle {
            font-size: 0.98rem;
          }

          .faqNoticeText {
            font-size: 0.84rem;
            line-height: 1.65;
          }
        }

        /* Very Small Phones */
        @media (max-width: 360px) {
          .faqPage {
            width: calc(100% - 20px);
            padding-top: 24px;
          }

          .faqMainHeading {
            font-size: 1.75rem;
          }

          .faqCard {
            padding: 14px;
          }

          .faqQuestionRow {
            gap: 9px;
          }

          .faqQuestionIcon {
            width: 27px;
            height: 27px;
            min-width: 27px;
          }

          .faqQuestion {
            font-size: 0.86rem;
          }

          .faqAnswer {
            margin-left: 36px;
            font-size: 0.8rem;
          }
        }
      `}</style>

      {/* Breadcrumbs */}
      <div className="faqBreadcrumbs">
        <span
          className="faqCrumbLink"
          onClick={onBackToHome}
        >
          {t.faq.breadcrumbHome}
        </span>

        <span className="faqCrumbDivider">/</span>

        <span className="faqCrumbActive">
          {t.faq.breadcrumbTitle}
        </span>
      </div>

      {/* Header */}
      <div className="faqHeader">
        <h1 className="faqMainHeading">
          {t.faq.title}
        </h1>

        <p className="faqLeadText">
          {t.faq.lead}
        </p>
      </div>

      {/* FAQ Cards */}
      <div className="faqListWrapper">
        {faqs.map((item, idx) => (
          <div className="faqCard" key={idx}>
            <div className="faqQuestionRow">
              <div className="faqQuestionIcon">
                ?
              </div>

              <h3 className="faqQuestion">
                {item.q}
              </h3>
            </div>

            <p className="faqAnswer">
              {item.a}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom Notice */}
      <div className="faqNotice">
        <h3 className="faqNoticeTitle">
          {t.faq.anythingElse}
        </h3>

        <p className="faqNoticeText">
          {t.faq.anythingElseText}
        </p>
      </div>
    </main>
  );
}