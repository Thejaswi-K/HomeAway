import React, { Component } from 'react';
import axios from "axios";
import cookie from "react-cookies";
import { Redirect, withRouter } from "react-router";
class TravellerSearch extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          username: cookie.load("traveller"),
          location: this.props.location.state == null ? "" : this.props.location.state.location,
          arrive: this.props.location.state == null ? "" : this.props.location.state.arrive,
          depart: this.props.location.state == null ? "" : this.props.location.state.depart,
          guest: this.props.location.state == null ? "" : this.props.location.state.guest,
          propertyList: ""
        };
        this.dashboardHandler=this.dashboardHandler.bind(this);
        this.logout=this.logout.bind(this);
        this.viewButton=this.viewButton.bind(this);
    }
    logout = (e) => {
        cookie.remove("traveller",{path : '/'})
        this.forceUpdate();
    }
    dashboardHandler = (e) =>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/travellerdashboard"
        })
    }
    viewButton =(e) => {
        console.log(this.state);
        e.preventDefault();
        console.log("propertyid value befor push",e.target.value)
        this.props.history.push({
            pathname: "/propertydetails",
            state:{ 
                propertyid: e.target.value,
                location: this.state.location,
                arrive: this.state.arrive,
                depart: this.state.depart,
                guest:this.state.guest
            }
          });
    }
    componentDidMount() {
        const data = this.state;
        console.log(data);
        axios.defaults.withCredentials = true;
        axios
          .post("http://localhost:3001/searchresults", data)
          .then(response => {
            console.log(response.data);
            this.setState({
              propertyList: response.data
            });
          })
          .catch(function(error) {
            console.log("errored");
            console.log(error);
          });
      }
    render() { 
        let redirectVar = null;
        if (!cookie.load("traveller")) {
        redirectVar = <Redirect to="/travellerlogin" />;
        }
        var allProperties = Array.prototype.slice.call(this.state.propertyList);
        return (    
            <div className="container-fluid">
                {redirectVar}
                {/* <div> */}
                <nav class="navbar" style={{boxSizing : "border-box", backgroundColor: "#f4f4f4"}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/home">
                                <img  src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
                            </a>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav navbar-right">
                                <li><button className="btn btn-primary" onClick={this.dashboardHandler} style={{margin:"10px"}}>Dashboard</button></li>
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
             

                <div className="container row">              
                <div className="card" style={{backgroundColor: "#f4f4f4", marginLeft:"350px", width:"80rem"}}>
                    <h4 style={{ marginLeft: "10px", marginTop: "40px" }}>Search Results</h4>
                    <div className="card-body">
                    {allProperties.map((property, i) => (
                        <div className="card"
                        style={{
                            margin: "10px",
                            width: "60rem",
                            marginLeft: "120px",
                            boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
                        }}
                        >
                            {/* <div >
                                <img  src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                            </div>
                            <div class="card" style={{
                                margin: "10px",
                                width: "60rem",
                                
                            }}> */}
                                <ul className="list-group list-group-flush" style={{ margin: "10px" }}>
                                    <li className="list-group-item" key={i} style={{ margin: "10px" }}>
                                        <div className="card-body">
                                            <h4>{property.headlines}</h4>
                                            <dl className="row">
                                                <dt class="col-sm-3">Description :</dt>
                                                <dd class="col-sm-9"> {property.description}</dd>
                                                <dt class="col-sm-3">Location :</dt>
                                                <dd class="col-sm-9"> {property.location}</dd>
                                                <dt class="col-sm-3">Price :</dt>
                                                <dd class="col-sm-9"> ${property.price}</dd>
                                                <dt class="col-sm-3">Type :</dt>
                                                <dd class="col-sm-9"> {property.propertytype}</dd>
                                                <dt class="col-sm-3">Accomodates:</dt>
                                                <dd class="col-sm-9"> {property.accomodation}</dd>
                                                <dt class="col-sm-3">Bedrooms :</dt>
                                                <dd class="col-sm-9"> {property.bedrooms}</dd> 
                                                <dt class="col-sm-3">Bathrooms :</dt>
                                                <dd class="col-sm-9"> {property.bathrooms}</dd>    
                                            </dl>
                                            <button
                                                style={{
                                                borderRadius: "30px",
                                                margin: "40px",
                                                paddingLeft: "20px",
                                                paddingRight: "20px"
                                                }}
                                                value = {property.propertyid}
                                                onClick={this.viewButton}
                                                type="button"
                                                class="btn btn-primary"
                                                >View Property</button>  
                                        </div>
                                    </li>
                                </ul>
                            {/* </div> */}
                        </div>
                    ))}
                    </div>
                </div>
                </div> 
            </div>
         );
    }

}
 
export default TravellerSearch;