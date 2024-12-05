import { useNavigate } from "react-router-dom";
import AdminLogo from "../Components/AdminLogo";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeForm = ({ target }) => {
    const { name, value } = target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const goToManagePage = () => navigate("/manage", { replace: true });

  const handlerLogIn = (e) => {
    e.preventDefault();
    const email = form.email;
    const password = form.password;

    let formData = new FormData();
    formData.append("login", email);
    formData.append("password", password);

    fetch(`https://shfe-diplom.neto-server.ru/login`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          localStorage.setItem("user", formData.get("login"));
        }
      });

    setForm({
      email: "",
      password: "",
    });

    goToManagePage();
  };

  return (
    <div className="admin-page-wrap">
      <div className="container">
        <div className="admin-main-header">
          <div>
            <AdminLogo />
          </div>
        </div>
        <div className="login-box-wrapper">
          <form className="login-box" onSubmit={handlerLogIn}>
            <div className="login-box-title">Авторизация</div>

            <div className="login-box-input-wrapper">
              <div className="login-box-input">
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  onChange={handleChangeForm}
                  value={form.email}
                  required
                  placeholder="eexample@domain.xyzmail"
                />
              </div>

              <div className="login-box-input">
                <label htmlFor="password">Пароль</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChangeForm}
                  value={form.password}
                  required
                />
              </div>
            </div>

            <button type="submit" className="admin-content-btn">
              Авторизоваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
