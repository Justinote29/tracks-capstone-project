import { useAuth0 } from "@auth0/auth0-react";

//need to think about how we handle different cases, the user info is returned differently depending on the source, i.c. google, facebook or something creating a new account with us.

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    



    
  //we check to see if the user is not authenticated to show the sign in button
  return (
    isAuthenticated && (
      <article className="article">
        {/* {JSON.stringify(user)} */}
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        {/* //mapping over the user info and using Object.keys to map over it (since
        it's an object) */}
        <ul>
          {Object.keys(user).map((objKey, index) => (
            <li key={index}>
              {objKey}: {user[objKey]}{" "}
            </li>
          ))}
        </ul>
      </article>
    )
  );
};

export default Profile;
