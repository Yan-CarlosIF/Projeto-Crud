import { Link } from "react-router-dom";
import "./navItem.css";

interface NavItemProps {
  icon: string;
  content: string;
  to: string;
}

function NavItem(props: NavItemProps) {
  return (
    <Link to={props.to} className="nav-item">
      <i className={`fa fa-${props.icon}`}></i> {props.content}
    </Link>
  );
}

export default NavItem;
