import { NavLink, Routes, Route } from "react-router-dom";
import FilmsGroup from "./FilmsGroup";

export default function NavDateItem({ day, setChoosenDate }) {
  const selected = ({ isActive }) =>
    isActive ? "date-item date-item-selected" : "date-item";

  const today = new Date();

  let addDateData;

  if (day.date === today.getDate()) {
    addDateData = (
      <div className="nav-today-day">
        <div className="nav-today-date">Сегодня</div>
        <div className="nav-today-wrap">
          <p>{day.weekDayName},</p>
          <p className="nav-today-day-date">{day.date}</p>
        </div>
      </div>
    );
  } else {
    addDateData = (
      <div className="nav-ordinary-day">
        <p>{day.weekDayName},</p>
        <p>{day.date}</p>
      </div>
    );
  }

  const handlerDateClick = () => {
    setChoosenDate(day);
  };

  return (
    <>
      <NavLink
        to={`/${day.date}`}
        className={selected}
        state={{ day }}
        onClick={handlerDateClick}
      >
        <span
          className={
            day.weekDayName === "Сб" || day.weekDayName === "Вс"
              ? "date-item-weekend"
              : ""
          }
        >
          {addDateData}
        </span>
      </NavLink>
    </>
  );
}
