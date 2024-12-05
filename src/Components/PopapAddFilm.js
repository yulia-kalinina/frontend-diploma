import closeIcon from "../img/close.png";
import { useState } from "react";

export default function PopapAddFilm({
  isFilmPopap,
  setFilmPopap,
  setContent,
  setArrOfFilms
}) {
  const [form, setForm] = useState({
    film_name: "",
    film_duration: "",
    film_description: "",
    film_origin: "",
  });

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const checkFileSize = () => {
    let fileInput = document.getElementById("file");
    let file = fileInput.files[0];

    if (file.size > 3 * 1024 * 1024) {
      alert("Размер файла превышен, выберите файл меньше 3МБ.");
      return;
    }

    console.log(fileInput.files[0]);
  };

  const handlerFilmPopapCancel = () => {
    setForm({
      film_name: "",
      film_duration: "",
      film_description: "",
      film_origin: "",
    });

    let fileInput = document.getElementById("file");
    if (fileInput.files[0]) {
      fileInput.files[0] = "";
    }

    setContent("hall-manage-wrapper");
    setFilmPopap("popap-wrapper-none");
  };

  const handlerAddFilmFormSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();

    let fileInput = document.getElementById("file");
    if (!fileInput.files[0]) {
      alert("Выберите постер для фильма");
      return;
    }
    let file = fileInput.files[0];

    formData.set("filmName", form.film_name);
    formData.set("filmDuration", form.film_duration);
    formData.set("filmDescription", form.film_description);
    formData.set("filmOrigin", form.film_origin);
    formData.set("filePoster", file);

    fetch("https://shfe-diplom.neto-server.ru/film", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setArrOfFilms(data.result.films));

    setForm({
      film_name: "",
      film_duration: "",
      film_description: "",
      film_origin: "",
    });

    setContent("hall-manage-wrapper");
    setFilmPopap("popap-wrapper-none");
  };

  return (
    <div className={isFilmPopap}>
      <div className="popap">
        <div className="popap-header">
          <h1 className="drop-btn">Добавление фильма</h1>
          <img
            src={closeIcon}
            alt="Закрыть окно"
            className="popap-close-icon"
            onClick={handlerFilmPopapCancel}
          />
        </div>

        <form className="full-add-form" onSubmit={handlerAddFilmFormSubmit}>
          <div className="full-add-popap-content">
            <label htmlFor="popapFilmName" className="popap-subtitle">
              Название фильма
            </label>
            <input
              type="text"
              id="popapFilmName"
              className="popap-text-field"
              name="film_name"
              placeholder="Например, «Гражданин Кейн»"
              value={form.film_name}
              onChange={handleChangeForm}
              required
            />
          </div>

          <div className="full-add-popap-content">
            <label htmlFor="popapFilmDuration" className="popap-subtitle">
              Продолжительность фильма (мин.)
            </label>
            <input
              type="text"
              id="popapFilmDuration"
              className="popap-text-field"
              name="film_duration"
              value={form.film_duration}
              onChange={handleChangeForm}
              required
            />
          </div>

          <div>
            <label htmlFor="popapFilmDescription" className="popap-subtitle">
              Описание фильма
            </label>
            <textarea
              id="popapFilmDescription"
              className="popap-text-field popap-textarea"
              name="film_description"
              rows="3"
              value={form.film_description}
              onChange={handleChangeForm}
              required
            />
          </div>

          <div className="full-add-popap-content">
            <label htmlFor="popapFilmOrigin" className="popap-subtitle">
              Страна
            </label>
            <input
              type="text"
              id="popapFilmOrigin"
              className="popap-text-field"
              name="film_origin"
              value={form.film_origin}
              onChange={handleChangeForm}
              required
            />
          </div>

          <div className="popap-button-group full-popap-button-group">
            <button className="popap-button" type="submit">
              Добавить фильм
            </button>

            <button className="popap-button" type="button">
              <label htmlFor="file">Загрузить постер</label>
            </button>
            <input
              id="file"
              type="file"
              name="film_poster"
              className="popap-add-file-input"
              accept=".png"
              onChange={checkFileSize}
            ></input>

            <button
              type="button"
              className="popap-button popap-button-cancel"
              onClick={handlerFilmPopapCancel}
            >
              Отменить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
