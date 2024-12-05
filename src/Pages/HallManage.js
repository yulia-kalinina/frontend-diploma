import icon from "../img/dropdown.png";
import deleteIcon from "../img/delete.png";
import AdminLogo from "../Components/AdminLogo";

import { useState, useEffect } from "react";
import PopapAddHall from "../Components/PopapAddHall";
import PopapAddFilm from "../Components/PopapAddFilm";
import PopapAddTimeline from "../Components/PopapAddTimeline";
import PopapDeleteTimeline from "../Components/PopapDeleteTimeline";
import HallConfig from "../Components/HallConfig";
import PriceConfig from "../Components/PriceConfig";
import SessionGrid from "../Components/SessionGrid";
import HallOpenSales from "../Components/HallOpenSales";

export default function HallManage() {
  const [isActive, setActive] = useState(true);
  const [isContent, setContent] = useState("hall-manage-wrapper");

  const [isPopap, setPopap] = useState("popap-wrapper-none");
  const [isFilmPopap, setFilmPopap] = useState("popap-wrapper-none");
  const [isTimelinePopap, setTimelinePopap] = useState("popap-wrapper-none");
  const [isTimelineDeletePopap, setTimelineDeletePopap] =
    useState("popap-wrapper-none");

  const [filmNameToDeleteSeance, setFilmNameToDeleteSeance] = useState("");
  const [seanceIdToDeleteSeance, setSeanceIdToDeleteSeance] = useState("");

  const [arrOfHalls, setArrOfHalls] = useState([]);
  const [arrOfFilms, setArrOfFilms] = useState([]);
  const [arrOfTimeline, setArrOfTimeline] = useState([]);

  const handlerArrowIconClick = () => {
    setActive(!isActive);
  };

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => setArrOfFilms(data.result.films));
  }, []);

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => setArrOfHalls(data.result.halls));
  }, []);

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => setArrOfTimeline(data.result.seances));
  }, []);

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
    <div className="admin-page-wrap">
      <div className="container">
        <div className="admin-main-header">
          <div>
            <AdminLogo />
          </div>
        </div>
        <div className={isContent}>
          <div className="dropdown">
            <div className="dropdown-header" onClick={handlerArrowIconClick}>
              <h2 className="drop-btn">Управление залами</h2>
              <img src={icon} alt="Нажми на меня" className="drop-icon" />
            </div>
            <div
              className={
                isActive ? "dropdown-content" : "dropdown-content-active"
              }
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
          <HallConfig arrOfHalls={arrOfHalls} />
          <PriceConfig halls={arrOfHalls} />
          <SessionGrid
            arrOfHalls={arrOfHalls}
            arrOfFilms={arrOfFilms}
            arrOfTimeline={arrOfTimeline}
            setArrOfFilms={setArrOfFilms}
            setContent={setContent}
            setFilmPopap={setFilmPopap}
            setTimelinePopap={setTimelinePopap}
            setTimelineDeletePopap={setTimelineDeletePopap}
            setFilmNameToDeleteSeance={setFilmNameToDeleteSeance}
            setSeanceIdToDeleteSeance={setSeanceIdToDeleteSeance}
          />
          <HallOpenSales halls={arrOfHalls} setArrOfHalls={setArrOfHalls}/>
        </div>

        <PopapAddHall
          isPopap={isPopap}
          setPopap={setPopap}
          setContent={setContent}
          setArrOfHalls={setArrOfHalls}
        />

        <PopapAddFilm
          isFilmPopap={isFilmPopap}
          setFilmPopap={setFilmPopap}
          setContent={setContent}
          setArrOfFilms={setArrOfFilms}
        />

        <PopapAddTimeline
          isTimelinePopap={isTimelinePopap}
          setTimelinePopap={setTimelinePopap}
          setContent={setContent}
          arrOfHalls={arrOfHalls}
          arrOfFilms={arrOfFilms}
          setArrOfTimeline={setArrOfTimeline}
        />

        <PopapDeleteTimeline
          isTimelineDeletePopap={isTimelineDeletePopap}
          setTimelineDeletePopap={setTimelineDeletePopap}
          setContent={setContent}
          filmNameToDeleteSeance={filmNameToDeleteSeance}
          seanceIdToDeleteSeance={seanceIdToDeleteSeance}
          setArrOfTimeline={setArrOfTimeline}
        />
      </div>
    </div>
  );
}
