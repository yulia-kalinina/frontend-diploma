import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const auth = localStorage.getItem("user");

  if (!auth) {
    alert("Введите логин и пароль");
    return <Navigate to="/login" />;
  }

  return children;
}
