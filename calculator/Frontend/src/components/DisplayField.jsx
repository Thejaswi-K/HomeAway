import React, { Component } from 'react';
class DisplayField extends Component {
    render() { 
        return ( <input type='text' value={this.props.exp} disabled='true'/> );
    }
}
 
export default DisplayField;