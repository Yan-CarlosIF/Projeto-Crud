import { Link } from "react-router-dom";
import "./navItem.css";

function NavItem(props: any) {
  return (
    <Link to={props.to} className="nav-item">
      <i className={`fa fa-${props.icon}`}></i> {props.content}
    </Link>
  );
}

export default NavItem;
