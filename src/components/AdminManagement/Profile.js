import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import UserProfilePage from "../../pages/UserProfilePage";

const Profile = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userRole, setUserRole] = useState();
  const settings = props.settings;

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ user_id: user.sub })
      };
      fetch(`${settings.apiUrl}/get_user_role`, requestOptions)
          .then(response => response.json())
          .then(data => {setUserRole(data.data[0].name)});
    }
  }, [user, isAuthenticated, isLoading, settings.apiUrl])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
        <UserProfilePage userRole={userRole} user={user} settings={settings}/>
    )
  );
};

export default Profile;