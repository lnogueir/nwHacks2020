import React from 'react'
import LOGO from '../../assets/images/logo.png';
import { Link } from 'react-router-dom'

function LoggedIn(props) {
    return (
        <header className="navbar">
            <Link to={'/'}>
                <div className="navbar-logo">
                    <img alt="Logo" src={LOGO} />
                    <span className="logo-text">weNote</span>
                </div>
            </Link>
            <div className="navbar-buttons">
                <button className="navbar-button">
                    About
                </button>
            </div>
        </header>
    )
}

export default LoggedIn;