import ClientLogo from "../Components/ClientLogo";
import NavDate from "../Components/NavDate";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function MainPage() {
  return (
    <div className="client-page-wrap">
      <div className="container">
        <div className="client-main-header">
          <div>
            <ClientLogo />
          </div>
          <div>
            <Link to="/login" className="contnent-btn">
              Войти
            </Link>
          </div>
        </div>

        <div className="navigation-wrap">
          <NavDate />
        </div>
      </div>
    </div>
  );
}
