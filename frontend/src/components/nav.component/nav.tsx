import NavItem from "./navItem.component/navItem";
import "./nav.css";

function Nav() {
  return (
    <aside className="menu-area">
      <nav className="menu">
        <NavItem icon="home" content="Início"  to="/"/>
        <NavItem icon="users" content="Cadastro" to="/register" />
      </nav>
    </aside>
  );
}

export default Nav;
