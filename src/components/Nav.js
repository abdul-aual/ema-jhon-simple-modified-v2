import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {
    return (
        <div>
            <ul>
                <li><Link to='/kart' >Kart</Link></li>
                <li> <Link to='prod'>Prod</Link> </li>
            </ul>
        </div>
    );
};

export default Nav;