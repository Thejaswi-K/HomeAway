import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Homepage from './components/homepage';
import TravellerLogin from './components/TravellerLogin';
import OwnerLogin from './components/OwnerLogin';
import OwnerSignup from './components/OwnerSignup';
import TravellerSignup from './components/TravellerSignup';

ReactDOM.render(<TravellerSignup />, document.getElementById('root'));
registerServiceWorker();
