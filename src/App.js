import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/Home/HomePage';
import LandlordPage from './components/LandLord-Info/LandlordPage';
import SearchResults from './components/Results-Page/SearchResults';
import RatePage from './components/Rate-Page/RatePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search-results/:id" element={<SearchResults />} />
            <Route path="/landlord-page/:id" element={<LandlordPage />} />
            <Route path="/landlord-rating/:id" element={<RatePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;