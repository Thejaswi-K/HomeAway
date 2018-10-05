import React, { Component } from 'react';
class OwnerLogin extends Component {
    state = {  }
    render() { 
        return ( 
            <div
                style={{
                    backgroundColor: "#f4f4f4",
                    minHeight: "100vh",
                    minWidth: "100%"
                }}
            >
                <div className="header-bce">
                    <div className="container">
                        <div className="navbar header navbar-bce">
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
                            <img src="//csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png" />
                        </div>
                        <div className="col-4">
                            <div className="card">                                           
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
                                        class="btn btn-warning btn-lg btn-block"
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
                                    <a href="/ownerSignup">New to Homeaway? Start listing your property?</a>
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