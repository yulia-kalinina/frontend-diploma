import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import ClientLogo from "../Components/ClientLogo";

export default function Ticket() {
  const location = useLocation();
  const {
    filmName,
    hallName,
    seanceTime,
    currentDate,
    totalCost,
    arrOfActiveSeats,
    seanceId,
  } = location.state;

  const [arrOfTickets, setArrOfTickets] = useState([]);
  const ticketSeats = [];

  arrOfActiveSeats.forEach((element) => {
    let newSeat = {};
    newSeat.row = element.row_number;
    newSeat.place = element.place_number;
    newSeat.coast = element.cost;

    ticketSeats.push(newSeat);
  });

  let formData = new FormData();
  formData.append("seanceId", seanceId);
  formData.append("ticketDate", currentDate);
  formData.append("tickets", JSON.stringify(ticketSeats));

  useEffect(() => {
    fetch(`https://shfe-diplom.neto-server.ru/ticket`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setArrOfTickets(data.result));
  }, []);

  const seatsInfo = [];

  arrOfTickets.forEach((element) => {
    let newSeat =
      "ряд:" +
      " " +
      element.ticket_row +
      ", " +
      "место:" +
      " " +
      element.ticket_place;
    seatsInfo.push(newSeat);
  });

  const seatsInfoString = seatsInfo.join("; ");

  let qrValue = `Дата: ${currentDate}, Время: ${seanceTime}, Название фильма: ${filmName}, Зал: ${hallName}, Места: ${seatsInfoString}, Стоимость: ${totalCost} руб, Билет действителен строго на свой сеанс`;

  return (
    <div className="client-page-wrap">
      <div className="container">
        <div className="client-main-header">
          <div>
            <ClientLogo />
          </div>
        </div>
        <div className="film-container ticket-block-header">
          <h1 className="ticket-block-title">Электронный билет</h1>
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
          </div>

          <div className="qr-container">
            <QRCode className="qr-code" value={qrValue} />
          </div>

          <div className="ticket-block-footer">
            <p>
              Покажите QR-код нашему контроллеру для подтверждения бронирования.
            </p>
            <p>Приятного просмотра!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
