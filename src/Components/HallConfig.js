import icon from "../img/dropdown.png";
import { useState } from "react";
import HallConfigLayout from "./HallConfigLayout";
import HallInput from "./HallInput";

export default function HallConfig({ arrOfHalls }) {
  const [isActive, setActive] = useState(true);
  const [actualArrOfHalls, setActualArrOfHalls] = useState(arrOfHalls);
  const [activeHallId, setActiveHallId] = useState(actualArrOfHalls[0].id);
  const [findConfig, setFindConfig] = useState(actualArrOfHalls[0].hall_config);

  const arrOfSeats = [];

  const [form, setForm] = useState({
    hall_rows: actualArrOfHalls[0].hall_rows,
    hall_places: actualArrOfHalls[0].hall_places,
  });

  const handlerClick = () => {
    setActive(!isActive);
  };

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handlerCancel = () => {
    const activeHall = actualArrOfHalls.find((el) => el.id === activeHallId);

    setForm({
      hall_rows: activeHall.hall_rows,
      hall_places: activeHall.hall_places,
    });

    setFindConfig(activeHall.hall_config);
  };

  const handlerHallConfigFormSubmit = (e) => {
    e.preventDefault();

    if (!activeHallId) {
      alert("Выберите зал для конфигурации");
      return;
    }

    let getFinalConfig = [];

    for (let arr of arrOfSeats) {
      let newArr = arr.map((el) => (el = el.status));
      getFinalConfig.push(newArr);
    }

    const formData = new FormData();
    formData.set("rowCount", form.hall_rows);
    formData.set("placeCount", form.hall_places);
    formData.set("config", JSON.stringify(getFinalConfig));
    fetch(`https://shfe-diplom.neto-server.ru/hall/${activeHallId}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          alert("Изменения сохранены!");

          const arrOfHallsCopy = actualArrOfHalls.map((hallObj) =>
            hallObj.id === data.result.id
              ? {
                  ...hallObj,
                  hall_rows: data.result.hall_rows,
                  hall_places: data.result.hall_places,
                  hall_config: data.result.hall_config,
                }
              : hallObj
          );
          setActualArrOfHalls(arrOfHallsCopy);
          setFindConfig(data.result.hall_config);
        }
      });
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
          {actualArrOfHalls.map((hall) => {
            return (
              <div key={hall.id} className="hall-name-wrap">
                <HallInput
                  hall={hall}
                  arrOfHalls={actualArrOfHalls}
                  activeHallId={activeHallId}
                  setActiveHallId={setActiveHallId}
                  setForm={setForm}
                  setFindConfig={setFindConfig}
                />
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
          arrOfSeats={arrOfSeats}
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
