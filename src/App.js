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
import ChatManager from './components/ChatService/ChatManager';
import { Socket } from './components/ChatService/Socket';
import ChatPage from './components/ChatService/ChatPage';

export default function App () {
  const {isAuthenticated, isLoading, user} = useAuth0();
  const [userRole, setUserRole] = useState();
  const [dbUser, setDbUser] = useState();
  // const [isAuthenticated, setIsAuthenticated] = useState();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const requestOptions = {
        method: 'GET',
      };
      fetch(`http://localhost:5000/get_user_role?id=${user.sub}&email=${user.email}`, requestOptions)
          .then(response => response.json())
          .then(data => setUserRole(data.role[0]));
    }
  }, [user, isAuthenticated, isLoading])

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const requestOptions = {
        method: 'GET',
      };
      fetch(`http://localhost:5000/user?email=${user.email}`, requestOptions)
          .then(response => response.json())
          .then(data => setDbUser(data.data[0]));
    }
  }, [user, isAuthenticated, isLoading])

  return (
    <ThemeProvider theme={theme}>
      <head><link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      </head>
      <Router>
        <div>
          <ResponsiveAppBar user={user} role={userRole}></ResponsiveAppBar>
          <Routes>
            <Route path="/register" element={<Profile />}/>
            <Route path="/" element={<LandingPage />}/>
            {
              userRole && userRole.name === 'Admin' &&
              <Route path="/admin_management" Component={() => <AdminManagement user={user}/>} />
            }
            <Route path="/user_profile" element={<UserProfilePage user={dbUser}/>}/>
            <Route path="/messages" element={<ChatPage socket={Socket} user={user} dbUser={dbUser}/>}/>

          </Routes>
        </div>
      </Router>
      <AppFooter />
    </ThemeProvider>
  );
};