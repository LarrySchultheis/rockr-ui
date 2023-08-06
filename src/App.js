// REFERENCES:
//  * https://clipart-library.com/

import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import LandingPage from './pages/LandingPage';
import AppFooter from './components/AppFooter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme';
import AdminManagement from './components/AdminManagement';
import Profile from "./components/Profile"
import UserProfilePage from './pages/UserProfilePage';
import { useAuth0 } from '@auth0/auth0-react';
import { Socket } from './components/ChatService/Socket';
import ChatPage from './components/ChatService/ChatPage';
import MatchPage from './pages/MatchPage';
import axios from 'axios';
const settings = require("./settings.json");

const axiosInstance = axios.create({
  baseURL: settings.apiUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

export default function App () {
  const {isAuthenticated, isLoading, user, logout} = useAuth0();
  const [userRole, setUserRole] = useState();
  const [dbUser, setDbUser] = useState();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // start session on BE
      axiosInstance.get('/login', {
        params: {
          email: user?.email
        }})
        .then(response => {
          setDbUser(response?.data?.data)
        })
        .catch(function(error) {
          logout({
            returnTo: window.location.origin,
          });
          console.log(error);
        });

      axiosInstance.get('/get_user_role', {
        params: {
          id: user.sub,
        }
        }).then(response => {
          setUserRole(response?.data["role"][0]);
        })
        .catch(function(error) {
          console.log(error);
        });

      }
  }, [user, isAuthenticated, isLoading, logout])


  return (
    <ThemeProvider theme={theme}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Router>
        <div>
          <ResponsiveAppBar user={user} role={userRole}></ResponsiveAppBar>
          <Routes>
            <Route path="/register" element={<Profile />}/>
            <Route path="/" element={<LandingPage />}/>
            {
              userRole && userRole.name === 'Admin' &&
              <Route path="/admin_management" Component={() => <AdminManagement user={user} axiosInstance={axiosInstance}/>} />
            }
            <Route path="/user_profile" element={<UserProfilePage user={dbUser} axiosInstance={axiosInstance} settings={settings}/>}/>
            <Route path="/messages" element={<ChatPage socket={Socket} user={user} dbUser={dbUser} axiosInstance={axiosInstance}/>}/>
            <Route path="/matches" element={<MatchPage user={dbUser} axiosInstance={axiosInstance} />}/>
          </Routes>
        </div>
      </Router>
      <AppFooter />
    </ThemeProvider>
  );
};