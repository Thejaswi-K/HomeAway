import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
class LocationPostingPhotos extends Component {
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
        this.dashboardHandler=this.dashboardHandler.bind(this);
        this.logout=this.logout.bind(this);
    }
    dashboardHandler = (e) =>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/ownerdashboard"
        })
    }
    logout = (e) => {
        cookie.remove("owner",{path : '/'})
        this.forceUpdate();
    }
    nextButton = (e) =>{
        e.preventDefault();
        const data = {
            username: this.state.username,
            location: this.state.location,
            headlines:this.state.headlines,
            description: this.state.description,
            accomodation: this.state.accomodation,
            bathrooms:this.state.bathrooms,
            propertyType:this.state.propertyType,
            bedrooms:this.state.bedrooms,
            bookingOption:this.state.bookingOption,
            availabilityFrom:this.state.availabilityFrom,
            availabilityTo:this.state.availabilityTo,
            price:this.state.price,
            photo1:this.state.photo1,
            photo2:this.state.photo2,
            photo3:this.state.photo3,
            photo4:this.state.photo4,
            photo5:this.state.photo5,
        };
        axios.post("http://localhost:3001/createproperty", data).then(response => {
            console.log("inside submit resp");
            this.props.history.push({
                pathname:"/ownerdashboard",
            })
        }) .catch(function(error) {
            console.log(error);
        });   
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
                        <div className="card-header"><h2 className="card-title">Add upto 5 Photos</h2></div>
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <label className="custom-file-label" for="photoUpload">
                                    Choose photo 1
                                </label>
                                <div className="custom-file">
                                    <input
                                        type="file"
                                        className="custom-file-input"
                                        id="photos upload"
                                        name="photo1"
                                    />
                                </div>
                            </div>  
                        </div>
                        <div className="card-footer">
                            <div className="row" style={{margin:"20px"}}>
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
            </div>
         );
    }
}
 
export default LocationPostingPhotos;