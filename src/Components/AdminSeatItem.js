import { useState } from "react";

export default function AdminSeatItem({ seat }) {
  const [selected, setSelected] = useState("");

  let classOfChair = "";

  if (seat.status === "standart") {
    classOfChair = "ordinary-chair-view";
  } else if (seat.status === "vip") {
    classOfChair = "vip-chair-view";
  } else if (seat.status === "disabled") {
    classOfChair = "locked-chair-view";
  }

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
      className={`${selected ? selected : classOfChair}`}
      onClick={() => handlerClickSeat(seat)}
    ></td>
  );
}
