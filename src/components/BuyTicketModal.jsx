import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BuyTicketModal({ isOpen, onClose, img, onBuyTicket }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSeat, setSelectedSeat] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSeatSelection = (seat) => {
    setSelectedSeat(seat);
  };

  const closeModal = () => {
    onClose();
    // Здесь можно добавить дополнительную логику, например, отправку покупки на бэкенд
  };

  const handleBuyTicket = () => {
    const ticketInfo = {
      date: selectedDate,
      seat: selectedSeat,
    };
    // Вызвать функцию для обработки покупки билета
    onBuyTicket(ticketInfo);
    // Закрыть модальное окно после покупки билета
    closeModal();
  };

  const seats = ["МЕСТО2", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3", "D1", "D2", "D3", ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Купить билет"
      className="modal"
    >
       <div className="modal-content  bg-black  p-6 rounded-lg">
        <div className="modal-header">
        <button onClick={closeModal} className="group flex items-center justify-start
   w-11 h-11 bg-red-700 rounded-full cursor-pointer
   relative overflow-hidden transition-all
   duration-200 shadow-lg hover:w-32 hover:rounded-lg
   active:translate-x-1 active:translate-y-1">
      <div class="flex items-center justify-center w-full
      transition-all duration-300 group-hover:justify-start
      group-hover:px-3">
         <svg class="w-4 h-4" viewBox="0 0 512 512" fill="white">
            <path
               d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
            </path>
         </svg>
      </div>

      <div class="absolute right-5 transform
      translate-x-full opacity-0 text-white text-lg
      font-semibold transition-all duration-300
      group-hover:translate-x-0 group-hover:opacity-100">
         Закрыть
      </div>
   </button>
        </div>
        <div className="modal-body flex flex-col items-center">
          {/* Изображение в верхней части */}
          <img
            className="w-1/6 h-1/6 rounded-lg mb-4"
            src={img}
            alt="Изображение фильма"
          />

          {/* Выбор времени по центру */}
          <div className="date-picker-container mb-4">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              showTimeSelect
              dateFormat="Pp"
            />
          </div>

          {/* Панель выбора мест в нижней части */}
          <div className="seat-panel mb-4 h-screen">
        

        
           <h3 className="text-xl mb-2">Выберите ваше место:</h3>
            <div className="seat-grid grid grid-cols-3 gap-2 h-100% w-100% w-full">
              {seats.map((seat) => (
                <div
                  key={seat}
                  className={`seat rounded-lg py-1 text-center ${
                    selectedSeat === seat
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => handleSeatSelection(seat)}
                >
                  {seat}
                </div>
                
              ))}
             
            </div>
            <button  onClick={handleBuyTicket}
           className="flex w-full items-center mt-3 justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transform transition-transform duration-300 hover:scale-110">
            Купить билет
          </button>
          </div>
        </div>
        
      </div>
    </Modal>
  );
}

export default BuyTicketModal;
