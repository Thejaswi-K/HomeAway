import React, { Component } from 'react';
class CalculatorKey extends Component {
    constructor(){
        super();
        this.onKeyClick=this.onKeyClick.bind(this);
    }
    onKeyClick(){
        this.props.onKeyPressed(this.props.text);
    }

    render() { 
        return ( <button className="btn btn-default bttn" onClick={this.onKeyClick}>{this.props.text}</button> );
    }
}

export default CalculatorKey;