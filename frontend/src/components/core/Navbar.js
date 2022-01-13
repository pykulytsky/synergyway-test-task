import React from 'react'
import './Navbar.css'
import { Button} from 'evergreen-ui'
import { Link } from 'react-router-dom'

export const Navbar = ({currentPage, newIsShown, setNewIsShown}) => {
    return (
        <nav>
            <Link className='navbar-item' to="/">Home</Link>
            <Link className='navbar-item' to={currentPage === 'users' ? '/groups' : '/users'}>{currentPage === 'users' ? 'Groups' : 'Users'}</Link>

            <div className="navbar-item">
                <Button onClick={(e) => setNewIsShown(!newIsShown)}>New {currentPage === 'users' ? 'User' : 'Group'}</Button>
            </div>
        </nav>
    )
}
