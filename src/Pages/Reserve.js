import { Link, useLocation } from "react-router-dom";
import ClientLogo from "../Components/ClientLogo";
import { useState } from "react";

export default function Reserve() {
  const location = useLocation();
  const {
    arrOfActiveSeats,
    hallName,
    filmName,
    seanceTime,
    currentDate,
    seanceId,
  } = location.state;

  const [arrOfTickets, setArrOfTickets] = useState([]);
  const ticketSeats = [];

  const arrOfCost = [];

  arrOfActiveSeats.forEach((element) => {
    let itemCost = element.cost;
    arrOfCost.push(itemCost);
  });

  let totalCost = 0;
  arrOfCost.map((item) => (totalCost += item));

  arrOfActiveSeats.forEach((element) => {
    let newSeat = {};
    newSeat.row = element.row_number;
    newSeat.place = element.place_number;
    newSeat.coast = element.cost;

    ticketSeats.push(newSeat);
  });

  const handleReserveTicket = (e) => {
    let formData = new FormData();
    formData.append("seanceId", seanceId);
    formData.append("ticketDate", currentDate);
    formData.append("tickets", JSON.stringify(ticketSeats));

    fetch(`https://shfe-diplom.neto-server.ru/ticket`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setArrOfTickets(data.result);
        } else {
          alert("Выбранные места уже забронированы");
        }
      });
  };

  return (
    <div className="client-page-wrap">
      <div className="container">
        <div className="client-main-header">
          <div>
            <ClientLogo />
          </div>
        </div>
        <div className="film-container ticket-block-header">
          <h1 className="ticket-block-title">Вы выбрали билеты:</h1>
        </div>
        <div className=" ticket-block-content">
          <div className="ticket-block-main">
            <p>
              На фильм:{" "}
              <span className="film-description-title">{filmName}</span>
            </p>
            <p>
              Места:{" "}
              <span className="film-description-title places-list">
                {arrOfActiveSeats.map((el) => {
                  return <span key={el.id}>{el.place_number}</span>;
                })}
              </span>
            </p>
            <p>
              В зале: <span className="film-description-title">{hallName}</span>
            </p>
            <p>
              Начало сеанса:{" "}
              <span className="film-description-title">{seanceTime}</span>
            </p>
            <p>
              Стоимость:{" "}
              <span className="film-description-title">{totalCost}</span> рублей
            </p>
          </div>

          <div className="link-btn-wrapper" onClick={handleReserveTicket}>
            <Link
              to="/ticket"
              className="contnent-btn main-content-btn"
              state={{
                hallName,
                filmName,
                seanceTime,
                currentDate,
                totalCost,
                arrOfActiveSeats,
                arrOfTickets,
              }}
            >
              Получить код бронирования
            </Link>
          </div>

          <div className="ticket-block-footer">
            <p>
              После оплаты билет будет доступен в этом окне, а также придёт вам
              на почту. Покажите QR-код нашему контроллёру у входа в зал.
            </p>
            <p>Приятного просмотра!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
