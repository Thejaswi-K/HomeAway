import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import TravellerLogin from './Logins&signups/TravellerLogin';
import Homepage from './Home/homepage';
import OwnerLogin from './Logins&signups/OwnerLogin';
import OwnerSignup from './Logins&signups/OwnerSignup';
import TravellerSignup from './Logins&signups/TravellerSignup';
import LocationPostingWel from './PropertyPosting/LocationPostingWelcome';
import LocationPostingLoc from './PropertyPosting/LocationPostingLocation';
import LocationPostingDetails from './PropertyPosting/LocationPostingDetails';
import LocationPostingBooking from './PropertyPosting/LocationPostingBookingOption';
import LocationPostingPrice from './PropertyPosting/LocationPostingPricing';
import LocationPostingAvailability from './PropertyPosting/LocationPostingAvailability';
import LocationPostingPhotos from './PropertyPosting/LocationPostingPhotos';
import OwnerDashboard from './Dashboard/OwnerDashboard';
import TravellerDashboard from './Dashboard/TravellerDashboard';

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={TravellerLogin}/>
                <Route path="/travellerlogin" component={TravellerLogin}/>
                <Route path="/home" component={Homepage}/>
                <Route path="/ownerlogin" component={OwnerLogin}/>
                <Route path="/ownersignup" component={OwnerSignup}/>
                <Route path="/travellersignup" component={TravellerSignup}/>
                <Route path="/locationpostwel" component={LocationPostingWel}/>
                <Route path="/locationpostloc" component={LocationPostingLoc}/>
                <Route path="/locationpostdetails" component={LocationPostingDetails}/>
                <Route path="/locationpostbooking" component={LocationPostingBooking}/>
                <Route path="/locationpostavailability" component={LocationPostingAvailability}/>
                <Route path="/locationpostpricing" component={LocationPostingPrice}/>
                <Route path="/locationpostphotos" component={LocationPostingPhotos}/>
                <Route path="/ownerdashboard" component={OwnerDashboard}/>
                <Route path="/travellerdashboard" component={TravellerDashboard}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;