import React from 'react';

const LoginForm = props => {

    return (
        <form className={'loginForm hidden'} onSubmit={props.handleLogin}>
            <input type="text" name='username' placeholder='Username'/>
            <input type="password" name='password' placeholder='Password'/>
            <input type='submit' value='Log In'/>
        </form>
    )

}

export default LoginForm