import React, { useEffect } from "react";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SearchFilter from "./components/SearchFilter";
import Map from "./components/Map";
import Footer from "./components/Footer";
import "./App.css";
import axios from "axios";



function App() {
  
  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <SearchFilter />
        <div className="dashboard">
          <Map />
          <Dashboard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
