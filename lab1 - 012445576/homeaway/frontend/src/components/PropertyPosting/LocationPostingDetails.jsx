import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import cookie from 'react-cookies';
class LocationPostingDetails extends Component {
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
            photo1:"",
            photo2:"",
            photo3:"",
            photo4:"",
            photo5:""
        }
        this.nextButton=this.nextButton.bind(this);
        this.headlinesChangeHandler=this.headlinesChangeHandler.bind(this);
        this.propDescChangeHandler=this.propDescChangeHandler.bind(this);
        this.accomodationChangeHandler=this.accomodationChangeHandler.bind(this);
        this.bathroomsChangeHandler=this.bathroomsChangeHandler.bind(this);
        this.propTypeChangeHandler=this.propTypeChangeHandler.bind(this);
        this.bedroomsChangeHandler=this.bedroomsChangeHandler.bind(this);
    }
    nextButton = (e) =>{
        e.preventDefault();
      
        this.props.history.push({
            pathname:"/locationpostbooking",
            state:this.state
        })
    }
    headlinesChangeHandler = (e)=>{
            this.setState({
                headlines:e.target.value
            })
    }
    propDescChangeHandler = (e)=>{
        this.setState({
            description:e.target.value
        })
    }
    accomodationChangeHandler = (e)=>{
        this.setState({
            accomodation:e.target.value
        })
    }
    bathroomsChangeHandler = (e)=>{
        this.setState({
            bathrooms:e.target.value
        })
    }
    propTypeChangeHandler = (e)=>{
        this.setState({
            propertyType:e.target.value
        })
    }
    bedroomsChangeHandler = (e)=>{
        this.setState({
            bedrooms:e.target.value
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
                <nav className="nav" style={{boxSizing : "border-box", backgroundColor: "#f4f4f4"}}>
                    <li className="navbar navbar-left header navbar-bce">
                        <div className="navbar-inner">
                            <div className="pull-left">
                                <a href="./Home/home.jsx" title="HomeAway" className="logo">
                                    <img style={{filter: "brightness(0)"}} src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
                                </a>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="navbar navbar-left" style={{margin:"10px"}}> 
                            <button className="btn btn-primary">My Account</button>                       
                        </div>
                    </li>
                    <li className="navbar navbar-right header header-bce-birdhouse-container">
                        <div className="flip-container">
                            <div className="flipper">
                                <div className="front btn-bce">
                                    <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                                </div>
                            </div>
                        </div>
                    </li>      
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
                                <Link to={{pathname:"/locationpostloc", state : this.state }}> Photos </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="card col-xl-10" style={{backgroundColor: "#f4f4f4", marginLeft:"350px", width:"80rem"}}>
                        <div className="card-header">
                            <h3 className="card-title">Describe your property</h3>
                        </div>
                        <div className="card-body">
                            <h6>Start out with a descriptive headline and a detailed summary of your property.</h6>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputHeadline"
                                        placeholder="Headline"
                                        onChange={this.headlinesChangeHandler}
                                        />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        id="inputPropertyDescription"
                                        rows="3"
                                        placeholder="Property Description"
                                        onChange={this.propDescChangeHandler}>
                                    </textarea>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputAccomodate"
                                        placeholder="Accomodate"
                                        onChange={this.accomodationChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputBathroom"
                                        placeholder="Bathrooms"
                                        onChange={this.bathroomsChangeHandler}/>
                                </div>
                               
                                <div className="form-group">
                                    <div className="col-md-3">
                                    <label className="mr-sm-2" for="inlineFormCustomSelect">Property type</label>
                                    <select className="form-control mr-sm-2" id="inlineFormCustomSelectPropertyType"  onChange={this.propTypeChangeHandler}>
                                        <option selected>Choose...</option>
                                        <option value="1">House</option>
                                        <option value="2">Apartment</option>
                                        <option value="3">Condo</option>
                                    </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-3">
                                        <label className="mr-sm-2" for="inlineFormCustomSelect">Bedrooms</label>
                                        <input
                                                type="number"
                                                className="form-control"
                                                id="inputBedrooms"
                                                placeholder="Bedrooms"
                                                onChange={this.bedroomsChangeHandler}/>
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
 
export default LocationPostingDetails;