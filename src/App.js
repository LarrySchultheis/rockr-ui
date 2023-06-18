import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Bands from "./components/Bands";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import LandingPage from './pages/LandingPage';
import AppFooter from './components/AppFooter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme';


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <head><link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      </head>
      <Router>
        <div>
          <ResponsiveAppBar></ResponsiveAppBar>
          <Routes>
            <Route path="/bands" element={<Bands />}/>
            <Route path="/" element={<LandingPage />}/>
          </Routes>
        </div>
      </Router>
      <AppFooter />
    </ThemeProvider>
  );
};

export default App;
