import React from 'react'
import './Choice.css'
import {Link } from "react-router-dom";

export const Choice = () => {
    return (
        <div className='choice'>
            <Link to="/users" className='choice-item'>
                Users
            </Link>
            <Link to="/groups" className='choice-item'>
                Groups
            </Link>
        </div>
    )
}
