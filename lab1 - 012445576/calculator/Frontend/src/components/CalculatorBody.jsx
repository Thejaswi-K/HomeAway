import React, { Component } from 'react';
import DisplayField from './DisplayField'
import CalculatorKey from './CalculatorKey';
import axios from "axios";
class CalculatorBody extends Component {
    constructor(){
        super()
        this.state = {exp: '0'}
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onEqualsPressed = this.onEqualsPressed.bind(this);
        this.onClearPressed = this.onClearPressed.bind(this);
    }
    onKeyPressed(text){
            this.setState((prevState) => ({exp: prevState.exp === '0' ? text : prevState.exp + text}))
    }
    onEqualsPressed(){
        //use eval
        const data ={
            exp: this.state.exp
        };
        //console.log(data)
        axios.post("http://localhost:3001/calculate", data )
        .then(response => {
            this.setState({ exp: response.data.exp });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
    onClearPressed(){
        this.setState({ exp: '0'})
    }

    render() { 
        return ( 
            <div>
                <tr>
                    <td colspan="4"><DisplayField exp={this.state.exp} /></td>
                </tr>
                <tr>
                    <td><CalculatorKey text='1' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='2' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='3' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='4' onKeyPressed={this.onKeyPressed}/></td>
                </tr>
                <tr>
                    <td><CalculatorKey text='5' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='6' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='7' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='8' onKeyPressed={this.onKeyPressed}/></td>
                </tr>
                <tr>
                    <td><CalculatorKey text='9' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='0' onKeyPressed={this.onKeyPressed}/></td>
                    <td colspan="2"><CalculatorKey text='.' onKeyPressed={this.onKeyPressed}/></td>
                </tr>
                <tr>
                    <td><CalculatorKey text='+' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='-' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='*' onKeyPressed={this.onKeyPressed}/></td>
                    <td><CalculatorKey text='/' onKeyPressed={this.onKeyPressed}/></td>  
                </tr>
                <tr>
                    <td colspan="3">
                        <button className="btn btn-info bttn bttne" onClick={this.onClearPressed}>AC</button>
                    </td>
                    <td colspan="1">
                        <button className="btn btn-success bttn bttne" onClick={this.onEqualsPressed}>=</button>
                    </td>
                </tr>        
            </div>
         );
    }
}
 
export default CalculatorBody;