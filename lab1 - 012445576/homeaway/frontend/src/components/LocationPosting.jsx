import React, { Component } from 'react';
class LocationPosting extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <div className="container">
                        <div className="navbar navbar-left header navbar-bce">
                            <div className="navbar-inner">
                                <div className="pull-left">
                                    <a href="./Home/home.jsx" title="HomeAway" className="logo">
                                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="navbar navbar-right header header-bce-birdhouse-container">
                            <div className="flip-container">
                                <div className="flipper">
                                    <div className="front btn-bce">
                                        <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
         );
    }
}
 
export default LocationPosting;