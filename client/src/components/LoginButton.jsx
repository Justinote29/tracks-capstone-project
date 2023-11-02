import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import "../styles/LoginButton.css"

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  //we check to see if the user is not authenticated to show the sign in button
  return (
    !isAuthenticated && (
      <Button onClick={() => loginWithRedirect()} className="loginButton">Sign In</Button>
    )
  );
};

export default LoginButton;
