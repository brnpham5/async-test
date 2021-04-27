import React from 'react';


import "./SimpleKeypad.css";

export default class SimpleKeypad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: ""
        }
    }

    render(){
        let input = this.renderInput();
        return (
            <div className="keypad">
                {input}
                <section className="buttons">
                    <button onClick={() => this.handleClickNumber("7")}>7</button>
                    <button onClick={() => this.handleClickNumber("8")}>8</button>
                    <button onClick={() => this.handleClickNumber("9")}>9</button>
                    <button onClick={() => this.handleClickNumber("4")}>4</button>
                    <button onClick={() => this.handleClickNumber("5")}>5</button>
                    <button onClick={() => this.handleClickNumber("6")}>6</button>
                    <button onClick={() => this.handleClickNumber("1")}>1</button>
                    <button onClick={() => this.handleClickNumber("2")}>2</button>
                    <button onClick={() => this.handleClickNumber("3")}>3</button>
                    <button onClick={() => this.handleClickDelete()}>Delete</button>
                    <button onClick={() => this.handleClickNumber("0")}>0</button>
                    <button onClick={() => this.handleConfirm()}>Enter</button>
                </section>
                {this.props.error ? (<span className="error-text">{this.props.errorMessage}</span>): (<span>&nbsp;</span>)}
            </div>
        );
    }

    renderInput(){
        let input;
        
        switch(this.props.inputType){
            case "currency":
                let value = parseInt(this.state.input) / 100;
                if(isNaN(value)){
                    value = 0;
                }
                input = (
                    <span className="keypad-input">{"$" + value.toFixed(2)}&nbsp;</span>
                );
            break;
            case "percent":
                input = (
                    <span className="keypad-input">{this.state.input + "%"}&nbsp;</span>
                )
            break;
            default:
                input = (
                    <span className="keypad-input">{this.state.input}&nbsp;</span>
                );
            break;
        }
        return input;
    }

    handleClickNumber(value){
        if(this.state.input.length >= this.props.inputLength){
            return;
        }

        switch(this.props.inputType){
            case "currency":
                //Don't allow 0's if it's the first number
                if(this.state.input === "" && value === "0"){
                    return;
                } else {
                    let temp = this.state.input.concat(value);
                    this.setState({
                        input: temp
                    });
                }
            break;
            case "percent":
                //Don't allow 0's if it's the first number and don't allow any inputs length > 3
                if((this.state.input === "" && value === "0") || this.state.input.length > 2){
                    return;
                } else {
                    let temp = this.state.input.concat(value);
                    if(parseInt(temp) > 100){
                        temp = "100";
                    }
                    this.setState({
                        input: temp
                    });
                }
            break;
            default:
                let temp = this.state.input.concat(value);
                this.setState({
                    input: temp
                });
            break;
        }
    }

    handleClickDelete(){
        if(this.state.input.length <= 0){
            return;
        }

        let temp = this.state.input.slice(0, -1);
        this.setState({
            input: temp
        });
    }

    handleConfirm(){
        this.props.handleConfirm(this.state.input);

        this.setState({
            input: ""
        });
    }

    handleChange(event){
        event.preventDefault();
    }

    handleReset(){
        this.setState({
            input: ""
        });
    }
}