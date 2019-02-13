import React from 'react';
import logo from '../zoobli_logo.png';

const NavBar = (props) => {

    return (

        <nav className={'navbar'}>
            <div><img width="200px" alt="zoobli" src = { logo } /></div>
            <button className="toggle_button" onClick={props.onToggleClick}>Expand</button>
            <div className="menu">
                <ul>
                    <li>Add new image</li>
                </ul>
                <div className={'search_form_wrapper'}>
                    <form>
                        <input type="search" />
                        <input type="submit" />
                    </form>
                </div>
                <button className={'sign_up_button'}>Sign Up</button>
                <button className={'login_button'}>Login</button>
            </div>
        </nav>
        // <nav className="navbar navbar-expand-lg navbar-light">
        //     <a className="navbar-brand" href="/"><img alt="zoobli_logo" width="200px" src={ logo } /></a>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>

        //     <div className="collapse navbar-collapse" id="navbarSupportedContent" data-toggle="collapse" >
        //         <ul className="navbar-nav mr-auto">
        //             <li className="nav-item">
        //                 <a className="nav-link" href="/">Link</a>
        //             </li>
        //             <li className="nav-item dropdown">
        //                 <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //                     Dropdown
        //                 </a>
        //                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
        //                     <a className="dropdown-item" href="/">Action</a>
        //                     <a className="dropdown-item" href="/">Another action</a>
        //                     <div className="dropdown-divider"></div>
        //                     <a className="dropdown-item" href="/">Something else here</a>
        //                 </div>
        //             </li>
                
        //         </ul>
        //         <form className="form-inline my-2 my-lg-0">
        //             <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        //             <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        //         </form>
        //         <ul className="navbar-nav mr-auto">
        //             <li className="nav-item">
        //                 <a className="nav-link" href="/">Login</a>
        //             </li>
        //             <li className="nav-item">
        //                 <a className="nav-link" href="/">Signup</a>
        //             </li>
        //         </ul>
        //     </div>
        // </nav>
        
    )

}

export default NavBar;