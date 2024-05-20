export const gameFormToEntityAdapter = (gameData) => {
  const adaptedData = {
    ...gameData,
    genreIds: gameData.genres.map(item => item.id),
    platformIds: gameData.platforms.map(item => item.id),
    gallery: gameData.short_screenshots.map(item => item.image),
    rating: parseFloat(gameData.rating),
    metacritic: parseInt(gameData.metacritic)
  };
  delete adaptedData.short_screenshots;
  return adaptedData;
};

export const gameEntityToFormAdapter = (gameData) => {
  const adaptedData = {
    ...gameData,
    short_screenshots: gameData.gallery.map((item, i) => ({ id: i, image: item }))
  };
  delete adaptedData.gallery;
  return adaptedData;  
};