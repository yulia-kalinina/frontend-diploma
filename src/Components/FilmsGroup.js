import FilmsItem from "./FilmsItem";

export default function FilmsGroup({
  choosenDate,
  arrOfHalls,
  arrOfSeans,
  arrOfFilms,
}) {
  const arrOfOpenHalls = arrOfHalls.filter((elem) => elem.hall_open === 1);
  const idNumbersOfAllOpenHalls = arrOfOpenHalls.map((el) => (el = el.id));

  const arrOfActiveSeances = arrOfSeans.filter((seance) =>
    idNumbersOfAllOpenHalls.includes(seance.seance_hallid)
  );

  const checkTimeOfSeances = () => {
    const today = new Date();
    const todayFullDate = today.toJSON().slice(0, -14);
    if (choosenDate === todayFullDate) {
      const currentTime = today.getHours() + ":" + today.getMinutes();
      const futureSeances = arrOfActiveSeances.filter(
        (seance) => seance.seance_time > currentTime
      );
      return futureSeances;
    } else {
      return arrOfActiveSeances;
    }
  };

  const idNumberOfFilms = checkTimeOfSeances().map((el) => el.seance_filmid);

  const activeFilmsArr = arrOfFilms.filter((film) =>
    idNumberOfFilms.includes(film.id)
  );

  return (
    <main className="films-group">
      {activeFilmsArr.length > 0
        ? activeFilmsArr.map((film) => {
            return (
              <FilmsItem
                film={film}
                key={film.id}
                arrOfHalls={arrOfOpenHalls}
                arrOfSeans={checkTimeOfSeances()}
                currentDate={choosenDate}
              />
            );
          })
        : <div>На сегодня сеансов нет</div>}
    </main>
  );
}
