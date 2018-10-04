import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import { Redirect } from "react-router";

import homeImage from "../../assets/homeImagec.jpg";
import homeAwayHeader from "../../assets/logo-bceheader-white.svg";
import logo from "../../assets/logo.png";
import "../../App.css";
export default class home extends Component {
  render() {
    //if Cookie is set render Logout Button
    let navLogin = null;
    if (cookie.load("cookie")) {
      console.log("Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right">
          <li>
            <Link to="/" onClick={this.handleLogout} style={{ color: "white" }}>
              <span class="glyphicon glyphicon-user" />
              Logout
            </Link>
          </li>
        </ul>
      );
    } else {
      //Else display login button
      console.log("Not Able to read cookie");
      navLogin = (
        <ul class="nav navbar-nav navbar-right" style={{ color: "white" }}>
          <li>
            <Link to="/login" style={{ color: "white" }}>
              <span class="glyphicon glyphicon-log-in" /> Login
            </Link>
          </li>
        </ul>
      );
    }
    let redirectVar = null;
    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/travelerLogin" />;
    }
    return (
      // <div style={{backgroundImage: "url(" + homeImage + ")"}}>

      <div className="Home-page">
        {/* <img src={homeImage} /> */}
        {redirectVar}
        <nav className="navbar navbar-static-top navbar-fixed-top">
          <div class="container-fluid">
            <div class="nav nav-tabs navbar-left  ">
              <a href="/travelerLogin">
                <img src={homeAwayHeader} />
              </a>
            </div>

            <div class="nav navbar-tabs navbar-right" id="menuitems">
              <ul class="nav justify-content-right">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    style={{ color: "white" }}
                    href="#"
                  >
                    Trip Boards
                  </a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    style={{ color: "white" }}
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Login
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="/travelerLogin">
                      Traveler Login
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      Owner Login{" "}
                    </a>
                  </div>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    style={{ color: "white" }}
                    data-toggle="dropdown"
                    href="#"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Help
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="/travelerLogin">
                      Visit Help Center
                    </a>
                    <div class="dropdown-divider" />
                    <a
                      class="dropdown-item"
                      style={{ fontWeight: "bold" }}
                      href="/ownerLogin"
                    >
                      Travelers{" "}
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      How it works{" "}
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      Security Center{" "}
                    </a>
                    <div class="dropdown-divider" />
                    <a
                      class="dropdown-item"
                      style={{ fontWeight: "bold" }}
                      href="/ownerLogin"
                    >
                      Homeowners{" "}
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      How it works{" "}
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      List your property{" "}
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      Community{" "}
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      Discovery Hub{" "}
                    </a>
                    <div class="dropdown-divider" />
                    <a
                      class="dropdown-item"
                      style={{ fontWeight: "bold" }}
                      href="/ownerLogin"
                    >
                      Property managers{" "}
                    </a>
                    <a class="dropdown-item" href="/ownerLogin">
                      List your properties{" "}
                    </a>
                  </div>
                </li>
                <li class="nav-item" style={{ color: "white" }}>
                  <a
                    className="btn btn-default btn-inverse"
                    style={{
                      borderRadius: "30px",
                      fontSize: "14px",
                      margin: "0px 15px",
                      padding: "12px 40px",
                      minHeight: "48px",
                      backgroundColor: "#fff",
                      color: "#0067db",
                      bordercolor: "#fff"
                    }}
                    data-bypass="true"
                    href="/ownerLogin"
                  >
                    List your property
                  </a>
                </li>
                <li class="nav-item" style={{ color: "white" }}>
                  <img
                    alt="HomeAway birdhouse"
                    class="site-header-birdhouse__image"
                    role="presentation"
                    src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"
                  />
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <div
          className="jumbotron jumbotron-fluid"
          style={{ background: "transparent" }}
        >
          <div className="container">
            <h1
              class="display-4"
              style={{
                fontSize: "40px",
                fontWeight: "400",
                letterSpacing: ".1px",
                textAlign: "left",
                lineHeight: "normal",
                fontFamily: "Lato, Arial, Helvetica",
                color: "white"
              }}
            >
              <div>Book beach houses, cabins,</div>
              <div>condos and more, worldwide</div>
            </h1>
            <div
              style={{
                position: "relative",
                borderRadius: "4px",
                margin: " 0 auto",
                padding: " 10px 10px 0px",
                background: "rgba(0,0,0,.2)",
                lineHeight: "1.5rem",
                color: "#5e6d77"
              }}
            >
              <form>
                <div className="form-row">
                  <div className="col col-form-label-lg">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Where do you want to go?"
                    />
                  </div>
                  <div className="col col-form-label-lg">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Arrive"
                    />
                  </div>
                  <div className="col col-form-label-lg">
                    <input
                      type="date"
                      class="form-control"
                      placeholder="Depart"
                    />
                  </div>
                  <div className="col col-form-label-lg">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Guest"
                    />
                  </div>
                  <div className="col col-form-label-lg">
                    <button
                      type="submit"
                      class="btn btn-lg btn-primary"
                      style={{ borderRadius: "30px", width: "200px" }}
                    >
                      Sign in
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="container" style={{paddingTop:"300px", color:"white", fontWeight:"bold", fontSize:"1.5em" }}>
            <div class="row">
              <div class="col-sm">
              <h4>Your whole vacation starts here
                </h4>
                <h5>
                Choose a rental from the world's best selection
                </h5>
              </div>
              <div class="col-sm">
              <h4>Book and stay with confidence
                </h4>
                <h5 style={{textUnderlinePosition}}>
                Secure payments, peace of mind
                </h5>
              </div>
              <div class="col-sm">One of three columns</div>
            </div>
          </div>
        </div>{" "}
        {/* Jumbotron */}
      </div>
    );
  }
}
