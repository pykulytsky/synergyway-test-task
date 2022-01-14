import React from 'react'
import './Navbar.css'
import { Button } from 'evergreen-ui'
import { Link } from 'react-router-dom'
import { store } from 'react-notifications-component';

export const Navbar = ({ currentPage, newIsShown, setNewIsShown, isGroupExists }) => {

    function newItem() {
        if (isGroupExists || currentPage === 'groups') {
            setNewIsShown(!newIsShown)
        }
        else {
            store.addNotification({
                title: "Error",
                message: "In order to create a user, you must first create at least one group",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    onScreen: true
                }
            });
        }
    }

    return (
        <nav>
            <Link className='navbar-item' to="/">Home</Link>
            <Link className='navbar-item' to={currentPage === 'users' ? '/groups' : '/users'}>{currentPage === 'users' ? 'Groups' : 'Users'}</Link>

            <div className="navbar-item">
                <Button onClick={newItem}>New {currentPage === 'users' ? 'User' : 'Group'}</Button>
            </div>
        </nav>
    )
}
