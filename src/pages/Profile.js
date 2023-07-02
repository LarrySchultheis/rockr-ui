import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ user_id: user.sub })
      };
      fetch('http://localhost:5000/getUserRole', requestOptions)
          .then(response => response.json())
          .then(data => {setUserRole(data.data[0].name)});
    }
  }, [user, isAuthenticated, isLoading])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Role: {userRole}</p>
      </div>
    )
  );
};

export default Profile;