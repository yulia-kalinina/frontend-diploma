import { useLocation } from "react-router-dom";
import QRCode from "react-qr-code";
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
  } = location.state;

  const seatsInfo = [];

  arrOfActiveSeats.forEach((element) => {
    let newSeat =
      "ряд:" +
      " " +
      element.row_number +
      ", " +
      "место:" +
      " " +
      element.place_number;
    seatsInfo.push(newSeat);
  });

  const seatsInfoString = seatsInfo.join("; ");

  let qrValue = `Дата: ${currentDate}, Время: ${seanceTime}, Название фильма: ${filmName}, Зал: ${hallName},  Места: ${seatsInfoString}, Стоимость: ${totalCost} руб, Билет действителен строго на свой сеанс`;

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
