import { useState } from "react";

export default function AdminSeatItem({ seat }) {
  const [selected, setSelected] = useState("");

  const classOfChair = {
    standart: "ordinary-chair-view",
    vip: "vip-chair-view",
    disabled: "locked-chair-view",
  };

  const handlerClickSeat = (seat) => {
    if (seat.status === "standart") {
      seat.status = "vip";
      setSelected("vip-chair-view");
    } else if (seat.status === "vip") {
      seat.status = "disabled";
      setSelected("locked-chair-view");
    } else if (seat.status === "disabled") {
      seat.status = "standart";
      setSelected("ordinary-chair-view");
    }
  };

  return (
    <td
      id={seat.id}
      className={`${selected ? selected : classOfChair[seat.status]}`}
      onClick={() => handlerClickSeat(seat)}
    ></td>
  );
}
