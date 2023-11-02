import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import "../styles/LogoutButton.css"

//if user is authenticated, they can see the logout button
const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return isAuthenticated && <Button onClick={() => logout()} className="logoutButton">Sign Out</Button>;
};

export default LogoutButton;
