import React from 'react'
import logo from '../../logo.svg';

function LoggedIn(props) {
    return (
        <header className="navbar">
            <img alt="Logo" className="navbar-logo" src={logo} />
            <div className="navbar-buttons">
                <button className="navbar-button">
                    Sign In
                </button>
                <button className="navbar-button">
                    Create Account
                </button>
            </div>
        </header>
    )
}

export default LoggedIn;