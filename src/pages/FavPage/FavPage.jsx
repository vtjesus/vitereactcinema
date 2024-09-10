import React, { useState, useEffect } from "react";

function FavPage() {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    //Получить все ключи из localStorage
    const localStorageKeys = Object.keys(localStorage);

    // Отфильтровать ключи, которые соответствуют избранным фильмам».
    const favMovieKeys = localStorageKeys.filter((key) =>
      key.startsWith("favoriteMovie_")
    );

    // Получить изображения афиш избранных фильмов
    const favMovies = favMovieKeys.map((key) => localStorage.getItem(key));

    //Обновить состояние с изображениями афиш избранных фильмов
    setFavoriteMovies(favMovies);
  }, []);

  return (
    <div className="bg-black h-full w-full font-mono text-white p-10">
      <h1 className="text-3xl font-bold mb-4">Избранные фильмы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favoriteMovies.map((posterPath, index) => (
          <div key={index} className=" hover:opacity-80 transition-opacity">
            {posterPath ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${posterPath}`}
                alt={`Movie ${index}`}
                className="w-full h-auto rounded"
              />
            ) : (
              <p className="text-white">Изображение недоступно</p>
            )}
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavPage;
