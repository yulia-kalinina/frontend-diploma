import FilmsItem from "./FilmsItem";
import { useLocation } from "react-router-dom";

export default function FilmsGroup({
  choosenDate,
  arrOfHalls,
  arrOfSeans,
  arrOfFilms,
  todayFullDate,
  currentTime,
}) {
  const locationState = useLocation().state;

  const arrOfOpenHalls = arrOfHalls.filter((elem) => elem.hall_open === 1);
  const idNumbersOfAllOpenHalls = arrOfOpenHalls.map((el) => (el = el.id));

  const arrOfActiveSeances = arrOfSeans.filter((seance) =>
    idNumbersOfAllOpenHalls.includes(seance.seance_hallid)
  );

  const idNumberOfFilms = arrOfActiveSeances.map((el) => el.seance_filmid);
  const activeFilmsArr = arrOfFilms.filter((film) =>
    idNumberOfFilms.includes(film.id)
  );

  return (
    <main className="films-group">
      {activeFilmsArr.map((film) => {
        return (
          <FilmsItem
            film={film}
            key={film.id}
            arrOfHalls={arrOfOpenHalls}
            arrOfSeans={arrOfActiveSeances}
            choosenDate={choosenDate}
            todayFullDate={todayFullDate}
            currentTime={currentTime}
            locationState={locationState}
          />
        );
      })}
    </main>
  );
}
