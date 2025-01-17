import closeIcon from "../img/close.png";
import { useState } from "react";

export default function PopapAddTimeline({
  isTimelinePopap,
  setTimelinePopap,
  setContent,
  arrOfHalls,
  arrOfFilms,
  setArrOfTimeline,
}) {
  const [timelineForm, setTimelineForm] = useState({
    hall_name: "",
    film_name: "",
    seanse_time: "",
  });

  const handleChangeTimelineForm = ({ target }) => {
    const { name, value } = target;
    setTimelineForm((prevTimelineForm) => ({
      ...prevTimelineForm,
      [name]: value,
    }));
  };

  const handlerTimelinePopapCancel = () => {
    setContent("hall-manage-wrapper");
    setTimelinePopap("popap-wrapper-none");
    setTimelineForm({
      hall_name: "",
      film_name: "",
      seanse_time: "",
    });
  };

  const handlerAddTimelineFormSubmit = (evt) => {
    evt.preventDefault();

    const findHall = arrOfHalls.find(
      (el) => el.hall_name === timelineForm.hall_name
    );
    const findHallId = findHall.id;

    const findFilm = arrOfFilms.find(
      (el) => el.film_name === timelineForm.film_name
    );

    const findFilmId = findFilm.id;

    const formData = new FormData();

    formData.set("seanceHallid", findHallId);
    formData.set("seanceFilmid", findFilmId);
    formData.set("seanceTime", timelineForm.seanse_time);

    fetch("https://shfe-diplom.neto-server.ru/seance", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === false) {
          alert(data.error);
        } else {
          setArrOfTimeline(data.result.seances);
          handlerTimelinePopapCancel();
        }
      });
  };

  return (
    <div className={isTimelinePopap}>
      <div className="popap">
        <div className="popap-header">
          <h1 className="drop-btn">Добавление сеанса</h1>
          <img
            src={closeIcon}
            alt="Закрыть окно"
            className="popap-close-icon"
            onClick={handlerTimelinePopapCancel}
          />
        </div>

        <form className="full-add-form" onSubmit={handlerAddTimelineFormSubmit}>
          <div className="full-add-popap-content">
            <label htmlFor="popapTimelineHall" className="popap-subtitle">
              Название зала
            </label>
            <span className="select-wrapper">
              <select
                id="popapTimelineHall"
                className="popap-text-field popap-select-field"
                onChange={handleChangeTimelineForm}
                name="hall_name"
                value={timelineForm.hall_name}
                required
              >
                {arrOfHalls.map((hall) => {
                  return (
                    <option key={hall.id} value={hall.hall_name}>
                      {hall.hall_name}
                    </option>
                  );
                })}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </span>
          </div>

          <div className="full-add-popap-content">
            <label htmlFor="popapTimelineFilmName" className="popap-subtitle">
              Название фильма
            </label>
            <span className="select-wrapper">
              <select
                id="popapTimelineFilmName"
                className="popap-text-field popap-select-field"
                name="film_name"
                onChange={handleChangeTimelineForm}
                value={timelineForm.film_name}
                required
              >
                {arrOfFilms.map((film) => {
                  return (
                    <option
                      key={film.id}
                      value={film.film_name}
                      className="popap-option"
                    >
                      {film.film_name}
                    </option>
                  );
                })}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#5f6368"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </span>
          </div>

          <div className="full-add-popap-content">
            <label htmlFor="popapTimelineTime" className="popap-subtitle">
              Время начала
            </label>
            <input
              type="time"
              id="popapTimelineTime"
              name="seanse_time"
              className="popap-text-field"
              onChange={handleChangeTimelineForm}
              value={timelineForm.seanse_time}
              required
            />
          </div>

          <div className="popap-button-group full-popap-button-group">
            <button className="popap-button" type="submit">
              Добавить сеанс
            </button>
            <button
              type="button"
              className="popap-button popap-button-cancel"
              onClick={handlerTimelinePopapCancel}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
