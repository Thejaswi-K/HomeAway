import React, { Component } from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from "axios";
class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: cookie.load("owner"),
          firstname:"",
          lastname:"",
          email:"",
          propertyList: ""
        };
        this.logout=this.logout.bind(this);
    }
    logout = (e) => {
        cookie.remove("owner",{path : '/'})
        this.forceUpdate();
    }
    componentDidMount() {
        axios.get("http://localhost:3001/getownerProperties/" + this.state.username)
          .then(response => {
            console.log("getownerproperties",response.data);
            this.setState({
              propertyList: response.data
            });
          }).catch(function(error) {
            console.log(error);
          });
          axios.get("http://localhost:3001/getownerdetails/" + this.state.username)
          .then(response => {
            console.log("getownerdetails",response.data[0]);
            this.setState({
              firstname: response.data[0].firstname,
              lastname: response.data[0].lastname,
              email: response.data[0].email
            });
          }).catch(function(error) {
            console.log(error);
          });
      }
    render() {
        let redirectVar = null;
        if(!cookie.load('owner')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }  
        var allProperties = Array.prototype.slice.call(this.state.propertyList);
        console.log("state",this.state);
        return ( 
            <div>
                {redirectVar}
                <nav class="navbar" style={{boxSizing : "border-box", backgroundColor: "#f4f4f4"}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/locationpostwel">
                                <img  src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
                            </a>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li><a>Dashboard</a></li>
                                <li><a href="#">{this.state.username}</a></li>
                                <li><button className="btn btn-info" onClick={this.logout} style={{margin:"10px"}}>Signout</button></li>
                                <li>
                                    <a href="#">
                                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container row">
                    <div className="card col-xl-10" style={{backgroundColor: "#f4f4f4", marginLeft:"350px", width:"80rem"}}>
                        <div className="card-header">
                            <h1 className="card-title">Your Details</h1>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <div classname="form-group">
                                                <label className="">First Name</label>
                                                <input className="form-control" type="text" id="firstName" value={this.state.firstname}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <div classname="form-group">
                                                <label className="">Last Name</label>
                                                <input className="form-control" type="text" id="lastName" value={this.state.lastname}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-xs-6">
                                            <div classname="form-group">
                                                <label className="">Email</label>
                                                <input className="form-control" type="email" id="email" value={this.state.email}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card" style={{backgroundColor: "#f4f4f4", marginLeft:"350px", width:"80rem"}}>
                    <h4 style={{ marginLeft: "120px", marginTop: "40px" }}>Properties listed by you</h4>
                    {allProperties.map((property, i) => (
                        <div
                        className="card"
                        style={{
                            margin: "10px",
                            width: "60rem",
                            marginLeft: "120px",
                            boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                        }}
                        >
                        <ul
                            className="list-group list-group-flush"
                            style={{ margin: "10px" }}
                        >
                            <li
                            className="list-group-item"
                            key={i}
                            style={{ margin: "10px" }}
                            >
                            <div className="card-body">
                                <h4>{property.headlines}</h4>
                                <dl class="row">
                                    <dt class="col-sm-3">Description :</dt>
                                    <dd class="col-sm-9"> {property.description}</dd>
                                    <dt class="col-sm-3">Location :</dt>
                                    <dd class="col-sm-9"> {property.location}</dd>
                                    <dt class="col-sm-3">Price :</dt>
                                    <dd class="col-sm-9"> {property.price}</dd>
                                    <dt class="col-sm-3">Type :</dt>
                                    <dd class="col-sm-9"> {property.propertytype}</dd>
                                    <dt class="col-sm-3">from :</dt>
                                    <dd class="col-sm-9"> {property.availabilityfrom}</dd>
                                    <dt class="col-sm-3">to :</dt>
                                    <dd class="col-sm-9"> {property.availabilityto}</dd>
                                    <dt class="col-sm-3">Accomodates:</dt>
                                    <dd class="col-sm-9"> {property.accomodation}</dd>
                                    <dt class="col-sm-3">Bedrooms :</dt>
                                    <dd class="col-sm-9"> {property.bedrooms}</dd> 
                                    <dt class="col-sm-3">Bathrooms :</dt>
                                    <dd class="col-sm-9"> {property.bathrooms}</dd>    
                                </dl>  
                            </div>
                            </li>
                        </ul>
                        </div>
                    ))} 
                </div>
            </div>
         );
    }
}
 
export default OwnerDashboard;