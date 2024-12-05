import closeIcon from "../img/close.png";

export default function PopapDeleteTimeline({
  isTimelineDeletePopap,
  setTimelineDeletePopap,
  setContent,
  filmNameToDeleteSeance,
  seanceIdToDeleteSeance,
  setArrOfTimeline,
}) {
  const handlerCancel = () => {
    setTimelineDeletePopap("popap-wrapper-none");
    setContent("hall-manage-wrapper");
  };

  const handlerDeleteSeanceSubmit = (e) => {
    e.preventDefault();

    fetch(
      `https://shfe-diplom.neto-server.ru/seance/${seanceIdToDeleteSeance}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => setArrOfTimeline(data.result.seances));

    handlerCancel();
  };

  return (
    <div className={isTimelineDeletePopap}>
      <div className="popap">
        <div className="popap-header">
          <h1 className="drop-btn">Удаление сеанса</h1>
          <img
            src={closeIcon}
            alt="Закрыть окно"
            className="popap-close-icon"
            onClick={handlerCancel}
          />
        </div>

        <div className="popap-content">
          <h2 className="delete-seance-popap-title">
            Вы действительно хотите снять с сеанса фильм{" "}
            <span className="delete-seanse-popap-bold-filmname">
              "{filmNameToDeleteSeance}"
            </span>
            {" ?"}
          </h2>
        </div>

        <div className="popap-button-group">
          <button
            className="popap-button"
            type="submit"
            onClick={handlerDeleteSeanceSubmit}
          >
            Удалить
          </button>
          <button
            type="button"
            className="popap-button popap-button-cancel"
            onClick={handlerCancel}
          >
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}
