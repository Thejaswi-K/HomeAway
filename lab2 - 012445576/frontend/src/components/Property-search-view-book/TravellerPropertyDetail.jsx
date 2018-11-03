import React, { Component } from 'react';
import axios from "axios";
import cookie from "react-cookies";
import { Redirect, withRouter } from "react-router";
class TravellerPropertyDetail extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: cookie.load("traveller"),
            propertyData: "",
            propertyid: this.props.location.state.propertyid,
            from: this.props.location.state.arrive,
            to:this.props.location.state.depart,
            status:""
        };
        this.logout=this.logout.bind(this);
        this.bookButton=this.bookButton.bind(this);
        this.dashboardhandler=this.dashboardhandler.bind(this);
    }
    dashboardhandler = (e)=>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/travellerdashboard"
        })
    };
    componentDidMount() {
        
        axios.defaults.withCredentials = true;
        axios
          .get("http://localhost:3001/getpropertydetails/" + this.state.propertyid)
          .then(response => {
            console.log(response.data);
            this.setState({
              propertyData: response.data
            });
            })
          .catch(function(error) {
            console.log("errored");
            console.log(error);
          });
      }
    logout = (e) => {
        cookie.remove("traveller",{path : '/'})
        this.forceUpdate();
    }
    dateChangeHandler =(e) =>{
        this.setState({
          [e.target.name] : e.target.value
        })
        
    }
    bookButton = (e) =>{
        console.log(this.state);
        e.preventDefault();
        axios.defaults.withCredentials = true;
        const data = {
          username : cookie.load("traveller"),
          propertyid : this.state.propertyData[0].propertyid,
          from : this.state.from,
          to : this.state.to
      };
      console.log(data);
       
        axios
        .post("http://localhost:3001/bookproperty", data)
        .then(response => {
          console.log("Status Code : ", response.status);
          //   if (response.status === 200) {
          // }

          this.setState({
           
            status:"Property Booked, headover to Trips"
          })
          //call updateProperty
          console.log("trip creation successful");
        })
        .catch(function(error) {
          console.log("errored");
          console.log(error);
          this.setState({ 
            status:"User Creation failed, Retry with another username"
          })
        });
    }
    render() { 
        let redirectVar = null;
        if (!cookie.load("traveller")) {
        redirectVar = <Redirect to="/travellerlogin" />;
        }
        var alldata = Array.prototype.slice.call(this.state.propertyData);
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
                                <li><button className="btn btn-primary" onClick={this.dashboardhandler} style={{margin:"10px"}}>dashboard</button></li>
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
                <div className="card" style={{backgroundColor: "#f4f4f4", marginLeft:"350px", width:"80rem"}}>
                    
                    {alldata.map((property,i) => (
                        <div>
                            <h3>{property.propertyName}</h3>
                            <dl class="row">
                                <dt class="col-sm-3">Description :</dt>
                                <dd class="col-sm-9"> {property.description}</dd>
                                <dt class="col-sm-3">Location :</dt>
                                <dd class="col-sm-9"> {property.location}</dd>
                                <dt class="col-sm-3">Price :</dt>
                                <dd class="col-sm-9"> ${property.price}</dd>
                                <dt class="col-sm-3">Property Type</dt>
                                <dd class="col-sm-9"> {property.propertytype}</dd>
                                <dt class="col-sm-3">Accomodates</dt>
                                <dd class="col-sm-9"> {property.accomodation}</dd>
                                <dt class="col-sm-3">Bedrooms</dt>
                                <dd class="col-sm-9"> {property.bedrooms}</dd>
                            </dl>
                            <div className="container row">
                            <form>
                                
                                    <div className="container">
                                    <button style={{margin:"10px"}}
                                            type="button"
                                            class="btn btn-warning"
                                            onClick={this.bookButton}
                                        >
                                        Book
                                    </button>
                                    <label>
                                        {this.state.status}
                                    </label>
                                    </div>
                                
                            </form>
                            </div>
                        </div>
                        )
                    )}
                    
                </div>
            </div>
            
         );
    }
}
 
export default TravellerPropertyDetail;