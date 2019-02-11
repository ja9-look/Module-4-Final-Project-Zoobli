import React from 'react';
import logo from '../zoobli_logo.png';

const NavBar = (props) => {

    return (
        <div className="NavBar">
            <ul id="nav">
                <li><img src= {logo} /></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
            </ul>
        </div>
    )

}

export default NavBar;