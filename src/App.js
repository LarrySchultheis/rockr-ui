import logo from './logo.svg';
import LoginButton from './components/LoginButton';
import './App.css';
import LogoutButton from './components/LogoutButton';
import Profile from './components/Profile';


function App() {  
  return (
    <div className="App">
      <header className="App-header">
      <LoginButton/>
      <LogoutButton/>
      <Profile></Profile>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
