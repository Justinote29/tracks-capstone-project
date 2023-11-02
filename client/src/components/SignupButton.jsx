import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";

const SignUpButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button
        onClick={() =>
          loginWithRedirect({
            authorizationParams: {
              screen_hint: "signup",
            },
          })
        }
      >
        Sign Up
      </Button>
    )
  );
};

export default SignUpButton;