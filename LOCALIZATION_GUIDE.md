# Localization Workflow

This project now ships with a refined i18n baseline that covers the shared navigation shell and toast messaging. Follow these steps to keep new work tri-lingual.

1. **Add keys once.** Extend `src/config/i18n.js` (or the future locale modules) with matching keys under `en`, `si`, and `ta`. Keep keys grouped by feature (`nav`, `common`, `layout`, `messages`, etc.).
2. **Reference keys in components.** Import `useTranslation` and call `t('namespace.key')` instead of hard-coded strings. Favour descriptive keys such as `home.hero.title` rather than embedding long sentences in components.
3. **Structure lists in config.** For repeatable UI (navigation items, tab labels, cards), declare metadata arrays (similar to `BASE_MENU_ITEMS`) and map over them, so each label requires only a single translation entry.
4. **Handle fallbacks explicitly.** If content comes from Firestore/remote APIs, store localized fields (e.g. `{ en: '', si: '', ta: '' }`) and render with `item[field][i18n.language] || item[field].en`.
5. **Test all languages quickly.** Use the header language menu to flip through the three locales and confirm layout constraints, button widths, and toast messages still read correctly.

> Tip: after updating translations, run `npm run build` (once dependencies are installed) to spot missing keys or syntax errors during compilation.
