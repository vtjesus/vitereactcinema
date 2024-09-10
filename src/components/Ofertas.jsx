import React from "react";
import OfertaItem from "./OfertaItem";

const Offers = () => {
  const createOffers = (imagen, title, resumen) => ({ imagen, title, resumen });

  const offersData = [
    createOffers("../src/assets/promocionCinesa.jpg", "Предложение Tocaku", "Специальная скидка на билеты!"),
    createOffers("../src/assets/promocionPalomitas.jpg", "Акция на попкорн", "Купите попкорн и получите бесплатный прохладительный напиток!"),
    createOffers("../src/assets/promocionTravel.jpg", "Предложение по путешествиям", "Планируйте свое следующее путешествие вместе с нами!"),
    createOffers("../src/assets/promocionChocolate.jpg", "Шоколадное предложение", "Приходите и попробуйте наши новые шоколадные батончики!"),
    createOffers("../src/assets/promocionGaming.jpg", "Предложение для геймеров", "Откройте для себя игровые предложения, которые мы предлагаем вместе с вашим билетом!"),
    createOffers("../src/assets/promocionFamilia.jpg", "Акция для семей", "Приходите всей семьей и откройте для себя потрясающие акции!"),
  ];




  const offersChunks = chunkArray(offersData, 3);

  return (
    <div>
      {offersChunks.map((ofertasGroup, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 p-4 ">
          {ofertasGroup.map((oferta, ofertaIndex) => (
            <OfertaItem
              key={ofertaIndex}
              imagen={oferta.imagen}
              title={oferta.title}
              resumen={oferta.resumen}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

// Функция для разбиения массива на подмножества заданного размера
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export default Offers;
