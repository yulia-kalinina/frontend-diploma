import { Link } from "react-router-dom";

export default function AdminLogo() {
    return (
        <Link to="/login" >
          <p className="header-brand">
            Идем<span className="thin-brandname-part">в</span>кино
          </p>
          <p className="admin-header-brand_add">Администраторррская</p>
        </Link>
    );
}