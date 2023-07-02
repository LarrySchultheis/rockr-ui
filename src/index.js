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
    domain="dev-6ary27eqnmjykel3.us.auth0.com"
    clientId="7ZGbKRlV9YDvZluAFKDrc5cdul5GINdN"
    authorizationParams={{
      redirect_uri: window.location.origin
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
