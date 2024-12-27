import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import "./css/admin.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainPage from "./Pages/MainPage";
import Seats from "./Pages/Seats";
import Reserve from "./Pages/Reserve";
import Ticket from "./Pages/Ticket";
import LoginPage from "./Pages/LoginPage";
import HallManage from "./Pages/HallManage";

import RequireAuth from "./Hoc/RequireAuth";

const todayNumber = new Date().getDate();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={`/${todayNumber}`} />} />
        <Route path="/:id" element={<MainPage />} />
        <Route path="/film" element={<Seats />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/manage"
          element={
            <RequireAuth>
              <HallManage />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
