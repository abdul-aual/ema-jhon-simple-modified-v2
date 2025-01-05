import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className='nav-container'>
            <div className='nav-div'>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                     <li><Link to='products'>Products</Link></li>
                    <li><Link to='order-request'>Request Order</Link></li>
                    <li><Link to='special-offer'>Special Offers</Link></li>
                    <li><Link to='about-us'>About Us</Link></li>
                    <li><Link to='contact-us'>Contact Us</Link></li>
                </ul>
            </div>
            
        </div>
    );
};

export default Navbar;