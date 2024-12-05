import { useState } from "react";
import closeIcon from "../img/close.png";

export default function PopapAddHall({
  isPopap,
  setPopap,
  setContent,
  setArrOfHalls
}) {
  const [hallName, setHallName] = useState("");

  const handlerCancel = () => {
    setPopap("popap-wrapper-none");
    setContent("hall-manage-wrapper");
    setHallName("");
  };

  const onChangeHallName = ({ target }) => {
    setHallName(target.value);
  };

  const handlerAddHall = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    newForm.set("hallName", hallName);

    fetch("https://shfe-diplom.neto-server.ru/hall", {
      method: "POST",
      body: newForm,
    })
      .then((response) => response.json())
      .then((data) => setArrOfHalls(data.result.halls));

    setHallName("");
    setPopap("popap-wrapper-none");
    setContent("hall-manage-wrapper");
  };

  return (
    <div className={isPopap}>
      <div className="popap">
        <div className="popap-header">
          <h1 className="drop-btn">Добавление зала</h1>
          <img
            src={closeIcon}
            alt="Закрыть окно"
            className="popap-close-icon"
            onClick={handlerCancel}
          />
        </div>

        <form onSubmit={handlerAddHall}>
          <div className="popap-content">
            <label htmlFor="popapHall" className="popap-subtitle">
              Название зала
            </label>
            <input
              type="text"
              id="popapHall"
              className="popap-text-field"
              placeholder="Например, «Зал 1»"
              value={hallName}
              onInput={onChangeHallName}
              required
            />
          </div>

          <div className="popap-button-group">
            <button className="popap-button" type="submit">
              Добавить зал
            </button>
            <button
              type="button"
              className="popap-button popap-button-cancel"
              onClick={handlerCancel}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
