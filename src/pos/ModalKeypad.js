import React from "react";

import "./ModalKeypad.css";

import SimpleKeypad from "../components/SimpleKeypad";

export default class ModalKeypad extends React.Component{
    render(){
        let style = "";
        if(this.props.active === true){
            style = "modal-keypad active";
        } else {
            style = "modal-keypad inactive";
        }
        return (
            <div className={style}>
                <div className="modal-overlay" onClick={() => this.handleClickOverlay()}></div>
                <div className="modal-content">
                    <h2 className="title">{this.props.title}</h2>
                    <p>{this.props.description}</p>
                    <SimpleKeypad
                        inputLength={this.props.inputLength}
                        inputType="number"
                        error={this.props.error}
                        errorMessage={this.props.errorMessage}
                        handleConfirm={this.handleConfirm.bind(this)}
                    />
                    <section className="cta-buttons">
                        <button onClick={() => this.handleCancel()}>{this.props.cancelText}</button>
                    </section>
                </div>
            </div>
        )
    }

    handleConfirm(value){
        this.props.handleConfirm(value);
    }

    handleCancel(){
        this.props.handleCancel();
    }

    handleClickOverlay(){
        this.props.handleClickOverlay();
    }
}