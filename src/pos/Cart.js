import React from 'react';

import "./Cart.css";


export default class Cart extends React.Component {
    render(){
        let renderedItems = [];
        const items = this.props.cartItems;
        let currentItem;
        for(let i = 0; i < items.length; i++){
            currentItem = items[i];
            renderedItems.push(this.renderItem(currentItem, i));
        }

        return (
            <div className="cart">
                <div className="cart-row edit">
                    <p className="item-name">{this.props.selectedItem.name}&nbsp;</p>
                    <button className="quantity minus" onClick={(event) => this.handleCartSubtract(event)}>-</button>
                    <input typeof="number" className="quantity input" value={this.props.selectedItem.qty} onChange={event => this.handleChange(event)}></input>
                    <button className="quantity plus" onClick={(event) => this.handleCartAdd(event)}>+</button>
                    <br></br>
                    <button className="quantity confirm" onClick={() => this.handleConfirm()}>Confirm</button>
                </div>
                <div className="cart-row description">
                    <h3 className="basket-description name">Name</h3>
                    <h3 className="basket-description id">Id</h3>
                    <h3 className="basket-description qty">Qty</h3>
                    <h3 className="basket-description price">Price</h3>
                </div>
                <div className="cart-row basket">
                    {renderedItems}
                </div>
            </div>
        )
    }

    renderItem(item, index){
        let className;
        if(this.props.selectedItem.id === item.id){
            className = "basket-row selected";
        } else {
            className = "basket-row";
        }

        return(
            <div className={className} key={"cart-" + index} onClick={() => this.handleCartSelect(item.id)}>
                <div className="basket-item name">{item.name}</div>
                <div className="basket-item id">{item.id}</div>
                <div className="basket-item qty">{item.qty}</div>
                <div className="basket-item total">${item.total.toFixed(2)} (${item.price.toFixed(2)})</div>
            </div>
        )
    }


    handleCartAdd(event){
        this.props.handleCartAdd();
    }

    handleCartSubtract(event){
        this.props.handleCartSubtract();
    }

    handleChange(event){
        
    }

    handleCartSelect(id){
        this.props.handleCartSelect(id);

    }

    handleConfirm(event){
        this.props.handleCartModify();
    }
}