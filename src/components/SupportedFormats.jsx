import React from 'react';

export default function SupportedFormats({ onBackToHome, onGoToFaq }) {
  const bitrates = [
    {
      rate: '128 kbps',
      size: '~1 MB per minute',
      best: 'Speech, podcasts, lectures, small storage',
    },
    {
      rate: '192 kbps',
      size: '~1.4 MB per minute',
      best: 'Balanced default for most music',
    },
    {
      rate: '256 kbps',
      size: '~1.9 MB per minute',
      best: 'Detailed music on good headphones',
    },
    {
      rate: '320 kbps',
      size: '~2.4 MB per minute',
      best: 'Maximum MP3 detail from a good source',
    },
  ];

  return (
    <>
      <style>{`
        /* =========================================
           SUPPORTED FORMATS PAGE
        ========================================= */

        .supported-formats-page {
          width: 100%;
          max-width: 900px;
          min-width: 0;
          margin: 0 auto;
          padding: 32px 24px 70px;
          box-sizing: border-box;

          overflow-x: hidden;
          overflow-y: visible;

          color: var(--text-primary);
        }

        .supported-formats-page *,
        .supported-formats-page *::before,
        .supported-formats-page *::after {
          box-sizing: border-box;
          min-width: 0;
        }


        /* =========================================
           BREADCRUMBS
        ========================================= */

        .supported-breadcrumbs {
          width: 100%;
          max-width: 100%;

          display: flex;
          align-items: center;
          flex-wrap: wrap;

          gap: 8px;

          margin: 0 0 28px;

          font-size: 0.85rem;
          line-height: 1.5;
          font-weight: 600;

          color: var(--text-muted);

          overflow-wrap: anywhere;
        }

        .supported-home-link {
          color: var(--accent-color);
          cursor: pointer;
          text-decoration: underline;
          flex-shrink: 0;
        }

        .supported-divider {
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .supported-current {
          color: var(--text-secondary);
          overflow-wrap: anywhere;
        }


        /* =========================================
           MAIN TITLE
        ========================================= */

        .supported-title {
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0 0 16px;

          font-size: clamp(2rem, 6vw, 3rem);
          line-height: 1.08;
          font-weight: 850;
          letter-spacing: -1.5px;

          color: var(--text-primary);

          overflow-wrap: anywhere;
          word-break: normal;
        }


        /* =========================================
           LEAD
        ========================================= */

        .supported-lead {
          width: 100%;
          max-width: 760px;
          min-width: 0;

          margin: 0 0 36px;

          font-size: clamp(0.95rem, 2vw, 1.1rem);
          line-height: 1.65;

          color: var(--text-muted);

          overflow-wrap: anywhere;
          word-break: normal;
        }


        /* =========================================
           SECTION TITLES
        ========================================= */

        .supported-section-title {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 34px 0 14px;

          font-size: clamp(1.2rem, 3vw, 1.5rem);
          line-height: 1.3;
          font-weight: 800;

          color: var(--text-primary);

          overflow-wrap: anywhere;
          word-break: normal;
        }


        /* =========================================
           BODY TEXT
        ========================================= */

        .supported-body {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 0 0 20px;

          font-size: 0.95rem;
          line-height: 1.75;

          color: var(--text-secondary);

          overflow-wrap: anywhere;
          word-break: normal;
        }


        /* =========================================
           LINK FORMAT / CODE BOX
        ========================================= */

        .supported-code {
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          padding: 16px 18px;
          margin: 0 0 18px;

          background: var(--soft-bg);
          border: 1px solid var(--border-color);
          border-radius: 14px;

          color: var(--text-primary);

          overflow-x: hidden;
          overflow-y: hidden;

          word-break: break-word;
          overflow-wrap: anywhere;

          white-space: normal;
        }

        .supported-code code {
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          font-size: 0.85rem;
          line-height: 1.9;

          color: var(--text-primary);

          white-space: normal;
          word-break: break-all;
          overflow-wrap: anywhere;
        }

        .supported-code br {
          display: block;
        }


        /* =========================================
           TABLE WRAPPER
        ========================================= */

        .supported-table-scroll {
          display: block;

          width: 100%;
          max-width: 100%;
          min-width: 0;

          overflow-x: auto;
          overflow-y: hidden;

          -webkit-overflow-scrolling: touch;

          border: 1px solid var(--border-color);
          border-radius: 14px;

          background: var(--card-bg);
        }


        /* =========================================
           TABLE
        ========================================= */

        .supported-table {
          width: 100%;
          min-width: 620px;

          border-collapse: collapse;

          text-align: left;

          font-size: 0.9rem;

          background: var(--card-bg);
        }

        .supported-table th {
          padding: 14px 16px;

          background: var(--soft-bg);

          border-bottom: 1px solid var(--border-color);

          color: var(--text-primary);

          font-weight: 800;

          white-space: nowrap;
        }

        .supported-table td {
          padding: 14px 16px;

          border-bottom: 1px solid var(--border-color);

          color: var(--text-secondary);

          line-height: 1.55;

          vertical-align: top;

          overflow-wrap: anywhere;
        }

        .supported-table tbody tr:last-child td {
          border-bottom: none;
        }

        .supported-table td:first-child {
          color: var(--text-primary);
          font-weight: 800;
          white-space: nowrap;
        }


        /* =========================================
           NOTE
        ========================================= */

        .supported-note {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 14px 0 0;

          color: var(--text-muted);

          font-size: 0.86rem;
          line-height: 1.65;

          font-style: italic;

          overflow-wrap: anywhere;
          word-break: normal;
        }

        .supported-note strong {
          color: var(--text-primary);
          font-style: normal;
        }


        /* =========================================
           PROCESSING LIMITS
        ========================================= */

        .supported-limits {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          display: flex;
          flex-direction: column;

          gap: 10px;

          margin: 0;
          padding: 0;

          list-style: none;
        }

        .supported-limit-item {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          padding: 14px 16px;

          background: var(--soft-bg);

          border: 1px solid var(--border-color);
          border-radius: 13px;

          color: var(--text-secondary);

          font-size: 0.94rem;
          line-height: 1.55;

          overflow-wrap: anywhere;
          word-break: normal;
        }

        .supported-limit-item strong {
          color: var(--text-primary);
        }


        /* =========================================
           BOTTOM TEXT
        ========================================= */

        .supported-bottom {
          width: 100%;
          max-width: 100%;
          min-width: 0;

          margin: 28px 0 0;

          color: var(--text-secondary);

          font-size: 0.94rem;
          line-height: 1.65;

          overflow-wrap: anywhere;
        }

        .supported-link {
          color: var(--accent-color);

          text-decoration: underline;

          cursor: pointer;

          font-weight: 700;
        }


        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 768px) {

          .supported-formats-page {
            width: 100%;
            max-width: 100%;
            margin: 0;

            padding: 28px 20px 55px;
          }

          .supported-title {
            font-size: clamp(2rem, 7vw, 2.5rem);
            letter-spacing: -1px;
          }

          .supported-lead {
            font-size: 0.98rem;
          }

          .supported-section-title {
            font-size: 1.3rem;
          }

          .supported-code {
            padding: 14px;
          }

          .supported-code code {
            font-size: 0.78rem;
          }

          .supported-table {
            min-width: 580px;
          }
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 600px) {

          .supported-formats-page {
            width: 100%;
            max-width: 100%;
            min-width: 0;

            margin: 0;
            padding: 22px 16px 45px;

            overflow-x: hidden;
          }


          .supported-breadcrumbs {
            width: 100%;
            margin-bottom: 22px;

            font-size: 0.78rem;

            gap: 6px;
          }


          .supported-title {
            width: 100%;
            max-width: 100%;

            font-size: 2rem;
            line-height: 1.1;

            letter-spacing: -0.8px;

            overflow-wrap: anywhere;
          }


          .supported-lead {
            width: 100%;
            max-width: 100%;

            font-size: 0.92rem;
            line-height: 1.6;

            margin-bottom: 28px;
          }


          .supported-section-title {
            width: 100%;

            margin-top: 28px;
            margin-bottom: 13px;

            font-size: 1.2rem;
            line-height: 1.3;
          }


          .supported-body {
            width: 100%;

            font-size: 0.88rem;
            line-height: 1.65;

            margin-bottom: 18px;
          }


          /* URL BOX */
          .supported-code {
            width: 100%;
            max-width: 100%;

            padding: 13px;

            border-radius: 12px;

            overflow: hidden;
          }

          .supported-code code {
            width: 100%;
            max-width: 100%;

            font-size: 0.68rem;
            line-height: 1.9;

            white-space: normal;

            word-break: break-all;
            overflow-wrap: anywhere;
          }


          /* TABLE */
          .supported-table-scroll {
            width: 100%;
            max-width: 100%;

            overflow-x: auto;

            border-radius: 12px;
          }

          .supported-table {
            min-width: 540px;

            font-size: 0.78rem;
          }

          .supported-table th,
          .supported-table td {
            padding: 11px 12px;
          }


          .supported-note {
            width: 100%;

            font-size: 0.76rem;
            line-height: 1.6;
          }


          .supported-limit-item {
            width: 100%;

            padding: 12px 13px;

            font-size: 0.82rem;
            line-height: 1.55;
          }


          .supported-bottom {
            width: 100%;

            font-size: 0.83rem;
            line-height: 1.6;
          }
        }


        /* =========================================
           SMALL PHONES
        ========================================= */

        @media (max-width: 380px) {

          .supported-formats-page {
            width: 100%;
            max-width: 100%;

            padding-left: 12px;
            padding-right: 12px;
          }


          .supported-title {
            font-size: 1.72rem;
            letter-spacing: -0.5px;
          }


          .supported-lead {
            font-size: 0.85rem;
          }


          .supported-section-title {
            font-size: 1.08rem;
          }


          .supported-body {
            font-size: 0.83rem;
          }


          .supported-code {
            padding: 11px;
          }


          .supported-code code {
            font-size: 0.62rem;
          }


          .supported-table {
            min-width: 500px;
          }


          .supported-table th,
          .supported-table td {
            padding: 10px;
          }


          .supported-limit-item {
            font-size: 0.78rem;
          }


          .supported-bottom {
            font-size: 0.78rem;
          }
        }
      `}</style>


      <main className="supported-formats-page">

        {/* Breadcrumbs */}
        <div className="supported-breadcrumbs">

          <span
            className="supported-home-link"
            onClick={onBackToHome}
          >
            Home
          </span>

          <span className="supported-divider">
            /
          </span>

          <span className="supported-current">
            Supported formats
          </span>

        </div>


        {/* Heading */}
        <h1 className="supported-title">
          Supported formats, bitrates and limits
        </h1>


        <p className="supported-lead">
          Exactly what this converter accepts and produces —
          no vague claims.
        </p>


        {/* Accepted formats */}
        <h2 className="supported-section-title">
          Accepted link formats
        </h2>


        <div className="supported-code">
          <code>
            https://www.youtube.com/watch?v=VIDEOID
            <br />
            https://youtu.be/VIDEOID
            <br />
            https://www.youtube.com/shorts/VIDEOID
            <br />
            https://www.youtube.com/embed/VIDEOID
            <br />
            https://music.youtube.com/watch?v=VIDEOID
          </code>
        </div>


        <p className="supported-body">
          Playlists, channels, search pages, private or
          unlisted-restricted content and links from other
          websites are rejected by the server before any
          processing starts.
        </p>


        {/* Output */}
        <h2 className="supported-section-title">
          Output format
        </h2>


        <p className="supported-body">
          Output is always MP3, the most widely compatible
          audio format. We do not currently offer M4A, WAV
          or FLAC, and we would rather list one format that
          always works than advertise options we do not
          support.
        </p>


        {/* Bitrate */}
        <h2 className="supported-section-title">
          Bitrate comparison
        </h2>


        <div className="supported-table-scroll">

          <table className="supported-table">

            <thead>
              <tr>
                <th>Bitrate</th>
                <th>Approximate size</th>
                <th>Best for</th>
              </tr>
            </thead>

            <tbody>

              {bitrates.map((item, index) => (
                <tr key={index}>

                  <td>
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


        <p className="supported-note">
          <strong>Important:</strong> bitrate sets a ceiling,
          not a floor. If the source audio was uploaded at a
          low quality, choosing 320 kbps produces a larger
          file that still sounds the same. Pick the smallest
          bitrate that sounds right to you.
        </p>


        {/* Processing limits */}
        <h2 className="supported-section-title">
          Processing limits
        </h2>


        <ul className="supported-limits">

          <li className="supported-limit-item">
            <strong>Maximum duration:</strong>{' '}
            90 minutes per video
          </li>

          <li className="supported-limit-item">
            <strong>Maximum output size:</strong>{' '}
            200 MB
          </li>

          <li className="supported-limit-item">
            <strong>Fair-use rate limit:</strong>{' '}
            10 conversions per hour per device
          </li>

          <li className="supported-limit-item">
            <strong>Download link and temporary file lifetime:</strong>{' '}
            60 minutes
          </li>

        </ul>


        {/* Bottom */}
        <p className="supported-bottom">

          See the{' '}

          <span
            className="supported-link"
            onClick={onGoToFaq}
          >
            FAQ
          </span>

          {' '}for what happens when a limit is reached,
          or{' '}

          <span
            className="supported-link"
            onClick={onBackToHome}
          >
            start from the converter
          </span>

          .

        </p>

      </main>
    </>
  );
}