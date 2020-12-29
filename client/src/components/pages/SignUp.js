import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        rePassword: '',
        redirect: false
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        if (this.state.password === this.state.rePassword) {
            this.setState({ username: '', password: '', redirect: true });
        }
    } 

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/"} />
        }
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input 
                    type="text"
                    name="email"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="email"   
                    value={this.state.email}
                    onChange={this.onChange}
                />
                <input 
                    type="text"
                    name="username"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="username"   
                    value={this.state.username}
                    onChange={this.onChange}
                />
                <input 
                    type="text"
                    name="password"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="password"  
                    value={this.state.password}    
                    onChange={this.onChange}
                />
                <input 
                    type="text"
                    name="rePassword"
                    style={{ flex: '10', padding: '5px' }}
                    placeholder="re-enter password"  
                    value={this.state.rePassword}    
                    onChange={this.onChange}
                />
                <input 
                    type="submit"
                    value="sign up"
                    className="signUpBtn"
                    style={{flex: 1}}
                />
            </form>
        );
    }
}

export default SignUp;