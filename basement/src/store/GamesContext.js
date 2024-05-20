import { createContext, useState } from 'react';

export const GamesContext = createContext({
  games: []
});

function GamesContextProvider({ children }) {
  const [gamesState, setGamesState] = useState({ games: [] });

  function loadGamesData(games) {
    setGamesState({ games });
  }

  function deleteGameData(id) {
    const filteredGames = gamesState.games.filter((item) => item.id !== id);
    setGamesState({ games: filteredGames })
  }

  const value = {
    ...gamesState,
    loadGamesData,
    deleteGameData
  };

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  );
}

export default GamesContextProvider;
