import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import MailOutline from '@material-ui/icons/MailOutline'
import LockOutlined from '@material-ui/icons/LockOutlined'
import Utils from '../../assets/js/Utils'
import LOGO from '../../assets/images/logo.png'
import Swal from 'sweetalert2'


function SignUp(props) {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)

    const toggleShowPassword = () => setIsShowPassword(!isShowPassword)

    const handleAuthentication = () => {
        let req = new Utils.Request()
        const data = {
            username: username,
            name: name,
            password: password
        }
        console.log(data)
        const endpoint = '/user/register'
        req.POST(endpoint, JSON.stringify(data)).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    showConfirmButton: false,
                    timer: 1500,
                    icon: 'success',
                    title: 'Account Status',
                    text: 'Your account has been successfully created!'
                })
            } else {
                setIsError(true)
            }
        }).catch(err => console.log(err))
    }

    const gotoSignIn = () => {
        props.toggleDisplay()
        props.toggleSignIn()
    }

    return (
        <>
            <Paper className="sign-card">
                <div className="sign-card-logo">
                    <img alt="logo" src={LOGO} className="sign-card-logo" />
                </div>
                <div className="sign-card-title">
                    Sign Up
                </div>
                <div className="sign-card-textfields">
                    <TextField
                        placeholder="John Smith"
                        value={name}
                        color="secondary"
                        type="text"
                        label="Name"
                        name="name"
                        error={isError}
                        onChange={e => setName(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutline />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        placeholder="email@example.com"
                        value={username}
                        type="email"
                        label="Email"
                        color="secondary"
                        name="email"
                        error={isError}
                        onChange={e => setUsername(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlined />
                                </InputAdornment>
                            )
                        }}
                    />
                    <TextField
                        placeholder="Your password"
                        label="Password"
                        color="secondary"
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        error={isError}
                        type={isShowPassword ? "text" : "password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockOutlined />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isShowPassword ?
                                        <VisibilityOff className="cursor-pointer" onClick={toggleShowPassword} /> :
                                        <Visibility className="cursor-pointer" onClick={toggleShowPassword} />
                                    }
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div className="sign-card-button">
                    <Button onClick={handleAuthentication} variant="contained" color="primary">
                        Create Account
                    </Button>
                </div>
                <div className="sign-card-horitontal-line">
                    <hr />
                </div>
                <div className="sign-card-footer">
                    Already have an account? <span onClick={gotoSignIn} style={{ color: 'blue' }}>Sign In</span>
                </div>
            </Paper>
        </>
    )
}

export default SignUp;
