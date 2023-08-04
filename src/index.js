import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);
root.render(
  <Auth0Provider
    domain="rockr.us.auth0.com"
    clientId="zqY5NsRkix1yPQ6hzPvJ4ioOyRtoN9oN"
    authorizationParams={{
      redirect_uri: `${window.location.origin}/user_profile`
    }}
    useRefreshTokens={ true }
    cacheLocation="localstorage"
  >
    <App />
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
