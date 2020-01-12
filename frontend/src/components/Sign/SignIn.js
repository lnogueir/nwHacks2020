import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MailOutline from '@material-ui/icons/MailOutline';
import LockOutlined from '@material-ui/icons/LockOutlined';
import Utils from '../../assets/js/Utils'
import Checkbox from '@material-ui/core/Checkbox'
import LOGO from '../../assets/images/logo.png';
import Swal from 'sweetalert2'


function SignIn(props) {
    const [rememberMe, setRememberMe] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)

    const gotoCreateAccount = () => {
        props.toggleDisplay()
        props.toggleSignOut()
    }

    const handleAuthentication = () => {
        let req = new Utils.Request()
        const data = {
            username: username,
            password: password
        }
        const endpoint = '/user/login'
        req.POST(endpoint, JSON.stringify(data)).then(response => {
            if (response.status === 200) {
                response.json()
                    .then(response => {
                        console.log(response)
                        Swal.fire({
                            showConfirmButton: false,
                            timer: 1500,
                            icon: 'success',
                            title: 'Account Status',
                            text: 'Your account has been successfully created!'
                        })
                    })
            } else {
                setIsError(true)
            }
        }).catch(err => console.log(err))
    }

    return (
        <>
            <Paper className="sign-card">
                <div className="sign-card-logo">
                    <img alt="logo" src={LOGO} className="sign-card-logo" />
                </div>
                <div className="sign-card-title">
                    Sign In
                </div>
                <div className="sign-card-textfields">
                    <TextField
                        value={username}
                        placeholder="email@example.com"
                        label="Email"
                        name="username"
                        error={isError}
                        color="secondary"
                        onChange={e => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutline />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        label="Password"
                        placeholder="Your password"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        error={isError}
                        color="secondary"
                        type={"password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined />
                                </InputAdornment>
                            )
                        }}
                    />
                    <FormControlLabel
                        style={{ margin: '-10px 10px -5px 5px' }}
                        control={
                            <Checkbox
                                onChange={() => setRememberMe(!rememberMe)}
                                value={rememberMe}
                                color="secondary"
                            />
                        }
                        label="Remember me"
                    />
                </div>
                <div className="sign-card-button">
                    <Button onClick={handleAuthentication} variant="contained" color="primary">
                        Login
                    </Button>
                </div>
                <div className="sign-card-horitontal-line">
                    <hr />
                </div>
                <div className="sign-card-footer">
                    Don't have an account yet? <span onClick={gotoCreateAccount}>Create account</span>
                </div>
            </Paper>
        </>
    )
}

export default SignIn;