import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className= "header">
            <h1>RateMyLandlord</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/landlord/1">Landlord Page</Link>
                </nav>
                </header>
    );
}

export default Header;
