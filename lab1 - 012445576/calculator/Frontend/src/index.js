import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import CalculatorBody from './components/CalculatorBody';

ReactDOM.render(<CalculatorBody />, document.getElementById('root'));
registerServiceWorker();
