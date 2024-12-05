import icon from "../img/dropdown.png";
import { useState } from "react";
import HallConfigLayout from "./HallConfigLayout";
import HallInput from "./HallInput";

export default function HallConfig({ arrOfHalls }) {
  const [isActive, setActive] = useState(true);
  const [activeHallId, setActiveHallId] = useState("");

  const findConfig = [];

  const [form, setForm] = useState({
    hall_rows: "",
    hall_places: "",
  });

  const handlerClick = () => {
    setActive(!isActive);
  };

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handlerCancel = () => {
    const findActiveHall = document.querySelector(".hall-item-active");
    if (findActiveHall) {
      findActiveHall.classList.remove("hall-item-active");
      setActiveHallId("");
    }

    findConfig.length = 0;

    setForm({
      hall_rows: "",
      hall_places: "",
    });
  };

  const handlerHallConfigFormSubmit = (e) => {
    e.preventDefault();

    if (!activeHallId) {
      alert("Выберите зал для конфигурации");
      return;
    }

    if (findConfig.length === 0) {
      alert("Выберите количество и типы мест в зале");
      return;
    } else {
      for (let i = 0; i < findConfig.length; i++) {
        findConfig[i] = findConfig[i].map((el) => (el = el.status));
      }
    }

    const formData = new FormData();
    formData.set("rowCount", form.hall_rows);
    formData.set("placeCount", form.hall_places);
    formData.set("config", JSON.stringify(findConfig));
    fetch(`https://shfe-diplom.neto-server.ru/hall/${activeHallId}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    handlerCancel();
    alert("Конфигурация выполнена успешно!");
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handlerClick}>
        <h2 className="drop-btn">Конфигурация залов</h2>
        <img src={icon} alt="Нажми на меня" className="drop-icon" />
      </div>
      <div
        className={isActive ? "dropdown-content" : "dropdown-content-active"}
      >
        <h3 className="drop-subtitle">Выберите зал для конфигурации:</h3>
        <div className="drop-content-block">
          {arrOfHalls.map((hall) => {
            return (
              <div key={hall.id} className="hall-name-wrap">
                <HallInput hall={hall} activeHallId={activeHallId} setActiveHallId={setActiveHallId} />
              </div>
            );
          })}
        </div>

        <form>
          <h3 className="drop-subtitle">
            Укажите количество рядов и максимальное количество кресел в ряду:
          </h3>

          <div className="drop-content-block drop-content-container">
            <div className="drop-input-block">
              <label htmlFor="rows" className="drop-label">
                Рядов, шт
              </label>
              <input
                type="text"
                id="rows"
                className="drop-input"
                name="hall_rows"
                value={form.hall_rows}
                onChange={handleChangeForm}
                required
              />
            </div>
            <span className="drop-math-symbol">x</span>
            <div className="drop-input-block">
              <label htmlFor="seats" className="drop-label">
                Мест, шт
              </label>
              <input
                type="text"
                id="seats"
                name="hall_places"
                value={form.hall_places}
                onChange={handleChangeForm}
                className="drop-input"
                required
              />
            </div>
          </div>
        </form>

        <HallConfigLayout
          findConfig={findConfig}
          rows={form.hall_rows}
          seats={form.hall_places}
        />

        <div className="popap-button-group full-popap-button-group">
          <button
            type="button"
            className="popap-button popap-button-cancel"
            onClick={handlerCancel}
          >
            Отмена
          </button>
          <button
            className="popap-button"
            type="submit"
            onClick={handlerHallConfigFormSubmit}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
