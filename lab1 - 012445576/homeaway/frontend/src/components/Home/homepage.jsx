import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
import "../../App.css";
class Homepage extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
        //Bind the handlers to this class
        this.logout = this.logout.bind(this);
        this.profileHandler=this.profileHandler.bind(this);
    }
    logout = (e) => {
        cookie.remove("traveller",{path : '/'})
        this.forceUpdate();
    }
    profileHandler = (e) => {
        e.preventDefault();
        this.props.history.push({
        pathname: "/travellerprofile"
        });
    }
    render() { 
        let redirectVar = null;
        if(!cookie.load('traveller')){
            redirectVar = <Redirect to= "/travellerlogin"/>
        }
        return ( 
            <div className="HomePageTop">
                {redirectVar}
                <div>
                <nav className="navbar navbar-static-top ">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                <img alt="HomeAway logo" className="site-header-logo__img img-responsive" role="presentation" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
                            </a>
                        </div>
                        <div className="nav navbar-nav navbar-right">
                            <li><button className="btn btn-default btn-inverse ListYourProp" onClick={this.profileHandler}>Profile</button></li>
                            <li className="nav-link nav-link-item"><a href="/travellerdashboard">Trip Boards</a></li>
                            <li><button className="btn btn-default btn-inverse ListYourProp" href="#">List your property</button></li>
                            <li className="dropdown show nav-link-item">
                                <a className="nav-link btn btn-secondary dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Help <span aria-hidden="true" className="caret"></span>
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Visit help center</a></li>
                                    <li><h4 className="dropdown-header" href="#">Travellers</h4></li>
                                    <li><a className="dropdown-item" href="#">How it Works</a></li>
                                    <li><a className="dropdown-item" href="#">Security Center</a></li>
                                    <li><h4 className="dropdown-header" href="#">Home Owners</h4></li>
                                    <li><a className="dropdown-item" href="#">How it Works</a></li>
                                    <li><a className="dropdown-item" href="#">List your Property</a></li>
                                    <li><a className="dropdown-item" href="#">Community</a></li>
                                </ul>
                            </li>
                            <li><button className="btn btn-default btn-inverse ListYourProp" onClick={this.logout}>Logout</button></li>
                            <li className="dropdown show nav-link-item">
                                <a className="nav-link btn btn-secondary dropdown-toggle" href="#" id ="navbarDropdown">
                                    <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"/>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <p>HomeAway is the world leader in vacation rentals. We offer the largest selection of properties for any travel occasion and every budget. We're committed to helping families and friends find a perfect vacation rental to create unforgettable travel experiences together.</p>
                                    <div>
                                        <a href="#">Learn more</a>
                                    </div>
                                    <div class="text-right">
                                        <img alt="logo" src="//csvcus.homeaway.com/rsrcs/cdn-logos/1.5.1/bce/brand/homeaway/logo-simple.svg" />
                                    </div>
                                </div>
                            </li>
                        </div>
                    </div>                                                                  
                </nav>
                </div>
                <div className="jumbotron jumbotron-fluid" style={{ background: "transparent" }}>
                    <div className="container">
                        <h2 class="display-2" style={{ color: "white" }}>
                            <div>Book beach houses, cabins,</div>
                            <div>condos and more, worldwide</div> 
                        </h2>
                    </div>
                </div>
                <div className="HomePageTopInput" style={{
                        position: "relative",
                        borderRadius: "4px",
                        margin: " 0 auto",
                        padding: " 10px 10px 0px",
                        background: "transparent",
                        lineHeight: "1.5rem",
                        color: "#5e6d77",
                    }}>
                    <form>
                        <div className="row">
                            <div className="col-md-4">
                                <input
                                type="text"
                                class="form-control"
                                placeholder="Where do you want to go?"
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="date"
                                    class="form-control"
                                    placeholder="Arrive"
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="date"
                                    class="form-control"
                                    placeholder="Depart"
                                />
                            </div>
                            <div className="col-md-2">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Guest"
                                />
                            </div>
                            <div className="col-md-2">
                                <button
                                    type="submit"
                                    class="btn btn-lg btn-primary"
                                    style={{ borderRadius: "30px", width: "200px" }}
                                >
                                Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container" style={{paddingTop:"100", color:"white", fontWeight:"bold", fontSize:"1.5em", background: "transparent" }}>
                    <div className="row">
                        <div className="col-sm-4">
                            <h4>Your whole vacation starts here</h4>
                            <h5>Choose a rental from the world's best selection</h5>
                        </div>
                        <div className="col-sm-4">
                            <h4>Book and stay with confidence</h4>
                            <h5><u>Secure payments, peace of mind</u></h5>
                        </div>
                        <div className="col-sm-4">
                            <h4>Your vacation your way</h4>
                            <h5>More space, more privacy, no compromises</h5>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Homepage;