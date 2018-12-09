import axios from 'axios';
import {history} from '../history';

export const TRAVELLER_LOGIN_SUCCESS = 'TRAVELLER_LOGIN_SUCCESS';
export const TRAVELLER_LOGIN_FAILURE='TRAVELLER_LOGIN_FAILURE';

export const OWNER_LOGIN_SUCCESS = 'OWNER_LOGIN_SUCCESS';
export const OWNER_LOGIN_FAILURE = 'OWNER_LOGIN_FAILURE';
axios.defaults.withCredentials = true;


export const loginTraveller = (postData) => dispatch => {
    
    
    axios.post('http://localhost:3001/logintraveller',postData)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                dispatch({type:TRAVELLER_LOGIN_SUCCESS, message: "Login Succcessful"});
                history.push("/home");
                // this.setState({
                //     auth : true,
                //     ValidationMessage : ""
                // })
            }else{
                dispatch({type:TRAVELLER_LOGIN_FAILURE, message: "Login Failure"});
                // this.setState({
                //     authFlag : false,
                //     ValidationMessage : "Invalid Credentials" 
                // })
            }
        })
        
}

export const loginOwner = (postData) => dispatch => {
    axios.post('http://localhost:3001/loginowner',postData)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                dispatch({type:OWNER_LOGIN_SUCCESS, message: "Login Succcessful"});
                history.push("/locationpostwel");
                // this.setState({
                //     auth : true,
                //     ValidationMessage : ""
                // })
            }else{
                dispatch({type:OWNER_LOGIN_FAILURE, message: "Login Failure"});
                // this.setState({
                //     authFlag : false,
                //     ValidationMessage : "Invalid Credentials" 
                // })
            }
        })
}






    
  
    
