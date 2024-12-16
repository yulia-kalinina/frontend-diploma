import ClientLogo from "../Components/ClientLogo";
import NavDate from "../Components/NavDate";
import FilmsGroup from "../Components/FilmsGroup";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function MainPage() {

  const today = new Date();
  const todayFullDate = new Date().toJSON().slice(0, -14);

  const [choosenDate, setChoosenDate] = useState(todayFullDate);


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
          <NavDate today={today} setChoosenDate={setChoosenDate}/>
        </div>

        <FilmsGroup choosenDate={choosenDate}/>
      </div>
    </div>
  );
}
