
import React from 'react';
import "./ModalSale.css";

import SimpleKeypad from "../components/SimpleKeypad";

export default class ModalSale extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selection: 1,
            flat: 0,
            percent: 0,
            changed: false
        };

        this.keypadFlat = React.createRef();
        this.keypadPercent = React.createRef();
    }


    render(){
        //Whether or not to show modal
        let style = "";
        if(this.props.active === true){
            style = "modal-sale active";
        } else {
            style = "modal-sale inactive";
        }

        //Style the flat and percent buttons depending on which is active
        let styleFlat = "";
        let stylePercent = "";
        if(this.state.selection === 1){
            styleFlat = "selected"
            stylePercent = "";
        } else if(this.state.selection === 2){
            styleFlat = "";
            stylePercent = "selected";
        } else {
            styleFlat = "";
            stylePercent = "";
        }

        //Display either currency or percent keypad
        let keypadStyleFlat = "";
        let keypadStylePercent = "";
        if(this.state.selection === 1){
            keypadStyleFlat = "keypad show";
            keypadStylePercent = "keypad hide";
        } else if(this.state.selection === 2){
            keypadStyleFlat = "keypad hide";
            keypadStylePercent = "keypad show";
        }

        //Disable confirm button until sale is added
        let confirmButton = (<button onClick={() => this.handleConfirm()}>Confirm</button>);
        if(this.state.changed === false){
            confirmButton = (<button disabled onClick={() => this.handleConfirm()}>Confirm</button>)
        }

        return(
            <div className={style}>
                <div className="modal-overlay" onClick={() => this.handleClickOverlay()}></div>
                <div className="modal-content">
                    <h2 className="modal-title">{this.props.title}</h2>
                    <p className="modal-description">{this.props.description}</p>
                    <section className="sale-details">
                        <div className="description name">Name</div>
                        <div className="description qty">QTY</div>
                        <div className="description price">Price</div>
                        <div className="description flat">Flat</div>
                        <div className="description percent">Percent</div>
                        <div className="description total">Total</div>
                        <div className="name">
                            {this.props.selectedItem.name}
                        </div>
                        <div className="qty">
                            {this.props.selectedItem.qty}
                        </div>
                        <div className="price">
                            ${this.props.selectedItem.price}
                        </div>
                        <div className="sale-flat">
                            ${this.state.flat}
                        </div>
                        <div className="sale-percent">
                            {this.state.percent}%
                        </div>
                        <div className="total">
                            ${this.calculateTotal()}
                        </div>
                    </section>
                    <section className="sale-input">
                        <div className="sale-select">
                            <button onClick={this.handleClickFlat.bind(this)} className={styleFlat}>Flat</button>
                            <button onClick={this.handleClickPercent.bind(this)} className={stylePercent}>Percent</button>
                        </div>
                        <div className={keypadStyleFlat}>
                            <SimpleKeypad
                                ref={this.keypadFlat}
                                inputLength={this.props.inputLength}
                                inputType="currency"
                                error={this.props.error}
                                errorMessage={this.props.errorMessage}
                                handleConfirm={this.handleKeypadConfirm.bind(this)}
                            />
                        </div>
                        <div className={keypadStylePercent}>
                            <SimpleKeypad
                                ref={this.keypadPercent}
                                inputLength={this.props.inputLength}
                                inputType="percent"
                                error={this.props.error}
                                errorMessage={this.props.errorMessage}
                                handleConfirm={this.handleKeypadConfirm.bind(this)}
                            />
                        </div>
                    </section>
                    <section className="cta-buttons">
                        <button onClick={() => this.handleCancel()}>Cancel</button>
                        {confirmButton}
                    </section>
                </div>
            </div>
        )
    }

    handleKeypadConfirm(value){
        if(this.state.selection === 1){
            if(value > 0){
                this.setState({
                    flat: value / 100,
                    changed: true
                });
            } else {
                this.setState({
                    flat: 0,
                    changed: false
                })
            }
        } else if(this.state.selection === 2){
            if(value > 0){
                this.setState({
                    percent: value,
                    changed: true
                });
            } else {
                this.setState({
                    flat: 0,
                    changed: false
                })
            }
        }
    }

    handleKeypadReset(){
        this.keypadFlat.current.handleReset();
        this.keypadPercent.current.handleReset();
    }

    //Modal handlers

    //Confirm value and send to parent
    //Also reset state
    handleConfirm(value){
        this.props.handleConfirm(value);
        this.setState({
            flat: 0,
            percent: 0,
            selection: 1
        });

        this.handleKeypadReset();
    }

    //Cancel everything
    //Also reset state
    handleCancel(){
        this.props.handleCancel();
        this.setState({
            flat: 0,
            percent: 0,
            selection: 1
        });
        this.handleKeypadReset();
    }

    handleClickOverlay(){
        this.props.handleClickOverlay();
        this.setState({
            flat: 0,
            percent: 0,
            selection: 1
        });
        this.handleKeypadReset();
    }

    //Action handlers
    
    handleClickFlat(){
        this.setState({
            selection: 1
        });
        this.handleKeypadReset();
    }

    handleClickPercent(){
        this.setState({
            selection: 2
        });
        this.handleKeypadReset();
    }

    calculateTotal(){
        let value = this.props.selectedItem.price * this.props.selectedItem.qty;
        value -= value * (this.state.percent / 100);
        value -= this.state.flat;
        
        return value.toFixed(2);
    }
}