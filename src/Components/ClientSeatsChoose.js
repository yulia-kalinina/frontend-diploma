import screen from "../img/screen.png";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";

export default function ClientSeatsChoose({
  hallConfigArr,
  hall,
  filmName,
  seanceTime,
  currentDate,
  seanceId,
}) {
  let hallName = hall.hall_name;
  let standartCost = hall.hall_price_standart;
  let vipCost = hall.hall_price_vip;

  const newArr = [];

  for (let i = 0; i < hallConfigArr.length; i++) {
    let newRow = [];

    for (let j = 0; j < hallConfigArr[i].length; j++) {
      let place = {};
      place.id = nanoid();
      place.status = hallConfigArr[i][j];
      place.place_number = j + 1;
      place.row_number = i + 1;
      place.cost = "";
      newRow.push(place);
    }
    newArr.push(newRow);
  }

  let arrOfChoosenTag = [];
  let arrOfActiveSeats = [];

  function findActivePlaces() {
    arrOfChoosenTag = Array.from(
      document.querySelectorAll("td.client-chosen-chair-view")
    );

    arrOfActiveSeats.length = 0;

    arrOfChoosenTag.forEach((element) => {
      let item = element.id;

      let costValue = "testValue";

      if (element.classList.contains("free-seat")) {
        costValue = standartCost;
      } else if (element.classList.contains("vip-seat")) {
        costValue = vipCost;
      }

      newArr.forEach((arr) => {
        let findSeat = arr.find((el) => el.id === item);
        if (findSeat) {
          findSeat.cost = costValue;
          arrOfActiveSeats.push(findSeat);
        }
      });
    });
  }

  const handlerSeatClick = (seat) => {
    let elem = document.getElementById(seat.id);
    elem.classList.toggle("client-chosen-chair-view");

    findActivePlaces();
  };

  const handleIsSeatChoosen = (e) => {
    if (arrOfActiveSeats.length === 0) {
      alert("Выберите места");
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="choose-seat-container">
        <div className="client-hall-table-container">
          <img src={screen} alt="Экран в кинозале" className="hall-screen" />
          <table className="client-hall-table">
            <tbody>
              {newArr.map((item, index) => {
                return (
                  <tr key={index}>
                    {item.map((seat) => {
                      return (
                        <td
                          key={seat.id}
                          id={seat.id}
                          className={
                            seat.status === "standart"
                              ? "client-table-seat free-seat"
                              : seat.status === "vip"
                              ? "client-table-seat vip-seat"
                              : seat.status === "taken"
                              ? "client-table-seat taken-seat seat-not-click"
                              : seat.status === "disabled"
                              ? "client-table-seat disabled-seat seat-not-click"
                              : ""
                          }
                          onClick={() => handlerSeatClick(seat)}
                        ></td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="client-select-chair-container">
          <div className="client-chair-wrap">
            <div className="client-chair client-standart-chair-view"></div>
            <p className="client-chair-description">
              Свободно ({hall.hall_price_standart}руб)
            </p>
          </div>
          <div className="client-chair-wrap">
            <div className="client-chair client-taken-chair-view"></div>
            <p className="client-chair-description">Занято</p>
          </div>
          <div className="client-chair-wrap">
            <div className="client-chair client-VIP-chair-view"></div>
            <p className="client-chair-description">
              Свободно VIP ({hall.hall_price_vip}руб)
            </p>
          </div>
          <div className="client-chair-wrap">
            <div className="client-chair client-chosen-chair-view"></div>
            <p className="client-chair-description">Выбрано</p>
          </div>
        </div>
      </div>

      <div className="link-btn-wrapper">
        <Link
          to="/reserve"
          className="contnent-btn main-content-btn"
          onClick={handleIsSeatChoosen}
          state={{
            arrOfActiveSeats,
            hallName,
            filmName,
            seanceTime,
            currentDate,
            seanceId,
          }}
        >
          Забронировать
        </Link>
      </div>
    </>
  );
}
