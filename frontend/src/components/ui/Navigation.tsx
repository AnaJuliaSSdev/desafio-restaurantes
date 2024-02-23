import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export function Navigation() {
  const { t } = useTranslation();
  const {accessToken, updateAccessToken} = useAuth();

  const logout = () => {
    updateAccessToken(null);
  };

  return (
    <nav className="p-4">
      <Link to="/">{t('home.homePage')}</Link> |
      {accessToken ? <Button variant="link" className="p-0" onClick={logout}>{t('home.exit')}</Button> : <Link to="/login">{t('home.login')}</Link>} | 
      {accessToken ? null : <Link to="/register">{t('home.register')}</Link>}
    </nav>
  );
}

