import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>DeepStockNLP</h1>
            <Link style={linkSyle} to="/">Home</Link> | <Link style={linkSyle} to="/about">About</Link> | <Link style={linkSyle} to="/login">Login</Link> | <Link style={linkSyle} to="/signup">SignUp</Link>
        </header>
    )
}

const headerStyle = {
    background: '#33B1FF',
    textAlign: 'center',
    padding: '10px',
    color: '#fff'
}

const linkSyle = {
    color: '#fff',
    textDecoration: 'none'
}

export default Header;