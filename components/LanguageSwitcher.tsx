// components/LanguageSwitcher.tsx
"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for Next.js 14
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const router = useRouter(); // Use useRouter from next/navigation
  const currentLocale = i18n.language; // Use i18n.language instead of router.locale

  const handleToggle = () => {
    const newLocale = currentLocale === 'en' ? 'tr' : 'en';
    i18n.changeLanguage(newLocale)
      .then(() => {
        router.refresh(); // Refresh the page to apply the new language
      })
      .catch(err => {
        console.error("Error changing language:", err);
      });
  };

  return (
    <div className="flex items-center space-x-2">
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={currentLocale === 'tr'}
        onChange={handleToggle}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-primary  peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-secondary rounded-full peer-checked:bg-secondary transition-colors duration-300 ease-in-out">
        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform duration-300 ease-in-out"></span>
      </div>
    </label>
    <span className="text-lg font-medium">
      {currentLocale === 'en' ? 'English' : 'Türkçe'}
    </span>
  </div>
);
};

export default LanguageSwitcher;
