import logo from './logo.svg';
import LoginButton from './LoginButton';
import './App.css';
import LogoutButton from './LogoutButton';
import RegisterButton from './RegisterButton';
import ReactDOM from 'react-dom';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
import Register from './/Register';


function App() {    
  /*Making a variable to test the authentication*/
  var Authyesno = "Yes"
  var Authname = ""
  /*Variable to hold the page names*/
  var homepage = (
    <div className="App">
      <header className="App-header">
        <img src="/Rockr_Logo_Start.png" />
        <h1>
          <font color="red" size="24">Connect With Other Musicians!</font>
        </h1>
        <p>{Authyesno}</p>
        <p></p>
        <p></p>
        <LoginButton/>
        <RegisterButton/>
      </header>
    </div>
  );

  //Conditional Logic for the pages.
  /*when the user has logged in*/
  if (useAuth0().isAuthenticated == true) {
    Authyesno = "Yes";
    homepage = (
      <div className="App">
        <header className="App-header">
          <img src="/Rockr_Logo_Start.png" />
          <h1>
            <font color="red" size="24">Welcome Back!</font>
          </h1>
          <p></p>
          <p></p>
          <p></p>
          <LogoutButton/>
        </header>
      </div>
    );
  }
  /*when the user has logged out*/
  else {
    Authyesno = "No"
    Authname = useAuth0.
    homepage = (
      <div className="App">
        <header className="App-header">
          <img src="/Rockr_Logo_Start.png" />
          <h1>
            <font color="red" size="24">Connect With Other Musicians!</font>
          </h1>
          <p></p>
          <p></p>
          <p></p>
          <LoginButton/>
          <RegisterButton/>
        </header>
      </div>
    );
  }

  return homepage;
}

export default App;
