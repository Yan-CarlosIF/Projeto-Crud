import "./logo.css";
import LogoYan from "../../assets/imgs/Design sem nome.jpg";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <aside className="logo">
      <Link to="/" className="logo">
        <img src={LogoYan} alt="" />
      </Link>
    </aside>
  );
}

export default Logo;
