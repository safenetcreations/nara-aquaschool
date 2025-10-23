# NARA AquaSchool - Complete Trilingual Implementation Guide

## ✅ Current Status

### Completed Components
1. **i18n Configuration** - `/src/config/i18n.js`
   - English, Sinhala, Tamil translations configured
   - Language switching enabled
   - Default to English on first load

2. **Navigation & Layout** - `/src/components/Layout/Layout.jsx`
   - Language selector button in navbar
   - Dropdown menu with all three languages
   - Persistent language selection

3. **Pages with Full Translation Support**
   - Home (`/src/pages/Home/Home.jsx`)
   - Dashboard (`/src/pages/Dashboard/Dashboard.jsx`)
   - Settings (`/src/pages/Settings/Settings.jsx`)
   - Leaderboard (`/src/pages/Leaderboard/Leaderboard.jsx`)
   - Marine Life (`/src/pages/MarineLife/MarineLife.jsx`) - ✅ Just updated

## 📋 Step-by-Step Implementation for Remaining Pages

### Pattern 1: Add Translation Keys to i18n.js

For each new section, add keys to ALL THREE language sections:

```javascript
// English (en)
freshwater: {
  title: 'Freshwater Frontiers',
  subtitle: "Explore Sri Lanka's rivers, lakes, and wetlands"
},

// Sinhala (si)
freshwater: {
  title: 'මිරිදිය ඉදිරි පෙරමුණු',
  subtitle: 'ශ්‍රී ලංකාවේ ගංගා, වැව් සහ තෙත් භූමි ගවේෂණය කරන්න'
},

// Tamil (ta)
freshwater: {
  title: 'நன்னீர் எல்லைகள்',
  subtitle: 'இலங்கையின் ஆறுகள், ஏரிகள் மற்றும் சதுப்புநிலங்களை ஆராயுங்கள்'
}
```

### Pattern 2: Update Component to Use Translations

```javascript
// 1. Import useTranslation
import { useTranslation } from 'react-i18next';

// 2. Initialize in component
const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      {/* 3. Replace hardcoded text */}
      <h1>{t('freshwater.title')}</h1>
      <p>{t('freshwater.subtitle')}</p>
    </div>
  );
};
```

## 🎯 Priority Pages to Translate

### High Priority (User-Facing)
1. ✅ Marine Life - COMPLETED
2. ⏳ Freshwater Frontiers (`/src/pages/FreshwaterFrontiers/FreshwaterFrontiers.jsx`)
3. ⏳ Virtual Dive (`/src/pages/VirtualDive/VirtualDive.jsx`)
4. ⏳ Games Hub (`/src/pages/Games/GamesHub.jsx`)
5. ⏳ Quiz Center (`/src/pages/Quiz/QuizCenter.jsx`)
6. ⏳ Citizen Science (`/src/pages/CitizenScience/CitizenScience.jsx`)
7. ⏳ Live Ocean Data (`/src/pages/LiveOceanData/LiveOceanData.jsx`)
8. ⏳ Underwater Cams (`/src/pages/UnderwaterCams/UnderwaterCams.jsx`)

### Medium Priority
- Auth pages (Login, Register, etc.)
- Field Visits
- Challenges
- Student Profile
- Resources

### Lower Priority
- Admin pages
- Teacher portal
- Analytics

## 📝 Translation Keys Structure

### Current i18n.js Structure

```
resources
├── en (English)
│   └── translation
│       ├── nav (Navigation)
│       ├── common (Common UI elements)
│       ├── languages (Language names)
│       ├── layout
│       ├── auth
│       ├── dashboard
│       ├── marine
│       ├── freshwater (NEW - Partially added)
│       ├── virtualDive (NEW - Partially added)
│       ├── games
│       ├── citizen
│       ├── home
│       ├── settings
│       ├── leaderboard
│       └── messages (success/error)
│
├── si (Sinhala - සිංහල)
│   └── translation (Same structure as en)
│
└── ta (Tamil - தமிழ்)
    └── translation (Same structure as en)
```

## 🔧 Quick Commands

### Test Language Switching
1. Run app: `npm start`
2. Open browser: `http://localhost:3000`
3. Click language button in navbar (shows "EN", "සිං", or "த")
4. Select different language
5. Verify all visible text changes

### Clear Language Cache (if needed)
```javascript
// In browser console:
localStorage.clear();
location.reload();
```

## 📍 Finding Hardcoded Text

Use these grep commands to find untranslated text:

```bash
# Find hardcoded titles
grep -r "title.*:" src/pages --include="*.jsx" | grep -v "t("

# Find Typography components with hardcoded text  
grep -r "<Typography" src/pages --include="*.jsx" -A1 | grep -v "t("

# Find Button labels
grep -r "<Button" src/pages --include="*.jsx" -A1 | grep -v "t("
```

## 🌍 Translation Resources

### For Sinhala Translations
- Use Unicode Sinhala characters
- Ensure proper vowel marks and consonants
- Test rendering in browser

### For Tamil Translations
- Use Unicode Tamil characters  
- Verify diacritical marks display correctly
- Check with native speaker if possible

## ✨ Best Practices

1. **Consistent Key Naming**
   - Use dot notation: `section.subsection.key`
   - Be descriptive: `home.hero.title` not `h.h.t`
   - Group related keys together

2. **Reuse Common Translations**
   - Use `common.*` for buttons, labels
   - Use `nav.*` for navigation items
   - Use `messages.*` for notifications

3. **Handle Dynamic Content**
   ```javascript
   // For variables
   t('dashboard.welcome.title', { name: userName })
   
   // For plurals (if needed)
   t('dashboard.stats.pointsChip', { points: 100 })
   ```

4. **Test All Languages**
   - Switch to each language
   - Check text doesn't overflow
   - Verify right-to-left languages work (if applicable)
   - Test on mobile and desktop

## 🐛 Common Issues & Solutions

### Issue: Language doesn't change
**Solution**: Check that `supportedLngs` in i18n.js includes all languages

### Issue: Shows translation key instead of text
**Solution**: Key is missing in i18n.js - add it to all three language sections

### Issue: Language resets on refresh
**Solution**: Check localStorage is persisting - may be browser privacy settings

### Issue: Some text translates, some doesn't
**Solution**: Components missing `useTranslation` hook or not using `t()` function

## 📞 Next Steps

1. **Complete Freshwater & VirtualDive translations** (keys partially added)
2. **Add Sinhala & Tamil translations for new keys**
3. **Update component files to use t() function**
4. **Test thoroughly with all three languages**
5. **Repeat for remaining priority pages**

## 🎓 Example: Complete Page Translation

See `/src/pages/Home/Home.jsx` for a complete example of a fully translated page.

Key points:
- All text uses `t()` function
- Translation keys are organized by section
- Dynamic content uses template variables
- Fallback to English if translation missing

---

**Remember**: Every piece of text visible to users must have translations in all three languages!
