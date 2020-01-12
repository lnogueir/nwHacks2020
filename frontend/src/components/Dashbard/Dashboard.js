import React from 'react'
import Sidebar from './NewSidebar'
import Navbar from '../Navbar/Navbar'

function Dashboard(props) {

    return (
        <>
            <Navbar.LoggedIn />
            <Sidebar />
        </>
    )
}

export default Dashboard;