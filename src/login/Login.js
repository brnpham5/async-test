import React from 'react';

import "./Login.css";
import logo from "../assets/cc.svg";


import SimpleKeypad from "../components/SimpleKeypad";

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            failedLogin: false
        }
    }

    render(){
        return (
            <div className="login">
                <section className="login-input">
                    <p className="description">Please enter your ID</p>
                    <SimpleKeypad
                        inputLength={this.props.uidLength}
                        inputType="number"
                        error={this.state.failedLogin}
                        errorMessage="Invalid id"
                        handleConfirm={this.handleConfirm.bind(this)}
                    />
                </section>
                <aside className="login-info">
                    <section className="nav">
                        <button onClick={() => {this.handleClickManager()}}>Manager</button>
                        <button onClick={() => {this.handleClickHelp()}}>Help</button>
                        <button onClick={() => {this.handleClickExit()}}>Exit</button>
                    </section>
                    <img src={logo} className="logo" alt="Company Logo"></img>
                    <section className="datetime">
                        <p>Station: 01</p>
                        <p>{this.state.date}</p>
                        <p>{this.state.time}</p>
                    </section>
                </aside>
            </div>
        )
    }

    componentDidMount(){
        this.startClock();
    }

    componentWillUnmount(){
        this.stopClock();
    }

    handleConfirm(value){
        if(this.verifyId(value)){
            this.handleLogin(value);
        } else {
            this.setState({
                failedLogin: true
            });
        }
    }

    handleClickManager(){
        alert("Manager to station 01 please.");
    }

    handleClickHelp(){
        alert("Any 7 number id works.");
    }

    handleClickExit(){
        alert("You clicked Exit!");
    }

    handleChange(){

    }

    verifyId(value){
        if(value.length === this.props.uidLength){
            return true;
        } else {
            return false;
        }
    }

    handleLogin(value){
        this.setState({
            failedLogin: false
        });
        this.props.handleLogin(value);
    }

    startClock(){
        this.timer = setInterval(this.updateClock.bind(this), 1000);
    }

    stopClock(){
        clearInterval(this.timer);
    }

    updateClock(){
        let newTime = new Date().toLocaleTimeString();
        this.setState({
            time: newTime
        })
    }
}