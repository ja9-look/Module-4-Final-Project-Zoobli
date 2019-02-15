import React from 'react';
import Widget from '../components/Widget'

const NavBar = (props) => {

    return (

        <nav className={'navbar'}>
            <div className="logo_wrapper">
                <div className="brand">ZOOBLI</div>
                {!localStorage.token
                ?
                <div>
                    <button className={'sign_up_button'} onClick={props.handleSignUpFormClick}>Sign Up</button>
                    <button className={'login_button'} onClick={props.handleLoginFormClick}>Login</button>                    
                </div>
                :
                <div>
                    <div className="logout_image_wrapper">
                        <button className={'logout_button'} onClick={props.logout}>Logout</button>                                                
                        <img className={'toggle_button'} onClick={props.toggleMenu} src= {require('../down_arrow.png')} />
        
                    </div>
                </div>
                }
            </div>
                {/* <button className="toggle_button" onClick={props.onToggleClick}>▼</button> */}
        </nav>
    )

}

export default NavBar;