import React, { useState } from 'react';
import { Volume2, ChevronLeft, ChevronRight, Home, Settings, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Generic Flashcard System Component
 * Supports multiple categories: animals, waterfalls, reservoirs, etc.
 */
const FlashcardSystem = ({
  categoryData,
  categoryName,
  categoryIcon,
  backgroundGradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  onHomeClick,
  onSettingsClick,
  onCreateNew
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const { t } = useTranslation();

  const currentItem = categoryData[currentIndex];

  const speak = (text, lang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      if (lang === 'tamil') {
        utterance.lang = 'ta-IN';
      } else if (lang === 'sinhala') {
        utterance.lang = 'si-LK';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.rate = 0.8;
      utterance.pitch = 1.2;

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentIndex < categoryData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowInfo(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowInfo(false);
    }
  };

  if (!currentItem) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center" style={{
        background: backgroundGradient
      }}>
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-4">No flashcards available</h2>
          <p className="mb-4">Create your first flashcard to get started!</p>
          {onCreateNew && (
            <button
              onClick={onCreateNew}
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:bg-purple-100 transition-all transform hover:scale-105"
            >
              <Plus className="inline mr-2" size={20} />
              Create First Flashcard
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4" style={{
      background: backgroundGradient
    }}>
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onHomeClick}
            className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
          >
            <Home size={24} />
          </button>
          <div className="text-center">
            <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">
              {categoryIcon} {categoryName}
            </h1>
                        <p className="text-white/90 text-lg">
              {t('flashcards.subtitle', { category: categoryName.toLowerCase() }) || `Learn about ${categoryName.toLowerCase()} | அறிந்து கொள்ளுங்கள் | ඉගෙන ගන්න`}
            </p>
          </div>
          <div className="flex gap-2">
            {onCreateNew && (
              <button
                onClick={onCreateNew}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
              >
                <Plus size={24} />
              </button>
            )}
            {onSettingsClick && (
              <button
                onClick={onSettingsClick}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all transform hover:scale-110"
              >
                <Settings size={24} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto">
        <div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer transform transition-all hover:scale-105"
          onClick={() => setShowInfo(!showInfo)}
        >
          {/* Item Display */}
          <div
            className="p-12 flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${currentItem.color}dd 0%, ${currentItem.color} 100%)`,
              minHeight: '300px'
            }}
          >
            <div className="text-center">
              <div className="text-9xl mb-4 animate-bounce">
                {currentItem.emoji}
              </div>
              {currentItem.scientificName && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block">
                  <p className="text-gray-600 text-sm font-medium mb-1">{t('flashcards.scientificName') || 'Scientific Name'}</p>
                  <p className="text-gray-800 font-semibold">{currentItem.scientificName}</p>
                </div>
              )}
              {currentItem.family && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block mt-2">
                  <p className="text-gray-600 text-sm font-medium mb-1">{t('flashcards.family') || 'Family'}</p>
                  <p className="text-gray-800 font-semibold">{currentItem.family}</p>
                </div>
              )}
            </div>
          </div>

          {/* Language Names */}
          <div className="bg-white p-8">
            {/* English */}
            <div className="mb-6 bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-semibold mb-1">ENGLISH</p>
                  <p className="text-3xl font-bold text-gray-800">{currentItem.english}</p>
                  {currentItem.englishDescription && (
                    <p className="text-gray-600 text-sm mt-2">{currentItem.englishDescription}</p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentItem.english, 'english');
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full transition-all transform hover:scale-110 active:scale-95"
                >
                  <Volume2 size={28} />
                </button>
              </div>
            </div>

            {/* Sinhala */}
            <div className="mb-6 bg-green-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-semibold mb-1">සිංහල (SINHALA)</p>
                  <p className="text-3xl font-bold text-gray-800">{currentItem.sinhala}</p>
                  {currentItem.sinhalaDescription && (
                    <p className="text-gray-600 text-sm mt-2">{currentItem.sinhalaDescription}</p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentItem.sinhala, 'sinhala');
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full transition-all transform hover:scale-110 active:scale-95"
                >
                  <Volume2 size={28} />
                </button>
              </div>
            </div>

            {/* Tamil */}
            <div className="bg-orange-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm font-semibold mb-1">தமிழ் (TAMIL)</p>
                  <p className="text-3xl font-bold text-gray-800">{currentItem.tamil}</p>
                  {currentItem.tamilDescription && (
                    <p className="text-gray-600 text-sm mt-2">{currentItem.tamilDescription}</p>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(currentItem.tamil, 'tamil');
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full transition-all transform hover:scale-110 active:scale-95"
                >
                  <Volume2 size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-4 rounded-full transition-all ${
              currentIndex === 0
                ? 'bg-white/30 text-white/50 cursor-not-allowed'
                : 'bg-white text-purple-600 hover:bg-purple-100 transform hover:scale-110'
            }`}
          >
            <ChevronLeft size={32} />
          </button>

          <div className="text-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 inline-block">
              <p className="text-2xl font-bold text-purple-600">
                {currentIndex + 1} / {categoryData.length}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === categoryData.length - 1}
            className={`p-4 rounded-full transition-all ${
              currentIndex === categoryData.length - 1
                ? 'bg-white/30 text-white/50 cursor-not-allowed'
                : 'bg-white text-purple-600 hover:bg-purple-100 transform hover:scale-110'
            }`}
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-white/90 text-lg">
            🔊 {t('flashcards.instructions.speak') || 'Click the speaker icons to hear pronunciation!'}
          </p>
          <p className="text-white/80 text-sm mt-2">
            ← {t('flashcards.instructions.navigate') || 'Use arrows to navigate'} | {t('flashcards.instructions.click') || 'Click card for info'} →
          </p>
        </div>
      </div>
    </div>
  );
};

export default FlashcardSystem;