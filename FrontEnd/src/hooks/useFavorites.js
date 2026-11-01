import { useCallback, useEffect, useState } from 'react';

const KEY = 'aplimess:favorites';

const read = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
};

// Favourites are stored per-browser and kept in sync across tabs/components.
export default function useFavorites() {
  const [favorites, setFavorites] = useState(read);

  useEffect(() => {
    const sync = () => setFavorites(read());
    window.addEventListener('storage', sync);
    window.addEventListener('favorites-changed', sync);
    return () => {
      window.removeEventListener('storage', sync);
      window.removeEventListener('favorites-changed', sync);
    };
  }, []);

  const toggle = useCallback((id) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
    setFavorites(next);
    window.dispatchEvent(new Event('favorites-changed'));
  }, []);

  return { favorites, isFavorite: (id) => favorites.includes(id), toggle };
}
