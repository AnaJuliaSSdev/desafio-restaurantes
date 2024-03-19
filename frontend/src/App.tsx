import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home/HomePage.tsx";
import { AuthenticateUserPage } from "./pages/Authenticate/AuthenticateUserPage.tsx";
import { RegisterUserPage } from "./pages/RegisterUserPage/RegisterUserPage.tsx";
import "./lib/i18n.ts";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation.tsx";
import { RegisterRestaurantPage } from "./pages/RegisterRestaurantPage/RegisterRestaurantPage.tsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.tsx";
import Voting from "./pages/Voting/Voting.tsx";

export function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/login" element={<AuthenticateUserPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<HomePage />} />
          <Route path="restaurant">
            <Route path="register" element={<RegisterRestaurantPage />} />
          </Route>
          <Route path="votings">
            <Route path="list" element={<Voting />}></Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
