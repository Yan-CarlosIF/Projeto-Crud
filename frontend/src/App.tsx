import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Logo from "./components/logo.component/logo";
import Nav from "./components/nav.component/nav";
import Footer from "./components/footer.component/footer";
import Home from "./components/main.component/home.component/home";
import UserRegister from "./components/main.component/user.components/useregister";


function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Logo />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<UserRegister />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
