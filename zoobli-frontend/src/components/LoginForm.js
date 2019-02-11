import React from 'react';

const LoginForm = props => {

    return (
        <form className='loginForm' onSubmit={props.handleLogin}>
            <input type="text" name='username' placeholder='Username'/>
            <input type="password" name='password' placeholder='Password'/>
            <input type='submit'/>
        </form>
    )

}

export default LoginForm