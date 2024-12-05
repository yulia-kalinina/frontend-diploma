import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ClientSeatsChoose from "../Components/ClientSeatsChoose";
import ClientLogo from "../Components/ClientLogo";


export default function Seats() {
  const location = useLocation();
  const { item, film, arrOfHalls, currentDate } = location.state;

  const [arrOfHallConfig, setArrOfHallConfig] = useState([]);

  const findHall = arrOfHalls.find((el) => el.id === item.seance_hallid);
  const hallName = findHall.hall_name;
  const filmName = film.film_name;
  const seanceTime = item.seance_time;
  const seanceId = item.id;

  useEffect(() => {
    fetch(
      `https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceId}&date=${currentDate}`
    )
      .then((response) => response.json())
      .then((data) => setArrOfHallConfig(data.result));
  }, []);

  console.log(arrOfHallConfig);

  return (
    <div className="client-page-wrap">
      <div className="container">
        <div className="client-main-header">
          <div>
            <ClientLogo />
          </div>
        </div>
        <div className="film-container">
          <h2 className="film-description-title">{filmName}</h2>
          <div className="film-description-timeout">
            <span>Начало сеанса:</span>
            <span>{seanceTime}</span>
          </div>
          <h3 className="film-description-title">{hallName}</h3>

          <ClientSeatsChoose
            hallConfigArr={arrOfHallConfig}
            hall={findHall}
            filmName={filmName}
            seanceTime={seanceTime}
            currentDate={currentDate}
            seanceId={seanceId}
          />
        </div>
      </div>
    </div>
  );
}
