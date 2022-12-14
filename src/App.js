import React from "react";
import "./assets/styles/app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Login from './pages/Login'
import Register from './pages/Register'
import UserProvider from "./providers/UserProvider";

import ProductListing from "./pages/ProductListing";
import Home from "./pages/Home";
import Annoucement from "./components/Announcement";

function App() {
  return (
    <React.Fragment>
      <UserProvider>
      <Router>
        <Annoucement />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/collection" element={<ProductListing />} />
        </Routes>
        <Footer />
      </Router>
      </UserProvider>
    </React.Fragment>
  );
}

export default App;
