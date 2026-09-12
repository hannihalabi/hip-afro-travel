"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import translations from "@/app/translations.json";
import styles from "./LanguageSwitcher.module.css";

type Language = "sv" | "en" | "de" | "fr" | "es";
type TranslatedLanguage = Exclude<Language, "sv">;
type TranslationCatalog = Record<TranslatedLanguage, Record<string, string>>;

const catalogs = translations as TranslationCatalog;

const languages: { code: Language; label: string; shortLabel: string }[] = [
  { code: "sv", label: "Svenska", shortLabel: "SV" },
  { code: "en", label: "English", shortLabel: "EN" },
  { code: "de", label: "Deutsch", shortLabel: "DE" },
  { code: "fr", label: "Français", shortLabel: "FR" },
  { code: "es", label: "Español", shortLabel: "ES" },
];

const textOriginals = new WeakMap<Text, string>();
const textLastApplied = new WeakMap<Text, string>();
const attributeOriginals = new WeakMap<Element, Map<string, string>>();
const attributeLastApplied = new WeakMap<Element, Map<string, string>>();
const translatedAttributes = ["alt", "aria-label", "placeholder", "title"];

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function isTranslatable(node: Node) {
  const parent = node instanceof Element ? node : node.parentElement;
  return Boolean(
    parent &&
      !parent.closest(
        '[data-no-translate], script, style, noscript, svg, [aria-hidden="true"]'
      )
  );
}

function translateTextNode(node: Text, language: Language) {
  if (!isTranslatable(node)) return;

  const current = normalize(node.nodeValue ?? "");
  if (!current) return;

  const lastApplied = textLastApplied.get(node);
  if (!textOriginals.has(node) || (lastApplied && current !== lastApplied)) {
    textOriginals.set(node, current);
  }

  const original = textOriginals.get(node) ?? current;
  const catalog = language === "sv" ? undefined : catalogs[language];
  const translated = language === "sv" ? original : catalog?.[original] ?? original;
  textLastApplied.set(node, translated);

  if (current !== translated) {
    const value = node.nodeValue ?? "";
    const leading = value.match(/^\s*/)?.[0] ?? "";
    const trailing = value.match(/\s*$/)?.[0] ?? "";
    node.nodeValue = `${leading}${translated}${trailing}`;
  }
}

function translateAttributes(element: Element, language: Language) {
  if (!isTranslatable(element)) return;

  const originals = attributeOriginals.get(element) ?? new Map<string, string>();
  const lastApplied = attributeLastApplied.get(element) ?? new Map<string, string>();
  const catalog = language === "sv" ? undefined : catalogs[language];

  for (const attribute of translatedAttributes) {
    const currentValue = element.getAttribute(attribute);
    if (!currentValue) continue;

    const current = normalize(currentValue);
    if (!originals.has(attribute) || (lastApplied.has(attribute) && current !== lastApplied.get(attribute))) {
      originals.set(attribute, current);
    }

    const original = originals.get(attribute) ?? current;
    const translated = language === "sv" ? original : catalog?.[original] ?? original;
    lastApplied.set(attribute, translated);
    if (current !== translated) element.setAttribute(attribute, translated);
  }

  attributeOriginals.set(element, originals);
  attributeLastApplied.set(element, lastApplied);
}

function translateSubtree(root: Node, language: Language) {
  if (root instanceof Text) {
    translateTextNode(root, language);
    return;
  }

  if (root instanceof Element) translateAttributes(root, language);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ALL, {
    acceptNode(node) {
      if (node instanceof Text) {
        return isTranslatable(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
      if (node instanceof Element) {
        return isTranslatable(node)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_SKIP;
    },
  });

  let node = walker.nextNode();
  while (node) {
    if (node instanceof Text) translateTextNode(node, language);
    if (node instanceof Element) translateAttributes(node, language);
    node = walker.nextNode();
  }
}

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>("sv");
  const pathname = usePathname();

  useEffect(() => {
    const originalTitle = document.title;
    document.documentElement.dataset.originalTitle = originalTitle;
  }, []);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("hipafro-language");
    if (languages.some(({ code }) => code === savedLanguage)) {
      const frame = window.requestAnimationFrame(() => {
        setLanguage(savedLanguage as Language);
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("hipafro-language", language);
    const originalTitle = document.documentElement.dataset.originalTitle ?? document.title;
    document.title =
      language === "sv" ? originalTitle : catalogs[language][originalTitle] ?? originalTitle;
    translateSubtree(document.body, language);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") {
          translateTextNode(mutation.target as Text, language);
        }
        for (const node of mutation.addedNodes) {
          translateSubtree(node, language);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      characterData: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [language]);

  const selected = languages.find(({ code }) => code === language) ?? languages[0];

  return (
    <details
      className={styles.switcher}
      data-home={pathname === "/" ? "true" : "false"}
      data-no-translate
    >
      <summary aria-label="Choose language">
        <span aria-hidden="true">🌐</span>
        {selected.shortLabel}
        <span className={styles.chevron} aria-hidden="true">⌄</span>
      </summary>
      <div className={styles.menu} role="menu" aria-label="Languages">
        {languages.map((item) => (
          <button
            type="button"
            role="menuitemradio"
            aria-checked={item.code === language}
            className={styles.option}
            data-selected={item.code === language ? "true" : "false"}
            key={item.code}
            onClick={(event) => {
              setLanguage(item.code);
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}
          >
            <span>{item.label}</span>
            <small>{item.shortLabel}</small>
          </button>
        ))}
      </div>
    </details>
  );
}
