import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import TravellerLogin from './TravellerLogin';
import Homepage from './homepage';
import OwnerLogin from './OwnerLogin';
import OwnerSignup from './OwnerSignup';
import TravellerSignup from './TravellerSignup';
import LocationPosting from './LocationPosting';
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
                <Route path="/locationpost" component={LocationPosting}/>
            </div>
        )
    }
}
//Export The Main Component
export default Main;