import { createContext, useState } from 'react';

export const LayoutContext = createContext({
  genres: [],
  genresMap: new Map(),
  platforms: [],
  platformsMap: new Map()
});

function LayoutContextProvider({ children }) {
  const [layoutState, setLayoutState] = useState({ genres: [], genresMap: new Map(), platforms: [], platformsMap: new Map() });

  function loadLayoutData({ genres, platforms }) {
    const genresMap = genres.reduce((acc,curr) => {
      acc.set(curr.value, curr);
      return acc; 
    }, new Map());

    const platformsMap = platforms.reduce((acc,curr) => {
      acc.set(curr.value, curr);
      return acc; 
  }, new Map());
    setLayoutState(() => ({ genres, genresMap, platforms, platformsMap }));
  }

  const value = {
    ...layoutState,
    loadLayoutData
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export default LayoutContextProvider;
