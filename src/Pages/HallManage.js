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
import HallAdd from "../Components/HallAdd";

export default function HallManage() {
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

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => {
        setArrOfFilms(data.result.films);
        setArrOfHalls(data.result.halls);
        setArrOfTimeline(data.result.seances);
      });
  }, []);

  return (
    <div className="admin-page-wrap">
      <div className="container">
        <div className="admin-main-header">
          <div>
            <AdminLogo />
          </div>
        </div>
        <div className={isContent}>
          <HallAdd
            arrOfHalls={arrOfHalls}
            setArrOfHalls={setArrOfHalls}
            setPopap={setPopap}
            setContent={setContent}
          />
          {arrOfHalls.length !== 0 ? (
            <HallConfig arrOfHalls={arrOfHalls} />
          ) : null}

          {arrOfHalls.length !== 0 ? <PriceConfig halls={arrOfHalls} /> : null}
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
          {arrOfHalls.length !== 0 ? (
            <HallOpenSales halls={arrOfHalls} setArrOfHalls={setArrOfHalls} />
          ) : null}
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
