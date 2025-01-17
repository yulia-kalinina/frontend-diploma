import icon from "../img/dropdown.png";
import deleteIcon from "../img/delete.png";
import { useState } from "react";

export default function HallAdd({ arrOfHalls, setArrOfHalls, setPopap, setContent }) {
  const [isActive, setActive] = useState(true);

  const handlerArrowIconClick = () => {
    setActive(!isActive);
  };

  const handlerDeleteHall = (el) => {
    fetch(`https://shfe-diplom.neto-server.ru/hall/${el.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setArrOfHalls(data.result.halls));
  };

  const hadlerPopapOpen = () => {
    setPopap("popap-wrapper");
    setContent("hall-manage-wrapper-none");
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handlerArrowIconClick}>
        <h2 className="drop-btn">Управление залами</h2>
        <img src={icon} alt="Нажми на меня" className="drop-icon" />
      </div>
      <div
        className={isActive ? "dropdown-content" : "dropdown-content-active"}
      >
        <h3 className="drop-subtitle">Доступные залы:</h3>
        <ul className="dropdown-list">
          {arrOfHalls.map((el) => {
            return (
              <li className="dropdown-list-item" key={el.id}>
                – {el.hall_name}
                <input
                  type="image"
                  src={deleteIcon}
                  className="dropwown-delete-icon"
                  alt="Удалить зал"
                  onClick={() => handlerDeleteHall(el)}
                />
              </li>
            );
          })}
        </ul>
        <button
          className="admin-content-btn"
          type="button"
          onClick={hadlerPopapOpen}
        >
          Создать зал
        </button>
      </div>
    </div>
  );
}
