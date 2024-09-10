import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BuyTicketModal from "../../components/BuyTicketModal";
import Scripts from "../../services/Scripts";

function MovieDetails() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState(null); // Состояние для хранения данных ввода
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchMovieDetails = async () => {
   
        const data = await Scripts.fetchMovieDetails(id);
        setMovieDetails(data);

        // Проверить, помечен ли фильм как избранный
        const isFavorite = localStorage.getItem(`favoriteMovie_${id}`) !== null;
        setIsFavorited(isFavorite);

        // Найти первый трейлер на YouTube в ответе
        const youtubeTrailer = data?.videos?.results.find(
          (video) => video.site === "YouTube" && video.type === "Trailer"
        );

        //Установить ключ трейлера для отображения
        if (youtubeTrailer) {
          setTrailerKey(youtubeTrailer.key);
        }
     
  };

  useEffect(() => {
    // Загрузить детали фильма при загрузке страницы
    fetchMovieDetails();
  }, [id]);

  // Функция для обработки покупки билета
  const handleBuyTicket = (ticketInfo) => {
    // Сохранить данные билета в localStorage
    localStorage.setItem(`ticket_${id}`, JSON.stringify(ticketInfo));
    // Установить данные билета в состояние
    setTicketData(ticketInfo);
  };

  const handleToggleFavorite = () => {
    //Изменить статус избранного
    setIsFavorited(!isFavorited);
  
    // Сохранить изображение в localStorage
    if (!isFavorited) {
      // Если фильм помечен как избранный
      localStorage.setItem(`favoriteMovie_${id}`, poster_path);
    } else {
      // Если фильм удаляется из избранного
      localStorage.removeItem(`favoriteMovie_${id}`);
    }
  };

  if (!movieDetails) {
    return <p>Загрузка деталей фильма...</p>;
  }

  const {
    title,
    genres,
    overview,
    release_date,
    vote_average,
    poster_path,
  } = movieDetails;

  return (
    <div className="bg-black h-full w-full font-mono text-white pr-40 pl-40 pb-20 pt-11">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-lg font-semibold mb-2">
      Жанры: {genres.map((genre) => genre.name).join(", ")}
      </p>
      <p className="text-lg mb-2">Дата выпуска: {release_date}</p>
      <p className="text-lg mb-2">Оценка: {vote_average}</p>
      <div className="flex justify-center gap-24">
        <img
          src={`https://image.tmdb.org/t/p/w1280${poster_path}`}
          alt={title}
          className="w-96 h-3/5 rounded"
        />

        {/* Показать трейлер, если есть ключ */}
        {trailerKey && (
          <div className="mb-4 w-3/5">
            <iframe
              title={`${title} Trailer`}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>

      <p className="text-lg mb-8">{overview}</p>

      {/* «Кнопки действий (избранное, купить билет и т.д.) */}
      <div className="flex justify-between">
        <button
          onClick={handleToggleFavorite}
          className={`py-2 px-4 rounded ${
            isFavorited
              ? "bg-yellow-400 text-black"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          } font-bold`}
        >
          {isFavorited ? "Удалить из избранного" : "Пометить как избранное"}
        </button>
        <button
          onClick={openModal}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Купить билет
        </button>
      </div>
      <BuyTicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        img={`https://image.tmdb.org/t/p/w1280${poster_path}`}
        onBuyTicket={handleBuyTicket} // Передать функцию обработки покупки в модальное окно
      />
    </div>
  );
}

export default MovieDetails;
