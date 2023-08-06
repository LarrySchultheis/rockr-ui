import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

const settings = require("./settings.json");
const auth0 = settings.environment === "production" ? settings.auth0_prod : settings.auth0_dev;
const domNode = document.getElementById('root');
const root = ReactDOM.createRoot(domNode);
root.render(
  <Auth0Provider
    domain={auth0.domain}
    clientId={auth0.client_id}
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
