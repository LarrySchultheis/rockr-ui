import logo from './logo.svg';
import LoginButton from './LoginButton';
import './App.css';
import LogoutButton from './LogoutButton';
import RegisterButton from './RegisterButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';


function App() {    
  return (
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
        <LogoutButton/>
      </header>
    </div>
  );
}

export default App;
