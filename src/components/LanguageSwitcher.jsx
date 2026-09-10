import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const languages = [
  {
    code: "en",
    flag: "🇺🇸",
    key: "english",
  },
  {
    code: "el",
    flag: "🇬🇷",
    key: "greek",
  },
  {
    code: "ja",
    flag: "🇯🇵",
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

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

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
      <button
        type="button"
        className="languageSwitcherButton"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="listbox"
        title={t.language?.label || "Language"}
      >
        <Globe2
          size={17}
          strokeWidth={2}
        />

        <span className="languageFlag">
          {currentLanguage.flag}
        </span>

        <span className="languageCurrent">
          {t.language?.[currentLanguage.key] ||
            currentLanguage.code.toUpperCase()}
        </span>

        <ChevronDown
          size={15}
          className={`languageChevron ${
            open ? "languageChevronOpen" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className="languageDropdown"
          role="listbox"
          aria-label={t.language?.label || "Language"}
        >
          {languages.map((item) => {
            const isActive = language === item.code;

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
                  handleLanguageChange(item.code)
                }
                role="option"
                aria-selected={isActive}
              >
                <span className="languageOptionFlag">
                  {item.flag}
                </span>

                <span className="languageOptionName">
                  {t.language?.[item.key] ||
                    item.code.toUpperCase()}
                </span>

                {isActive && (
                  <Check
                    size={16}
                    className="languageCheck"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}