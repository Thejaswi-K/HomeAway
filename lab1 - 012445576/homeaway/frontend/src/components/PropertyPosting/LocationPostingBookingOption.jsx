import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
class LocationPostingBooking extends Component {
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
        this.bookingOptionChangeHandler=this.bookingOptionChangeHandler.bind(this);
        this.dashboardHandler=this.dashboardHandler.bind(this);
        this.logout=this.logout.bind(this);
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
            pathname:"/locationpostavailability",
            state:this.state
        })
    }
    bookingOptionChangeHandler = (e)=>{
        this.setState({
            bookingOption:e.target.value
        })
    }
    logout = (e) => {
        cookie.remove("owner",{path : '/'})
        this.forceUpdate();
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
                        <div className="card-header">
                            <h2 className="card-title">Booking Options</h2>
                        </div>
                        <div className="card-body">
                            <h4 className="card-subtitle mb-2 text-muted">Select a booking method</h4>
                            <form>
                                <div class="form-check">
                                    <div className="row" style={{height:"80px"}}>
                                        <input class="form-check-input col-sm-1" type="radio" name="exampleRadios" id="exampleRadios1" value="1" style={{marginTop:"10px"}} onChange={this.bookingOptionChangeHandler} checked />
                                        <label class="form-check-label col-sm-11" for="exampleRadios1">
                                                <h4 className="card-title" style={{fontWeight:"600"}}>Instant Booking</h4>
                                                <h6 className="card-subtitle mb-2 text-muted">Automatically accept booking requests from all travelers for dates you have available, and add the bookings to your calendar. <span><a href="#">Learn more</a></span></h6>
                                        </label>
                                    </div>  
                                </div>
                                <div class="form-check">
                                    <div className="row" style={{height:"80px"}}>
                                        <input class="form-check-input col-sm-1" type="radio" name="exampleRadios" id="exampleRadios2" value="2" style={{marginTop:"10px"}} onChange={this.bookingOptionChangeHandler}/>
                                        <label class="form-check-label col-sm-11" for="exampleRadios2">
                                                <h4 className="card-title" style={{fontWeight:"600"}}>24-hour review</h4>
                                                <h6 className="card-subtitle mb-2 text-muted">Allow 24 hours to communicate with guests and accept booking requests.</h6>
                                        </label>
                                    </div>   
                                </div>
                            </form>
                        </div>
                        <div className="card-footer row">
                            <div className="Container col-md-10">
                                <button type="button" className="btn btn-light">Back</button>
                            </div>
                            <div className="Container col-md-2">
                                <button type="button" className="btn btn-primary" onClick={this.nextButton}>Next</button>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default LocationPostingBooking;