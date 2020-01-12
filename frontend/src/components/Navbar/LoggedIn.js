import React from 'react'
import LOGO from '../../assets/images/logo.png';
import { Link } from 'react-router-dom'
import Utils from '../../assets/js/Utils'

function LoggedIn(props) {
    return (
        <header className="navbar">
            <Link to={'/'}>
                <div className="navbar-logo navbar-logo-loggedin">
                    <img alt="Logo" src={LOGO} />
                    <span className="logo-text">weNote</span>
                </div>
            </Link>
            <div className="navbar-buttons">
                <button onClick={() => Utils.getUser()} className="navbar-button">
                    About
                </button>
            </div>
        </header>
    )
}

export default LoggedIn;