import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
class OwnerLogin extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : "",
            password : "",
            authFlag : false,
            validationMessage:""
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
        //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
                authFlag : false
        })
    }
        //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
      //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
      
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/loginowner',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        auth : true,
                        ValidationMessage : ""
                    })
                }else{
                    this.setState({
                        authFlag : false,
                        ValidationMessage : "Invalid Credentials" 
                    })
                }
            })
       }
    render() { 
        let redirectVar = null;
        if(cookie.load('owner')){
            redirectVar = <Redirect to= "/locationpostwel"/>
        }   
        return ( 
            
            <div
                style={{
                    backgroundColor: "#f4f4f4",
                    minHeight: "100vh",
                    minWidth: "100%"
                }}
            >
                {redirectVar}
                <div className="header-bce" style={{width:"100%"}}>
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
                <div className="row justify-content-md-center" style={{ marginTop: "60px" }}>
                    <div className="container-fluid col-md-12">
                        
                            <div className="container col-md-6">
                                <img style={{marginLeft: "250px"}} src="//csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png" />
                            </div>
                            <div className="container col-md-6">
                                <div className="card" style={{marginLeft: "50px"}}>                                           
                                    <form>
                                        <h2 style={{ fontSize: "22px", fontWeight: "300" }}>
                                            Owner Login
                                        </h2>
                                        <div className="form-group">
                                            <input
                                            type="text"
                                            class="form-control"
                                            id="inputusername"
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
                                        <label for="credentialsValid" style={{color:"red"}}>
                                        </label>
                                        <button
                                            type="button"
                                            class="btn btn-primary"
                                            onClick={this.submitLogin}
                                        >Login</button>
                                        <div class="form-group form-check">
                                            <input
                                            type="checkbox"
                                            class="form-check-input"
                                            id="Remember me"
                                            />
                                            <label class="form-check-label" for="exampleCheck1">
                                            Keep me signed in
                                            </label>
                                        </div>
                                        <a href="/ownersignup">New and Want to start listing properties?</a>
                                    </form>
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
         );
    }
}
 
export default OwnerLogin;