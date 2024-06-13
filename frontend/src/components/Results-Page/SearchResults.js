import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchResults.css';
import ResultBox from './ResultBox.js'
import Header from '../Header/Header.js'


function SearchResults () {
    return (
        <div>
            <Header />
            <div className = 'label'>
                Search Results
            </div>
            <div className = 'total'>
                < ResultBox/>
            </div>
        </div>
    );
}

export default SearchResults