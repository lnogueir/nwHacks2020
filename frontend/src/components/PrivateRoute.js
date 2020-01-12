import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Utils from '../assets/js/Utils'
import Loading from './Loading'


function PrivateRoute(props) {
    const [isAuth, setIsAuth] = useState(undefined)

    useEffect(() => setIsAuth(Utils.isAuth()), [])

    return (
        typeof this.state.isAuth === 'undefined' ?
            <Loading />
            :
            <Route exact path={props.path}>
                {
                    isAuth
                        ? props.children
                        : <Redirect to='/' />
                }
            </Route>
    )
}

export default PrivateRoute;