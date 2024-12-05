import icon from "../img/dropdown.png";
import deleteIcon from "../img/delete.png";
import { useState } from "react";

export default function SessionGrid({
  arrOfHalls,
  arrOfFilms,
  arrOfTimeline,
  setArrOfFilms,
  setContent,
  setFilmPopap,
  setTimelinePopap,
  setTimelineDeletePopap,
  setFilmNameToDeleteSeance,
  setSeanceIdToDeleteSeance,
}) {
  const [isActive, setActive] = useState(true);

  const [dragActive, setDragActive] = useState(false);

  const findFilmName = (id) => {
    let findFilm = arrOfFilms.find((item) => item.id === id);
    return findFilm.film_name;
  };

  const handlerDrag = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handlerLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handlerDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    setContent("hall-manage-wrapper-none");
    setTimelinePopap("popap-wrapper");
    setTimelineDeletePopap("popap-wrapper-none");
  };

  let seancesToDelete = document.querySelectorAll(".seance-wpap-in-line");

  let deleteZone = document.querySelector(".dropdown-content-active");

  seancesToDelete.forEach((seance) => {
    seance.addEventListener("dragstart", () => {
      seance.classList.add("drugging");
    });

    seance.addEventListener("dragend", () => {
      seance.classList.remove("drugging");
    });
  });

  if (deleteZone) {
    deleteZone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    deleteZone.addEventListener("drop", () => {
      let elemToDelete = document.querySelector(".drugging");

      if (elemToDelete) {
        let findFilmName = elemToDelete.firstElementChild.innerHTML;
        let findId = elemToDelete.lastElementChild.innerHTML;

        setFilmNameToDeleteSeance(findFilmName);
        setSeanceIdToDeleteSeance(findId);

        setContent("hall-manage-wrapper-none");
        setTimelinePopap("popap-wrapper-none");
        setTimelineDeletePopap("popap-wrapper");
      }
    });
  }

  const handlerClick = () => {
    setActive(!isActive);
  };

  const handlerPopapOpen = () => {
    setContent("hall-manage-wrapper-none");
    setFilmPopap("popap-wrapper");
  };

  const handlerDeleteFilm = (film) => {
    fetch(`https://shfe-diplom.neto-server.ru/film/${film.id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => setArrOfFilms(data.result.films));
  };

  const handlerCancel = () => {};

  let currentColor = [202, 255, 133];
  let nextColor = getRandomColor();
  let currentStep = 0;
  let steps = 4;

  function getRandomColor() {
    let color = [];
    while (color.length < 3) color.push(Math.floor(Math.random() * 255));
    return color;
  }

  const arrOfFilmsDiv = document.querySelectorAll(".films-grid-block");

  arrOfFilmsDiv.forEach((el) => {
    currentStep++;
    el.style.backgroundColor =
      "rgb( " +
      currentColor
        .map(function (e, i) {
          return Math.floor(e + ((nextColor[i] - e) * currentStep) / steps);
        })
        .join(", ") +
      ")";
    if (currentStep == 3) {
      currentStep = 0;
      currentColor = nextColor;
      nextColor = getRandomColor();
    }
  });

  const findColor = (item) => {
    let filmName = findFilmName(item.seance_filmid);

    let arrOfFilmsContainers = Array.from(arrOfFilmsDiv);

    let findFilmBox = arrOfFilmsContainers.find((el) =>
      el.innerText.includes(filmName)
    );

    let findStyle = findFilmBox.getAttribute("style");
    let findStyleSliced = findStyle.slice(18).slice(0, -1);
    
    return findStyleSliced;
  };

  return (
    <>
      <div className="dropdown">
        <div className="dropdown-header" onClick={handlerClick}>
          <button className="drop-btn">Сетка сеансов</button>
          <img src={icon} alt="Нажми на меня" className="drop-icon" />
        </div>
        <div
          className={isActive ? "dropdown-content" : "dropdown-content-active"}
        >
          <button
            className="popap-button"
            type="button"
            onClick={handlerPopapOpen}
          >
            Добавить фильм
          </button>
          <div className="drop-content-block">
            <div className="films-grid">
              {arrOfFilms.map((film) => {
                return (
                  <div
                    key={film.id}
                    className="films-grid-block"
                    draggable={true}
                  >
                    <img
                      src={film.film_poster}
                      alt="Постер"
                      className="film-grid-image"
                    />
                    <div className="film-grid-content">
                      <h4 className="film-grid-title">{film.film_name}</h4>

                      <p className="film-grid-duration">
                        {film.film_duration} минут
                      </p>
                    </div>
                    <input
                      type="image"
                      src={deleteIcon}
                      className="dropwown-delete-icon film-grid-delete-icon"
                      alt="Удалить зал"
                      onClick={() => handlerDeleteFilm(film)}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="session-container-wrap">
            <div className="session-container">
              {arrOfHalls.map((hall) => {
                return (
                  <div className="session-timeline-block" key={hall.id}>
                    <h4 className="session-timeline-hall-name">
                      {hall.hall_name}
                    </h4>
                    <div
                      className={`session-hall-timeline ${
                        dragActive ? "session-hall-timeline-drag" : ""
                      }`}
                      onDragEnter={handlerDrag}
                      onDragOver={handlerDrag}
                      onDragLeave={handlerLeave}
                      onDrop={handlerDrop}
                    >
                      {arrOfTimeline
                        .filter((seance) => seance.seance_hallid === hall.id)
                        .sort(function (a, b) {
                          if (a.seance_time > b.seance_time) {
                            return 1;
                          }
                          if (a.seance_time < b.seance_time) {
                            return -1;
                          }
                          return 0;
                        })
                        .map((item) => {
                          return (
                            <div
                              key={item.id}
                              draggable={true}
                              style={{ backgroundColor: findColor(item) }}
                              className={
                                item.seance_time >= "00:00" &&
                                item.seance_time < "06:00"
                                  ? "seance-wpap-in-line seance-wpap-in-line-start"
                                  : item.seance_time >= "06:00" &&
                                    item.seance_time < "12:00"
                                  ? "seance-wpap-in-line seance-wpap-in-line-margin-quarter"
                                  : item.seance_time >= "12:00" &&
                                    item.seance_time < "18:00"
                                  ? "seance-wpap-in-line seance-wpap-in-line-margin-half"
                                  : item.seance_time >= "18:00"
                                  ? "seance-wpap-in-line seance-wpap-in-line-margin-three-quarters"
                                  : "seance-wpap-in-line"
                              }
                            >
                              <p className="timeline-film-name">
                                {findFilmName(item.seance_filmid)}
                              </p>
                              <span className="seance-lil-time">
                                {item.seance_time}
                              </span>
                              <span className="seance-id">{item.id}</span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="popap-button-group popap-button-group-timeline">
            <button
              className="popap-button popap-button-cancel"
              onClick={handlerCancel}
            >
              Отмена
            </button>
            <button className="popap-button" type="button">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
