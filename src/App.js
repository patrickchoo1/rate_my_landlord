import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './Home';
import LandlordPage from './components/LandlordPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/landlord/:id" element={<LandlordPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
