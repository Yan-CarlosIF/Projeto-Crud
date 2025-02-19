import "./main.css";
import React from "react";
import Header from "../header.component/header";

interface HeaderProps {
  icon: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

function Main(props: HeaderProps) {
  return (
    <React.Fragment>
      <Header {...props} />
      <main className="content">
        <div>
          <p className="p-3 mt-3">{props.children}</p>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Main;
