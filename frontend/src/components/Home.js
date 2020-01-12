import React, { useState } from 'react'
import LOGO from '../assets/images/logo.png'
import Sign from './Sign/Sign'
import Overlay from './Overlay.js'
import Utils from '../assets/js/Utils'
import Navbar from './Navbar/Navbar'


function Home(props) {
    const [isSignIn, setIsSignIn] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const toggleSignUp = () => setIsSignUp(!isSignUp)
    const toggleSignIn = () => setIsSignIn(!isSignIn)

    return (
        <>
            <Overlay
                display={isSignIn || isSignUp}
                toggleDisplay={
                    isSignIn ? toggleSignIn :
                        isSignUp ? toggleSignUp :
                            () => null
                }
            >
                {isSignIn ? <Sign.In toggleSignOut={toggleSignUp} /> :
                    isSignUp ? <Sign.Up toggleSignIn={toggleSignIn} /> : null}
            </Overlay>
            {
                Utils.isAuth() ?
                    <Navbar.LoggedIn />
                    :
                    <Navbar.LoggedOut
                        toggleSignIn={toggleSignIn}
                        toggleSignUp={toggleSignUp}
                    />
            }
            <div className="home-main">
                <div>
                    <img src={LOGO} alt="logo" />
                    <div className="logo-text">
                        weNote
                    </div>
                    <p className="home-slogan">
                        Optimize your learning experience, <br />
                        Share and merge notes with your classmates!
                    </p>
                    <div className="home-main-buttons">
                        <button onClick={props.toggleSignIn}>
                            Learn More
                        </button>
                        <button onClick={props.toggleSignIn}>
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;