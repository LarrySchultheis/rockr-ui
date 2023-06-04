import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Register = () => {
  return (
    <div>
        <h1>
          <font color="red" size="24">Sign Up For Rockr!</font>
        </h1>
        <p></p>
        <label>Username:<input type="text" name="username" /></label>
        <label>E-Mail:<input type="text" name="email" /></label>
        <label>Location:<input type="text" name="location" /></label>
        <label>Password:<input type="text" name="password" /></label>
        <label>Confirm Password:<input type="text" name="password_confirm" /></label>
        <label>Musical Interests:<input type="text" name="music_interests" /></label>
        <label>Instruments Played:<input type="text" name="instruments_played" /></label>
        <input type="submit" value="Submit" />
    </div>
  );
};

export default Register;