import { Link, useLocation } from "react-router-dom";
import ClientLogo from "../Components/ClientLogo";

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

  const arrOfCost = [];

  arrOfActiveSeats.forEach((element) => {
    let itemCost = element.cost;
    arrOfCost.push(itemCost);
  });

  let totalCost = 0;
  arrOfCost.map((item) => (totalCost += item));

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
              <span className="film-description-title">{totalCost} </span>рублей
            </p>
          </div>

          <div className="link-btn-wrapper">
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
                seanceId,
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
