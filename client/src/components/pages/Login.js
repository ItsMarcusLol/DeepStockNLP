import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        redirect: false
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
        if (true) {
            this.setState({ username: '', password: '', redirect: true });
        }
    } 

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        if (this.state.redirect) {
            return <Redirect to={"/"} />
        }
        return (
            <div>
                <div style={loginStyle}>
                    <form style={{ display: 'flex' }}>
                        <input 
                            type="text"
                            name="username"
                            style={{ flex: '10', padding: '30px', fontSize: 40 }}
                            placeholder="username"   
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    </form>
                    <form style={{ display: 'flex' }}>
                        <input 
                            type="text"
                            name="password"
                            style={{ flex: '10', padding: '30px', fontSize: 40 }}
                            placeholder="password"  
                            value={this.state.password}    
                            onChange={this.onChange}
                        />
                    </form>
                </div>
                <div style={loginButtonStyle}>
                    <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                        <input 
                            type="submit"
                            value="login"
                            className="loginBtn"
                            style={{ flex: '10', padding: '30px', background: '#acf', fontSize: 40 }} 
                        />
                    </form>
                </div>
            </div>
        );
    }
}

const loginStyle = {
    textAlign: 'center',
    padding: '60px',
    color: '#000'
}

const loginButtonStyle = {
    textAlign: 'center',
    margin: '60px',
    background: '#00f'
}

export default Login;