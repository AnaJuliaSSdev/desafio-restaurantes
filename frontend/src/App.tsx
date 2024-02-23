import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthenticateUserPage } from "./pages/AuthenticateUserPage";
import { RegisterUserPage } from "./pages/RegisterUserPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigation } from "./components/ui/Navigation";

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
