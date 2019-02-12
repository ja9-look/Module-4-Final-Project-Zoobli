import React, { Component } from 'react'
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

class FormHolder extends Component {

    render() {
        return (
            <div>
            <SignUpForm handleSignUp={this.props.handleSignUp}/>
            <LoginForm handleLogin={this.props.handleLogin}/>
            </div>
        )
    }

}

export default FormHolder