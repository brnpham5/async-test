import React from 'react';

import "./Inventory.css";

export default class Inventory extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            perRow: 5,
        }
    }

    render(){
        let renderedStock = this.renderStock();

        return(
            <div className="inventory">
                {renderedStock}
            </div>
        )
    }

    renderItem(name, id){
        let render;
        if(this.props.selectedItem.id === id){
            render = (<button className="item-button selected" key={id} onClick={() => {this.handleSelect(id)}} data-id={id}>{name}</button>)
        } else {
            render = (<button className="item-button" key={id} onClick={() => {this.handleSelect(id)}} data-id={id}>{name}</button>)
        }

        return render;
    }

    renderRow(items, index){
        let renderedItems = [];
        let currentItem;
        for(let i = 0; i < items.length; i++){
            currentItem = items[i];
            renderedItems.push(this.renderItem(currentItem.name, currentItem.id));
        }
        
        return(
            <div className="inventory-row" key={"inventory-row-" + index}>
                {renderedItems}
            </div>
        );
    }

    renderStock(){
        let renderedStock = [];
        const stock = this.props.stock;
        let row = [];
        let currentRow = 0;
        let currentCount = 0;
        for(let i = 0; i < stock.length; i++){
            if(currentCount >= this.state.perRow){
                currentCount = 0;
                currentRow++;
                renderedStock.push(this.renderRow(row, currentRow));
            }
            row[currentCount] = stock[i];
            currentCount++;
        }

        return renderedStock;
    }

    handleSelect(id){
        this.props.handleInventorySelect(id);
    }
}
