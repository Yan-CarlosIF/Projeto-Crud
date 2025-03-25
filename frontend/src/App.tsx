import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Logo from "./components/logo.component/logo";
import Nav from "./components/nav.component/nav";
import Footer from "./components/footer.component/footer";
import Home from "./pages/home.component/home";
import UserRegister from "./pages/user-register.component/user-register";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Logo />
        <Nav />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<UserRegister />} />
          </Routes>
        </QueryClientProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
