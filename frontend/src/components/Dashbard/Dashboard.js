import React from 'react'
import SideBar from './SideBar'
import Navbar from '../Navbar/Navbar'



function Dashboard(props) {

    return (
        <>
            <Navbar.LoggedIn />
            <SideBar />
        </>
    )
}

export default Dashboard;