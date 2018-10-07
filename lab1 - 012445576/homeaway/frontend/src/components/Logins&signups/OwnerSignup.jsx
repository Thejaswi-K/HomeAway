import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
class OwnerSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            username:"",
            password: "",
            ValidationMessage: ""     
        };
    
        this.firstNameChangehandler = this.firstNameChangehandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);  
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this);  
    }
    firstNameChangehandler = e =>{
        this.setState({
            firstName: e.target.value
        });
    };
    lastNameChangeHandler = e =>{
        this.setState({
            lastName:e.target.value
        })
    };
    emailChangeHandler = e =>{
        this.setState({
            email:e.target.value
        });
    };
    usernameChangeHandler = e =>{
        this.setState({
            username :e.target.value
        });
    };
    passwordChangeHandler=e=>{
        this.setState({
            password:e.target.value
        });
    };
    submitSignUp = e => {
        e.preventDefault();
        const data = {
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            email:this.state.email,
            username: this.state.username,
            password: this.state.password
        };
          
        axios.defaults.withCredentials = true;
        axios.post("http://localhost:3001/createowner", data).then(response => {
            this.setState({
                ValidationMessage:"Owner Account Created, Please Sign in to continue"
            })
        })
        .catch(function(error) {
            console.log(error);
            this.setState({   
                ValidationMessage:"Owner Creation failed, try again"
            })
        });
    }
    render() { 
        
        return ( 
            <div
                style={{
                backgroundColor: "#f4f4f4",
                minHeight: "100vh",
                minWidth: "100%",
                boxSizing : "border-box"  
                }}
            >
                <div className="header-bce">
                    <div className="container">
                        <div className="navbar navbar-left header navbar-bce">
                            <div className="navbar-inner">
                                <div className="pull-left">
                                <a href="./Home/home.jsx" title="HomeAway" className="logo">
                                    <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
                                </a>
                                </div>
                            </div>
                        </div>
                        <div className="navbar navbar-right header header-bce-birdhouse-container">
                            <div className="flip-container">
                                <div className="flipper">
                                    <div className="front btn-bce">
                                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ marginTop: "60px" }}>
                    <div className="row justify-content-center" style={{ marginLeft: "-15px", marginRight: "-15px" }}>
                        <div className="col-3">
                            <h1 style={{fontSize: "40px", fontWeight: "300", fontFamily: "Arial", color: "#353e44",textAlign: "center"}}>Sign up for Homeaway Owner</h1>
                            <div className="footer" style={{ textAlign: "center" }}>
                                Already have an account?
                                <a href="/ownerLogin">Sign in</a>
                            </div>
                            <div className="card">
                                <form>
                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="inputFirstName"
                                                aria-describedby="firstnameHelp"
                                                placeholder="First Name"
                                                onChange={this.firstNameChangehandler}
                                            />
                                            </div>
                                            <div className="col">
                                            <input
                                                type="text"
                                                class="form-control"
                                                id="inputLastName"
                                                aria-describedby="lastnameHelp"
                                                placeholder="Last Name"
                                                onChange={this.lastNameChangeHandler}
                                            />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <input
                                        type="email"
                                        class="form-control"
                                        id="inputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="Email address"
                                        onChange={this.emailChangeHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                        type="username"
                                        class="form-control"
                                        id="inputUsername"
                                        aria-describedby="usernameHelp"
                                        placeholder="Username"
                                        onChange={this.usernameChangeHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                        type="password"
                                        class="form-control"
                                        id="inputPassword"
                                        aria-describedby="passwordHelp"
                                        placeholder="Password"
                                        onChange={this.passwordChangeHandler}
                                        />
                                    </div>
                                    <button type="button" class="btn btn-primary" onClick={this.submitSignUp}>Sign up as owner</button>
                                    <label for="credentialsValid" style={{color:"red"}}>
                                    {this.state.ValidationMessage}
                                    </label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default OwnerSignup;