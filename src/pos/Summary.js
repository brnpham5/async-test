import React from "react";

import "./Summary.css";

export default class Summary extends React.Component{

    render(){
        return(
            <div className="summary">
                <div className="description">
                    <span>Total: </span>
                    <span>Tax: </span>
                    <span>Net: </span>
                </div>
                <div className="cost">
                    <span>${this.props.summary.total.toFixed(2)}</span>
                    <span>${this.props.summary.tax.toFixed(2)}</span>
                    <span>${this.props.summary.net.toFixed(2)}</span>
                </div>
            </div>
        );
    }
}