import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
class LocationPostingLoc extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:cookie.load("owner"),
            location:this.props.location.state==null?"":this.props.location.state.location,
            headlines:this.props.location.state==null?"":this.props.location.state.headlines,
            description:this.props.location.state==null?"":this.props.location.state.description,
            accomodation:this.props.location.state==null?"":this.props.location.state.accomodation,
            bathrooms:this.props.location.state==null?"":this.props.location.state.bathrooms,
            propertyType:this.props.location.state==null?"":this.props.location.state.propertyType,
            bedrooms:this.props.location.state==null?"":this.props.location.state.bedrooms,
            bookingOption:this.props.location.state==null?"1":this.props.location.state.bookingOption,
            availabilityFrom:this.props.location.state==null?"":this.props.location.state.availabilityFrom,
            availabilityTo:this.props.location.state==null?"":this.props.location.state.availabilityTo,
            price:this.props.location.state==null?"":this.props.location.state.price,
            photo1:""
        }
        this.nextButton=this.nextButton.bind(this);
        this.locationChangeHandler=this.locationChangeHandler.bind(this);
        this.dashboardHandler=this.dashboardHandler.bind(this);
        this.logout=this.logout.bind(this);
    }
    logout = (e) => {
        cookie.remove("owner",{path : '/'})
        this.forceUpdate();
    }
    dashboardHandler = (e) =>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/ownerdashboard"
        })
    }

    nextButton = (e) =>{
        e.preventDefault();
      
        this.props.history.push({
            pathname:"/locationpostdetails",
            state:this.state
        })
    }
    locationChangeHandler = (e)=>{
            this.setState({
                location:e.target.value
            })
    }

    render() { 
        let redirectVar = null;
        if(!cookie.load('owner')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        } 
        return ( 
            <div>
                {redirectVar}
                <nav class="navbar" style={{boxSizing : "border-box", backgroundColor: "#f4f4f4"}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="#">
                                <img href="/locationpostwel" style={{filter: "brightness(0)"}}src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
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
                <div className="container row" >
                    <div className="container col-md-2">
                    <ul class="nav flex-column">
                            <li class="nav-item">
                                <Link to={{pathname:"/locationpostwel", state : this.state }}> Welcome </Link>
                            </li>
                            <li class="nav-item">
                                <Link to={{pathname:"/locationpostloc", state : this.state }}> Location </Link>
                            </li>
                            <li class="nav-item">
                                <Link to={{pathname:"/locationpostdetails", state : this.state }}> Details </Link>
                            </li>
                            <li class="nav-item">
                                <Link to={{pathname:"/locationpostbooking", state : this.state }}> Booking </Link>
                            </li>
                            <li class="nav-item">
                                <Link to={{pathname:"/locationpostavailability", state : this.state }}> Availability </Link>
                            </li>
                            <li class="nav-item">
                                <Link to={{pathname:"/locationpostpricing", state : this.state }}> Pricing </Link>
                            </li>
                            <li class="nav-item">
                                <Link to={{pathname:"/locationpostphotos", state : this.state }}> Photos </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="card col-xl-10" style={{backgroundColor: "#f4f4f4", marginLeft:"350px", width:"80rem"}}>
                        <form>
                            <h2 style={{ fontSize: "22px", fontWeight: "300" }}>Verify the location of your Rental</h2>
                            <div className="form-group">
                                <input type="text" class="form-control" id="inputlocation" aria-describedby="location" placeholder="Enter Location Address" onChange={this.locationChangeHandler}/>
                            </div>            
                            <button type="button" class="btn btn-primary" onClick={this.nextButton}>Next</button>
                        </form>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default LocationPostingLoc;