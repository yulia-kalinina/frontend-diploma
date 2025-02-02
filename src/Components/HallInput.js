import { useState } from "react";

export default function HallInput({
  hall,
  arrOfHalls,
  setActiveHallId,
  setForm,
  setFindConfig,
  setPriceForm,
}) {
  const [isHallActive, setHallActive] = useState(true);

  const handlerHallClick = (hall) => {
    const allHalls = document.querySelectorAll(".hall-item-active");
    const allHallsArr = Array.from(allHalls);

    let newArr = allHallsArr.filter((item) => item.id !== hall.id);

    newArr.forEach((element) => {
      element.classList.remove("hall-item-active");
    });

    setActiveHallId(hall.id);

    setHallActive(!isHallActive);

    if (setForm) {
      setForm({
        hall_rows: hall.hall_rows,
        hall_places: hall.hall_places,
      });
    }

    if (setFindConfig) {
      setFindConfig(hall.hall_config);
    }

    if (setPriceForm) {
      setPriceForm({
        hall_price_standart: hall.hall_price_standart,
        hall_price_vip: hall.hall_price_vip,
      });
    }
  };

  return (
    <input
      type="text"
      id={hall.id}
      className={`hall-item hall-item-input ${
        hall.id === arrOfHalls[0].id ? "hall-item-active" : ""
      } ${isHallActive ? "" : "hall-item-active"} `}
      value={hall.hall_name}
      onClick={() => handlerHallClick(hall)}
      readOnly
    />
  );
}
