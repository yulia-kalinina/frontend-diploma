import { useState } from "react";
import NavDateItem from "../Components/NavDateItem"
import FilmsGroup from "./FilmsGroup";
import { Routes, Route } from "react-router-dom";

export default function NavDate() {

  const today = new Date();
  const todayFullDate = new Date().toJSON().slice(0, -14);

  const [choosenDate, setChoosenDate] = useState(todayFullDate);

  let arrOfDates = [];

  for (let i = 0; i < 60; i++) {
    const newDay = {};
    newDay.date = today.getDate();
    newDay.weekDayName = "";
    newDay.full_date = today.toJSON().slice(0, -14);

    let weekDayNumber = today.getDay();
    if (weekDayNumber === 0) {
      newDay.weekDayName = "Вс";
    } else if (weekDayNumber === 1) {
      newDay.weekDayName = "Пн";
    } else if (weekDayNumber === 2) {
      newDay.weekDayName = "Вт";
    } else if (weekDayNumber === 3) {
      newDay.weekDayName = "Ср";
    } else if (weekDayNumber === 4) {
      newDay.weekDayName = "Чт";
    } else if (weekDayNumber === 5) {
      newDay.weekDayName = "Пт";
    } else if (weekDayNumber === 6) {
      newDay.weekDayName = "Сб";
    }

    arrOfDates.push(newDay);
    today.setDate(today.getDate() + 1);
  }

  const [finalDaysArr, setfinalDaysArr] = useState(arrOfDates.slice(0, 6));

  const [count, setCount] = useState(6);

  const handleChangeDaysList = () => {
    setfinalDaysArr(arrOfDates.slice(count, count + 6));
    setCount(count + 6);
  };


  return (
    <>
      <nav className="date-nav">
        <div className="date-nav-list">
          {finalDaysArr.map((day, index) => {
            return <NavDateItem day={day} key={index} setChoosenDate={setChoosenDate}/>;
          })}
          <div
            className="date-item date-next-list-item"
            onClick={handleChangeDaysList}
          >
            <span className="">&gt;</span>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/:date" element={<FilmsGroup choosenDate={choosenDate}/>}/>
      </Routes>

    </>
  );
}
