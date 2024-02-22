import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "react-bootstrap";

export function Navigation() {
  const {accessToken, updateAccessToken} = useAuth();

  const logout = () => {
    updateAccessToken(null);
  };

  return (
    <nav className="p-4">
      <Link to="/">Home</Link> |
      {accessToken ? <Button variant="link" className="p-0" onClick={logout}>Sair</Button> : <Link to="/login">Entrar</Link>}
    </nav>
  );
}

