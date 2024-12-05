import { useEffect, useState } from "react";
import FilmsItem from "./FilmsItem";

export default function FilmsGroup({ choosenDate }) {
  const currentDate = choosenDate;

  const [arrOfFilms, setArrOfFilms] = useState([]);
  const [arrOfSeans, setArrOfSeans] = useState([]);
  const [arrOfHalls, setArrOfHalls] = useState([]);

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => setArrOfFilms(data.result.films));
  }, []);

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => setArrOfSeans(data.result.seances));
  }, []);

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => setArrOfHalls(data.result.halls));
  }, []);

  const arrOfOpenHalls = arrOfHalls.filter((elem) => elem.hall_open === 1);

  const idNumbersOfAllOpenHalls = arrOfOpenHalls.map((el) => (el = el.id));

  const arrOfActiveSeances = arrOfSeans.filter((seance) => idNumbersOfAllOpenHalls.includes(seance.seance_hallid));

  const idNumberOfFilms = arrOfActiveSeances.map((el) => el.seance_filmid);

  const activeFilmsArr = arrOfFilms.filter((film) => idNumberOfFilms.includes(film.id));

  return (
    <main className="films-group">
      {activeFilmsArr.map((film) => {
        return (
          <FilmsItem
            film={film}
            key={film.id}
            arrOfHalls={arrOfOpenHalls}
            arrOfSeans={arrOfActiveSeances}
            currentDate={currentDate}
          />
        );
      })}
    </main>
  );
}
