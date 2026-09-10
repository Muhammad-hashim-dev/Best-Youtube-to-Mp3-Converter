import React, { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  Globe2,
} from "lucide-react";

import { useLanguage } from "../context/LanguageContext";

import usFlag from "../assets/flags/us.png";
import greeceFlag from "../assets/flags/greece.png";
import japanFlag from "../assets/flags/japan.png";

const languages = [
  {
    code: "en",
    flag: usFlag,
    key: "english",
  },
  {
    code: "el",
    flag: greeceFlag,
    key: "greek",
  },
  {
    code: "ja",
    flag: japanFlag,
    key: "japanese",
  },
];

export default function LanguageSwitcher({ mobile = false }) {
  const { language, setLanguage, t } = useLanguage();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const currentLanguage =
    languages.find((item) => item.code === language) ||
    languages[0];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const handleLanguageChange = (code) => {
    setLanguage(code);
    setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`languageSwitcher ${
        mobile ? "languageSwitcherMobile" : ""
      }`}
    >
      {/* MAIN LANGUAGE BUTTON */}
      <button
        type="button"
        className="languageSwitcherButton"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        title={t.language?.label || "Language"}
      >
        <Globe2
          size={16}
          strokeWidth={2}
          className="languageGlobe"
        />

        <span className="languageFlag">
          <img
            src={currentLanguage.flag}
            alt=""
          />
        </span>

        <span className="languageCurrent">
          {t.language?.[currentLanguage.key] ||
            currentLanguage.code.toUpperCase()}
        </span>

        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`languageChevron ${
            open
              ? "languageChevronOpen"
              : ""
          }`}
        />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="languageDropdown"
          role="listbox"
          aria-label={
            t.language?.label || "Language"
          }
        >
          <div className="languageDropdownHeader">
            <Globe2 size={14} />
            <span>
              {t.language?.label || "Language"}
            </span>
          </div>

          <div className="languageDropdownList">
            {languages.map((item) => {
              const isActive =
                language === item.code;

              return (
                <button
                  key={item.code}
                  type="button"
                  className={`languageOption ${
                    isActive
                      ? "languageOptionActive"
                      : ""
                  }`}
                  onClick={() =>
                    handleLanguageChange(
                      item.code
                    )
                  }
                  role="option"
                  aria-selected={isActive}
                >
                  <span className="languageOptionFlag">
                    <img
                      src={item.flag}
                      alt=""
                    />
                  </span>

                  <span className="languageOptionName">
                    {t.language?.[
                      item.key
                    ] ||
                      item.code.toUpperCase()}
                  </span>

                  {isActive && (
                    <span className="languageCheck">
                      <Check size={14} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}