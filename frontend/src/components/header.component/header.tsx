import "./header.css";

interface HeaderProps {
  icon: string;
  title: string;
  subtitle: string;
}

function Header({ icon = "home", title, subtitle }: HeaderProps) {
  return (
    <header className="header d-none d-sm-flex flex-column">
      <h1 className="mt-3">
        <i className={`fa fa-${icon}`}></i> {title}
      </h1>
      <p className="lead text-muted">{subtitle}</p>
    </header>
  );
}

export default Header;
