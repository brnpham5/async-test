import React from "react";

import "./ModalBool.css";


export default class ModalBool extends React.Component{
    render(){
        let style = "";
        if(this.props.active === true){
            style = "modal-bool active";
        } else {
            style = "modal-bool inactive";
        }
        return (
            <div className={style}>
                <div className="modal-overlay" onClick={() => this.handleClickOverlay()}></div>
                <div className="modal-content">
                    <h2 className="title">{this.props.title}</h2>
                    <p className="description">
                        {this.props.description}
                    </p>
                    <section className="cta-buttons">
                        <button onClick={() => this.handleCancel()}>Cancel</button>
                        <button onClick={() => this.handleConfirm()}>Confirm</button>
                    </section>
                </div>
            </div>
        )
    }

    handleConfirm(){
        this.props.handleConfirm();
    }

    handleCancel(){
        this.props.handleCancel();
    }

    handleClickOverlay(){
        this.props.handleClickOverlay();
    }
}