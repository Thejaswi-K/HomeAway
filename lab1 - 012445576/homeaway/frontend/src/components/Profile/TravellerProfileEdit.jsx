import React, { Component } from 'react';
import cookie from "react-cookies";
import { Redirect } from "react-router";
import axios from "axios";
class TravellerprofileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: cookie.load("traveller"),
            email : "",
            aboutme : "",
            firstname : "",
            lastname  : "",
            city : "",
            country : "",
            gender : "",
            company : "",
            hometown : "",
            languages :"",
            profileimage : "",
            phonenumber : "",
            school : ""
        };
        this.valueChangeHandler = this.valueChangeHandler.bind(this);
        this.editHandler = this.editHandler.bind(this);
        this.logout=this.logout.bind(this);
        this.dashboardHandler=this.dashboardHandler.bind(this);  
    }
    logout = (e) => {
        cookie.remove("traveller",{path : '/'})
        this.forceUpdate();
    }
    valueChangeHandler = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    dashboardHandler = (e) =>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/travellerdashboard"
        })
    }
    editHandler = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username: this.state.username,
            email : this.state.email,
            aboutme : this.state.aboutme,
            firstname : this.state.firstname,
            lastname  : this.state.lastname,
            country : this.state.country,
            city : this.state.city,
            gender : this.state.gender,
            company : this.state.company,
            hometown : this.state.hometown,
            languages :this.state.languages,
            profileimage : this.state.profileimage,
            phonenumber : this.state.phonenumber,
            school : this.state.school
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/travellerprofileedit',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    console.log("update successful");  
                }else{
                    console.log("Password or username is invalid")
                }
            })
            .catch((error) => {
                if (error.response) {
                console.log(error);
                }            
            });
    }
    render() { 
        let redirectVar = null;
        if(!cookie.load('traveller')){
            redirectVar = <Redirect to= "/travelerlogin"/>
        }
        return ( 
            <div>
                {redirectVar}
                <nav class="navbar" style={{boxSizing : "border-box", backgroundColor: "#f4f4f4"}}>
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <a class="navbar-brand" href="/home">
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
                <div className="card col-md-8" style={{  }}>
                    <form>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="First Name" name="firstname"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <   input type="text" className="form-control" placeholder="Last Name" name="lastname" onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Email" name="email"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="About me" name="aboutme"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Phone Number" name="phonenumber"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="School" name="school"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Company" name="company"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Hometown" name="hometown"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="City" name="city"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Country" name="country"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Gender" name="gender"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Languages" name="languages"  onChange={this.valueChangeHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <button onClick={this.editHandler} type="button" class="btn btn-primary btn-sm" >Edit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
         );
    }
}
 
export default TravellerprofileEdit;