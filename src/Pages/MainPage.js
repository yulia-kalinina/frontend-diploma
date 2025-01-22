import ClientLogo from "../Components/ClientLogo";
import NavDate from "../Components/NavDate";
import FilmsGroup from "../Components/FilmsGroup";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MainPage() {
  const today = new Date();
  const todayFullDate = new Date().toJSON().slice(0, -14);
  const currentTime = today.getHours() + ":" + today.getMinutes();
  const [choosenDate, setChoosenDate] = useState(todayFullDate);

  const [arrOfFilms, setArrOfFilms] = useState([]);
  const [arrOfSeans, setArrOfSeans] = useState([]);
  const [arrOfHalls, setArrOfHalls] = useState([]);

  useEffect(() => {
    fetch("https://shfe-diplom.neto-server.ru/alldata")
      .then((response) => response.json())
      .then((data) => {
        setArrOfFilms(data.result.films);
        setArrOfSeans(data.result.seances);
        setArrOfHalls(data.result.halls);
      });
  }, []);

  return (
    <div className="client-page-wrap">
      <div className="container">
        <div className="client-main-header">
          <div>
            <ClientLogo />
          </div>
          <div>
            <Link to="/login" className="contnent-btn">
              Войти
            </Link>
          </div>
        </div>

        <div className="navigation-wrap">
          <NavDate today={today} setChoosenDate={setChoosenDate} />
        </div>

        <FilmsGroup
          choosenDate={choosenDate}
          arrOfHalls={arrOfHalls}
          arrOfSeans={arrOfSeans}
          arrOfFilms={arrOfFilms}
          todayFullDate={todayFullDate}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}
