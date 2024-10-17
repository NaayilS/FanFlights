import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Fan Flights</h1>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </header>
    );
}

export default Header;
