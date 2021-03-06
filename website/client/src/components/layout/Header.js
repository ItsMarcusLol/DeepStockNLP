import { FormatSize } from '@material-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Deep Stock NLP</h1>
            <Link style={linkSyle} to="/">Home</Link> | <Link style={linkSyle} to="/about">About</Link> | <Link style={linkSyle} to="/login">Login</Link> | <Link style={linkSyle} to="/signup">SignUp</Link>
        </header>
    )
}

const headerStyle = {
    background: '#8ED1FC',
    textAlign: 'center',
    padding: '10px',
    color: '#fff',
    fontSize: '19px'
}

const linkSyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize:'18px'
}

export default Header;