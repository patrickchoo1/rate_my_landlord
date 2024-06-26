import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate('/searchresults/${searchQuery}');
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <Link to="/" className="logo" />
            </div>
            <form className="header-search" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Landlord name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} />
            </form>
        </header>
    );
}

export default Header;
