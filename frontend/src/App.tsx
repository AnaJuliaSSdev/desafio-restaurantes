import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage.tsx";
import { AuthenticateUserPage } from "./pages/Authenticate/AuthenticateUserPage.tsx";
import { RegisterUserPage } from "./pages/RegisterUserPage/RegisterUserPage.tsx";
import './lib/i18n.ts'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation.tsx";

export function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthenticateUserPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
      </Routes>
    </Router>
  );
}
