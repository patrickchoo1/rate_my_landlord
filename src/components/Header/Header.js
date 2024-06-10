import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/landlord/${searchQuery}`);
        }
    };

    return (
        <header className="header">
            <div className="header-left">
                <div className="logo"></div>
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
