import React, { useState, useEffect } from "react";

const OfferCountdown = () => {
  const [remainingTime, setRemainingTime] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        const { days, hours, minutes } = prevTime;

        if (days === 0 && hours === 0 && minutes === 0) {
          clearInterval(intervalId); // Остановить счётчик, когда он достигает нуля

          return prevTime;
        }

        let newDays = days;
        let newHours = hours;
        let newMinutes = minutes;

        if (minutes === 0) {
          if (hours === 0) {
            newDays -= 1;
            newHours = 23;
          } else {
            newHours -= 1;
            newMinutes = 59;
          }
        } else {
          newMinutes -= 1;
        }

        return {
          days: newDays,
          hours: newHours,
          minutes: newMinutes,
        };
      });
    }, 60000); // Обновлять каждую минуту


    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (number) => (number < 10 ? `0${number}` : number);

  return (
    <div className="flex justify-center text-white p-3">
      <p className="text-white">
        {formatNumber(remainingTime.days)}d{" "}
        {formatNumber(remainingTime.hours)}h{" "}
        {formatNumber(remainingTime.minutes)}m Remaining until offers reset
      </p>
    </div>
  );
};

export default OfferCountdown;
