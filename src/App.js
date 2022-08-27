import React from 'react';
import "./assets/styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AboutUs from './pages/AboutUs';
import ProductListing from "./pages/ProductListing";
import Home from "./pages/Home";
import Annoucement from './components/Announcement';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Annoucement />
        <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<AboutUs/>} />
            <Route path="/collection" element={<ProductListing/>} />
          </Routes>
          <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;