const FAVORITES_KEY = 'nara_favorite_schools';

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const isFavorite = (schoolId) => {
  return getFavorites().includes(schoolId);
};

export const addFavorite = (schoolId) => {
  try {
    const favorites = getFavorites();
    if (!favorites.includes(schoolId)) {
      favorites.push(schoolId);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
};

export const removeFavorite = (schoolId) => {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(id => id !== schoolId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return false;
  }
};

export const toggleFavorite = (schoolId) => {
  if (isFavorite(schoolId)) {
    removeFavorite(schoolId);
    return false;
  } else {
    addFavorite(schoolId);
    return true;
  }
};

export const getFavoriteCount = () => {
  return getFavorites().length;
};

export const clearAllFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
}