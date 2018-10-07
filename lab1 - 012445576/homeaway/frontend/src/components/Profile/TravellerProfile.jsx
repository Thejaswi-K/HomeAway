import React, { Component } from 'react';
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
import profilepic from "../../resources/Profile-icon-9.png"
class TravellerProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: cookie.load("traveller"),
          travellerList: ""
        };
        this.profileEditHandler = this.profileEditHandler.bind(this);
        this.logout=this.logout.bind(this);
        this.dashboardHandler=this.dashboardHandler.bind(this);
    }
    logout = (e) => {
        cookie.remove("traveller",{path : '/'})
        this.forceUpdate();
    }
    profileEditHandler = e => {
        e.preventDefault();
    
        this.props.history.push({
          pathname: "/travellerprofileedit",
            state: this.state
        });
    };
    dashboardHandler = (e) =>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/travellerdashboard"
        })
    }
    componentDidMount() {
        axios
          .get("http://localhost:3001/gettravellerdetails/" + this.state.username)
          .then(response => {
            console.log(response.data);
            this.setState({
              travellerList: response.data
            });
          });
    }
    render() {
        let redirectVar = null;
        if (!cookie.load("traveller")) {
        redirectVar = <Redirect to="/travellerlogin" />;
        } 
        var allTravellers = Array.prototype.slice.call(this.state.travellerList);
        return ( 
            <div>
                {redirectVar}
                <nav class="navbar" style={{boxSizing : "border-box", backgroundColor: "#f4f4f4"}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <img style={{filter: "brightness(0)"}}src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
                            </a>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li><button className="btn btn-primary" onClick={this.dashboardHandler} style={{margin:"10px"}}>My Dashboard</button></li>
                                <li><button className="btn btn-secondary" onClick={this.logout} style={{margin:"10px"}}>Signout</button></li>
                                <li>
                                    <a href="#">
                                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                {allTravellers.map((traveller, i) => (
                    <div className="card " style={{ width: "90rem", marginRight: "100px", marginLeft: "100px"}}>
                        <div className="card-body ">
                            <img className="rounded-circle" src="//vignette.wikia.nocookie.net/bungostraydogs/images/1/1e/Profile-icon-9.png/revision/latest?cb=20171030104015" style={{ marginLeft: "300px" , width : "200px", height : "200px" }}/>
                            <h1 style={{ textAlign: "center", padding: "30px", margin: "30px" }}>
                            {traveller.firstname} &emsp; {traveller.lastname}</h1>
                            <div className="card" style={{ backgroundColor: "#f4f4f4", marginLeft:"30px", width:"80rem"}}>
                                <form style={{padding:"20px"}}>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Email" name="firstname"  value={traveller.email}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="About me" name="Aboutme"  value={traveller.aboutme}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Phone Number" name="phonenumber"  value={traveller.phonenumber}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="School" name="school"  value={traveller.school}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Company" name="company"  value={traveller.company}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Hometown" name="hometown"  value={traveller.hometown}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="City" name="city"  value={traveller.city}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Country" name="country"  value={traveller.country}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Gender" name="gender"  value={traveller.gender}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                            <input type="text" className="form-control" placeholder="Languages" name="languages"  value={traveller.country}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col">
                                        <button onClick={this.profileEditHandler} type="button" class="btn btn-primary btn-sm" >Edit Profile</button>
                                        </div>
                                    </div>
                                </form>
                            </div>  
                        </div>
                    </div>
                ))}
            </div> 
         );
    }
}
 
export default TravellerProfile;