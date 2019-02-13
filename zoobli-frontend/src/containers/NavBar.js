import React from 'react';

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
                    <button className={'logout_button'} onClick={props.logout}>Logout</button>                                
                }
            </div>
                <img className='pseudobutton' src= {require('../add_button.png')} />
                <img className="add_image_button" src= {require('../add_button.png')} />
                {/* <button className="toggle_button" onClick={props.onToggleClick}>▼</button> */}
            <div className="menu">
                {/* <ul>
                    <li>Add new image +</li>
                </ul> */}
                {/* <div className={'search_form_wrapper'}>
                    <form>
                        <input type="search" placeholder="Looking for something?"/>
                        <input id="button" type="submit" value="Search" />
                    </form>
                </div> */}
            </div>
        </nav>
    )

}

export default NavBar;