import "./main.css";
import React from "react";
import Header from "../header.component/header";

function Main(props: any) {
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
