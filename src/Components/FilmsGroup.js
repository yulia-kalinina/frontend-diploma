import FilmsItem from "./FilmsItem";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function FilmsGroup({
  choosenDate,
  setChoosenDate,
  arrOfHalls,
  arrOfSeans,
  arrOfFilms,
  todayFullDate,
  currentTime,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const goHome = () => navigate("/", { replace: true });

  const arrOfOpenHalls = arrOfHalls.filter((elem) => elem.hall_open === 1);
  const idNumbersOfAllOpenHalls = arrOfOpenHalls.map((el) => (el = el.id));

  const arrOfActiveSeances = arrOfSeans.filter((seance) =>
    idNumbersOfAllOpenHalls.includes(seance.seance_hallid)
  );

  const idNumberOfFilms = arrOfActiveSeances.map((el) => el.seance_filmid);
  const activeFilmsArr = arrOfFilms.filter((film) =>
    idNumberOfFilms.includes(film.id)
  );

  let locationShortDate = location.pathname.slice(-2);

  if (locationShortDate.includes("/")) {
    locationShortDate = locationShortDate.replace("/", "0");
  }

  let choosenDateShortDate = choosenDate.slice(-2);

  useEffect(() => {
    const findActiveDateElem = document.querySelector(".date-item-selected");
    if (
      findActiveDateElem &&
      locationShortDate !== choosenDateShortDate &&
      !isNaN(parseInt(locationShortDate))
    ) {
      const activeDate = findActiveDateElem.id;
      setChoosenDate(activeDate);
    }
    if (isNaN(parseInt(locationShortDate)) || !findActiveDateElem) {
      goHome();
    }
  }, [locationShortDate, choosenDateShortDate, setChoosenDate]);

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
            location={location}
            locationShortDate={locationShortDate}
          />
        );
      })}
    </main>
  );
}
