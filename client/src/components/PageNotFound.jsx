import React from 'react';
import {Link} from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div>
            <div className='dashboard_container home_container'>
                <Link to='/' className='logo'>Page Not Found</Link>
                <Link to='/'>Go To Home</Link>
            </div>
        </div>
    );
}

export default PageNotFound;
