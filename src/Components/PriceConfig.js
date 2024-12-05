import icon from "../img/dropdown.png";
import { useState } from "react";
import HallInput from "./HallInput";

export default function PriceConfig({ halls }) {
  const [isActive, setActive] = useState(true);
  const [activeHallId, setActiveHallId] = useState("");

  const [form, setForm] = useState([
    {
      hall_price_standart: "",
      hall_price_vip: "",
    },
  ]);

  const handlerClick = () => {
    setActive(!isActive);
  };

  const handlerCancel = () => {
    const findActiveHall = document.querySelector(".hall-item-active");
    if (findActiveHall) {
      findActiveHall.classList.remove("hall-item-active");
      setActiveHallId("");
    }

    setForm({
      hall_price_standart: "",
      hall_price_vip: "",
    });
  };

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handlerAddPriceFormSubmit = (evt) => {
    evt.preventDefault();

    if (!activeHallId) {
      alert("Выберите зал для конфигурации цен");
      return;
    }

    const formData = new FormData();
    formData.set("priceStandart", form.hall_price_standart);
    formData.set("priceVip", form.hall_price_vip);
    fetch(`https://shfe-diplom.neto-server.ru/price/${activeHallId}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    handlerCancel();
    alert("Конфигурация выполнена успешно!");
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handlerClick}>
        <button className="drop-btn">Конфигурация цен</button>
        <img src={icon} alt="Нажми на меня" className="drop-icon" />
      </div>
      <div
        className={isActive ? "dropdown-content" : "dropdown-content-active"}
      >
        <form onSubmit={handlerAddPriceFormSubmit}>
          <h3 className="drop-subtitle">Выберите зал для конфигурации:</h3>
          <div className="drop-content-block">
            {halls.map((hall) => {
              return (
                <HallInput
                  hall={hall}
                  key={hall.id}
                  activeHallId={activeHallId}
                  setActiveHallId={setActiveHallId}
                />
              );
            })}
          </div>

          <h3 className="drop-subtitle">Установите цены для типов кресел:</h3>
          <div className="price-config-wrap">
            <div>
              <label htmlFor="ordinary" className="drop-label">
                Цена, рублей
              </label>
              <input
                type="text"
                id="ordinary"
                className="drop-input"
                placeholder="0"
                name="hall_price_standart"
                value={form.hall_price_standart}
                onChange={handleChangeForm}
                required
              />
            </div>

            <div className="chair-wrap">
              <p className="chair-description chair-description-space">за</p>
              <div className="ordinary-chair-view"></div>
              <p className="chair-description">обычные кресла</p>
            </div>
          </div>

          <div className="price-config-wrap">
            <div>
              <label htmlFor="vip" className="drop-label">
                Цена, рублей
              </label>
              <input
                type="text"
                id="vip"
                className="drop-input"
                placeholder="0"
                name="hall_price_vip"
                value={form.hall_price_vip}
                onChange={handleChangeForm}
                required
              />
            </div>

            <div className="chair-wrap">
              <p className="chair-description chair-description-space">за</p>
              <div className="vip-chair-view"></div>
              <p className="chair-description">VIP кресла</p>
            </div>
          </div>

          <div className="popap-button-group full-popap-button-group">
            <button
              className="popap-button popap-button-cancel"
              onClick={handlerCancel}
              type="button"
            >
              Отмена
            </button>
            <button className="popap-button" type="submit">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}