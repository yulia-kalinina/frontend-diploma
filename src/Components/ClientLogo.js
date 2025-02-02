import { Link } from "react-router-dom";

export default function ClientLogo({ todayFullDate }) {
  const todayNumber = new Date().getDate();

  return (
    <Link to={`/date/${todayNumber}`}>
      <p className="header-brand">
        Идем<span className="thin-brandname-part">в</span>кино
      </p>
    </Link>
  );
}
