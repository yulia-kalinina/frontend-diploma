import { nanoid } from "nanoid";
import AdminSeatItem from "./AdminSeatItem.js";

export default function HallConfigLayout({ findConfig, rows, seats }) {
  for (let i = 0; i < rows; i++) {
    let newRow = [];

    for (let j = 0; j < seats; j++) {
      const place = {};
      place.id = nanoid();
      place.status = "disabled";
      newRow.push(place);
    }
    findConfig.push(newRow);
  }

  return (
    <>
      <h3 className="drop-subtitle">
        Теперь вы можете указать типы кресел на схеме зала:
      </h3>

      <div className="select-chair-container">
        <div className="chair-wrap">
          <div className="ordinary-chair-view"></div>
          <p className="chair-description"> — обычные кресла</p>
        </div>
        <div className="chair-wrap">
          <div className="vip-chair-view"></div>
          <p className="chair-description"> — VIP кресла</p>
        </div>
        <div className="chair-wrap">
          <div className="locked-chair-view"></div>
          <p className="chair-description"> — заблокированные (нет кресла)</p>
        </div>
      </div>
      <p className="chair-description">
        Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши
      </p>

      <div className="hall-table-container">
        <p className="hall-table-title">Экран</p>
        <table className="hall-table">
          <tbody>
            {findConfig.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((seat) => {
                    return <AdminSeatItem key={seat.id} seat={seat} />;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
