import { useState } from "react";

export default function HallInput({ hall, activeHallId, setActiveHallId }) {
  const [isHallActive, setHallActive] = useState(true);

  const handlerHallClick = (hall) => {

    setActiveHallId(hall.id);

    const allHalls = document.querySelectorAll(".hall-item-active");
    const allHallsArr = Array.from(allHalls);
    let newArr = allHallsArr.filter((item) => item.id !== hall.id);

    newArr.forEach((element) => {
      element.classList.remove("hall-item-active");
    });

    setHallActive(!isHallActive);
  };

  return (
    <input
      type="text"
      className={
        isHallActive
          ? "hall-item hall-item-input"
          : "hall-item hall-item-active hall-item-input"
      }
      value={hall.hall_name}
      onClick={() => handlerHallClick(hall)}
      readOnly
    />
  );
}
