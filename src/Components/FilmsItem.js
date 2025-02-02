import { Link } from "react-router-dom";

export default function FilmsItem({
  film,
  arrOfHalls,
  arrOfSeans,
  choosenDate,
  todayFullDate,
  currentTime,
  location,
  locationShortDate,
}) {
  let findFilmSeancesArr = arrOfSeans.filter(
    (seance) => seance.seance_filmid === film.id
  );

  const idNumberOfHall = findFilmSeancesArr.map((el) => el.seance_hallid);

  const findHallsArr = arrOfHalls.filter((hall) =>
    idNumberOfHall.includes(hall.id)
  );

  const handleNonActiveSeanceClick = () => {
    alert(
      "Данный сеанс уже идет или закончился! Выберите другой, предстоящий сеанс."
    );
  };

  const todayShortDate = todayFullDate.slice(-2);

  return (
    <section className="film-container">
      <div className="film-about-content">
        <div className="poster-wrap">
          <img src={film.film_poster} alt="О фильме" className="film-image" />
        </div>
        <div className="film-description">
          <h2 className="film-description-title">{film.film_name}</h2>
          <p className="film-description-content">{film.film_description}</p>
          <div className="film-description-timeout">
            <span>{film.film_duration} минут</span>
            <span>{film.film_origin}</span>
          </div>
        </div>
      </div>

      <div className="select-session-container">
        {findHallsArr.map((hall) => {
          return (
            <div key={hall.id} className="select-session-item">
              <h3 className="film-description-title">{hall.hall_name}</h3>
              <div className="select-time">
                <ul className="select-time-list">
                  {findFilmSeancesArr
                    .filter((el) => el.seance_hallid === hall.id)
                    .map((item) => {
                      if (
                        (location.state === null &&
                          +todayShortDate === +locationShortDate &&
                          currentTime > item.seance_time) ||
                        (location.state !== null &&
                          +todayShortDate === +location.state.day.date &&
                          currentTime > item.seance_time)
                      ) {
                        return (
                          <li className="select-time-item" key={item.id}>
                            <div
                              className="select-time-link non-active-seanse-link"
                              onClick={handleNonActiveSeanceClick}
                            >
                              {item.seance_time}
                            </div>
                          </li>
                        );
                      }
                      return (
                        <li className="select-time-item" key={item.id}>
                          <Link
                            to="/film"
                            className="select-time-link"
                            state={{
                              item,
                              film,
                              arrOfHalls,
                              choosenDate,
                            }}
                          >
                            {item.seance_time}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
