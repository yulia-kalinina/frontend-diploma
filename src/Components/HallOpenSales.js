import icon from "../img/dropdown.png";
import { useState } from "react";
import HallInput from "./HallInput";

export default function HallOpenSales({ halls, setArrOfHalls }) {
  const [isActive, setActive] = useState(true);
  const [activeHallId, setActiveHallId] = useState(halls[0].id);

  let btnText = "Открыть продажу билетов";
  let readyStatusTextField = "Выберите зал для открытия/закрытия продаж";

  let selectedHall = "";

  if (activeHallId) {
    selectedHall = halls.find((el) => el.id === activeHallId);
  }

  if (selectedHall) {
    if (selectedHall.hall_open === 1) {
      btnText = "Приостановить продажу билетов";
      readyStatusTextField = "Вы можете приостановить продажу билетов";
    }

    if (selectedHall.hall_open === 0) {
      readyStatusTextField = "Все готово к открытию";
    }
  }

  const handlerClick = () => {
    setActive(!isActive);
  };

  const handlerOpenHallSubmit = () => {
    console.log(selectedHall);

    if (!selectedHall) {
      alert("Выберите зал для открытия/закрытия продаж");
    }

    const formDada = new FormData();

    if (selectedHall.hall_open === 1) {
      formDada.set("hallOpen", "0");
    } else {
      formDada.set("hallOpen", "1");
    }
    fetch(`https://shfe-diplom.neto-server.ru/open/${activeHallId}`, {
      method: "POST",
      body: formDada,
    })
      .then((response) => response.json())
      .then((data) => setArrOfHalls(data.result.halls));

    setActiveHallId("");
    const allHalls = document.querySelectorAll(".hall-item-active");
    allHalls.forEach((element) => {
      element.classList.remove("hall-item-active");
    });
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handlerClick}>
        <h2 className="drop-btn">Открыть продажи</h2>
        <img src={icon} alt="Нажми на меня" className="drop-icon" />
      </div>
      <div
        className={isActive ? "dropdown-content" : "dropdown-content-active"}
      >
        <h3 className="drop-subtitle drop-subtitle-open-sale">
          Выберите зал для открытия/закрытия продаж:
        </h3>
        <div className="drop-content-block drop-content-block-open-sale">
          {halls.map((hall) => {
            return (
              <HallInput
                hall={hall}
                arrOfHalls={halls}
                key={hall.id}
                activeHallId={activeHallId}
                setActiveHallId={setActiveHallId}
              />
            );
          })}
        </div>

        <p className="drop-subtitle drop-subtitle-center">
          {readyStatusTextField}
        </p>

        <div className="popap-button-group full-popap-button-group">
          <button
            className="popap-button"
            type="submit"
            onClick={handlerOpenHallSubmit}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}
