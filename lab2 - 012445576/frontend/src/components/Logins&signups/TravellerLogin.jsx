import React, { Component } from 'react';
import { connect } from 'react-redux';
//import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import { loginTraveller }  from '../../actions';
import { bindActionCreators } from 'redux';
class TravellerLogin extends Component {
    constructor(props){
        super(props);
        // this.state = {
        //     username : "",
        //     password : "",
        //     authFlag : false,
        //     validationMessage:""
        // }
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
        
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/logintraveller',data)
        //     .then(response => {
        //         console.log("Status Code : ",response.status);
        //         if(response.status === 200){
        //             this.setState({
        //                 auth : true,
        //                 ValidationMessage : ""
        //             })
        //         }else{
        //             this.setState({
        //                 authFlag : false,
        //                 ValidationMessage : "Invalid Credentials" 
        //             })
        //         }
        //     })
        this.props.loginTraveller(data);

       }
    render() { 
        let redirectVar = null;
        if(cookie.load('traveller')){
            redirectVar = <Redirect to= "/home"/>
        }
        console.log("Login message -> ", this.props.loginMessage);
        return ( 
            <div
                style={{
                    backgroundColor: "#f4f4f4",
                    minHeight: "100vh",
                    minWidth: "100%",
                    boxSizing : "border-box"
                }}
            >
                {redirectVar}
                <div>
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
                            <h1 style={{fontSize: "40px", fontWeight: "300",fontFamily: "Arial",color: "#353e44" , textAlign:"center"}}>Log in to Homeaway</h1>
                            <div className="footer" style={{textAlign:"center"}}>
                            Need an Account? 
                                <a href="/travellersignup">
                                    Sign up
                                </a>
                            </div>
                            <div className="card">
                                <form>
                                    <h2 style={{ fontSize: "22px", fontWeight: "300", paddingBottom:"20px" }}>
                                        Account Login
                                    </h2>
                                    <div className="form-group">
                                        <input type="text" class="form-control" id="inputUsername" aria-describedby="usernameHelp" placeholder="Username" onChange={this.usernameChangeHandler} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" class="form-control" id="inputPassword" aria-describedby="passwordHelp" placeholder="Password" onChange={this.passwordChangeHandler} />
                                    </div>
                                    <label for="credentialsValid" style={{color:"red"}}>{this.state.ValidationMessage}</label>
                                    <button type="button" class="btn btn-primary" onClick={this.submitLogin}>Login</button>
                                    <div class="form-group form-check" style={{paddingTop:"20px"}}>
                                        <input type="checkbox" class="form-check-input" id="Remember me" />
                                        <label class="form-check-label"  for="signedinCheck">Keep me signed in</label>
                                    </div>
                                </form>   
                            </div>
                            <div style={{textAlign:"center"}}><a href="/ownerlogin">Want to list your property?</a></div>    
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(store){
    return(
        { loginMessage : store.travellers.validationMessage}
    );
}

function mapsDispatchToProps(dispatch){
    return {...bindActionCreators({loginTraveller}, dispatch)}
}
export default connect(mapStateToProps, mapsDispatchToProps)(TravellerLogin);