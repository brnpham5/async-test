import React from 'react';

import "./Pos.css";
import Cart from "./Cart";
import Inventory from "./Inventory";
import ModalBool from './ModalBool';
import Summary from './Summary';
import ModalKeypad from './ModalKeypad';
import ModalSale from './ModalSale';

export default class POS extends React.Component {
    constructor(props){
        super(props);

        this.state = {
          selectedItem: {"name": "", "id": 0, "qty": 0, "price": 0, "total": 0},
          cartItems: [],
          summary: {"total": 0, "tax": 0, "net": 0},
          taxRate: 0.0875,
          modalBool: false,
          modalKeypad: false,
          modalSale: false,
          modalError: false,
          modalTitle: "",
          modalDescription: "",
          modalErrorMessage: "",
          stock : [
            {"name": "Apple", "id": 10000,  "price": 1.19},
            {"name": "Orange", "id": 10100,  "price": 0.89},
            {"name": "Grape", "id": 10200,  "price": 2.69},
            {"name": "Banana", "id": 10300,  "price": 0.54},
            {"name": "Peach", "id": 10400,  "price": 1.15},
            {"name": "Lettuce", "id": 20000,  "price": 0.79},
            {"name": "Tomato", "id": 20100,  "price": 0.65},
            {"name": "Onion", "id": 20200,  "price": 0.47},
            {"name": "Cucumber", "id": 20300,  "price": 1.01},
            {"name": "Broccoli", "id": 30000,  "price": 0.99},
            {"name": "Spaghetti", "id": 30100,  "price": 1.29},
            {"name": "Linguine", "id": 30200,  "price": 1.33},
            {"name": "Penne", "id": 30300,  "price": 1.54},
            {"name": "Ravioli", "id": 30400,  "price": 1.67},
            {"name": "Lasagne", "id": 30500,  "price": 1.89},
            {"name": "Milk", "id": 40000,  "price": 4.89},
            {"name": "Cheddar", "id": 40100,  "price": 8.65},
            {"name": "Yogurt", "id": 40200,  "price": 6.21},
            {"name": "Brie", "id": 40300,  "price": 10.11},
            {"name": "Sour Cream", "id": 40400,  "price": 4.78},
            {"name": "Beef", "id": 50000,  "price": 5.99},
            {"name": "Pork", "id": 50100,  "price": 4.57},
            {"name": "Chicken", "id": 50200,  "price": 3.64},
            {"name": "Duck", "id": 50300,  "price": 6.12},
            {"name": "Goat", "id": 50400,  "price": 7.01},
            {"name": "Bass", "id": 60000,  "price": 6.73},
            {"name": "Catfish", "id": 60100,  "price": 5.21},
            {"name": "Spelt", "id": 60200,  "price": 3.33},
            {"name": "Shrimp", "id": 60300,  "price": 5.41},
            {"name": "Squid", "id": 60400,  "price": 6.72},
            {"name": "Salmon", "id": 60500,  "price": 7.41},
            {"name": "Detergent", "id": 70000,  "price": 15.22},
            {"name": "Shampoo", "id": 70100,  "price": 10.26},
            {"name": "Conditioner", "id": 70200,  "price": 10.07},
            {"name": "Hand Soap", "id": 70300,  "price": 7.19},
            {"name": "Facial Scrub", "id": 70400,  "price": 8.29},
          ],
        }


        /**
         * State Machine Section
         */
        this.inTransition = false;
        this.onConfirm = {};
        this.onCancel = {};
        this.onClickOverlay = {};
        
        this.StateDefault = {
          Enter: () => {
            console.log("default enter");
          },
          Exit: () => {
            console.log("default exit");
          }
        }

        this.StateLogout = {
          Enter: () => {
            this.setState({
              modalBool: true,
              modalTitle: "Log out?",
              modalDescription: "Hit confirm to return to login screen"
            });
            this.onConfirm = () => {this.logout()};
            this.onCancel = () => {this.Transition(this.StateDefault)};
            this.onClickOverlay = () => {this.Transition(this.StateDefault)};
            console.log("logout enter");
          },
          Exit: () => {
            this.setState({
              modalBool: false
            });
            this.onConfirm = null;
            this.onCancel = null;
            this.onClickOverlay = null;
            console.log("logout exit");
          }
        }

        this.StateLock = {
          Enter: () => {
            this.setState({
              modalKeypad: true,
              modalTitle: "Station Locked",
              modalDescription: "Enter id to resume session",
              modalErrorMessage: "Invalid id"
            });
            this.onConfirm = this.VerifyId;
            this.onCancel = this.logout;
            this.onClickOverlay = () => {};
            console.log("lock enter");
          },
          Exit: () => {
            this.setState({
              modalKeypad: false,
              modalError: false
            });
            this.onConfirm = null;
            this.onCancel = null;
            this.onClickOverlay = null;
            console.log("lock exit");
          }
        }

        this.StateSale = {
          Enter: () => {
            this.setState({
              modalSale: true,
              modalTitle: "Sale",
              modalDescription:"Add flat or percent sale",
              modalErrorMessage: "Invalid sale"
            });
            this.onConfirm = () => {this.Transition(this.StateDefault)};
            this.onCancel = () => {this.Transition(this.StateDefault)};
            this.onClickOverlay = () => {this.Transition(this.StateDefault)};
            console.log("sale enter");
          },
          Exit: () => {
            this.setState({
              modalSale: false,
              modalError: false
            });
            this.onConfirm = null;
            this.onCancel = null;
            this.onClickOverlay = null;
            console.log("sale exit");
          }
        }

        this.StatePay = {
          Enter: () => {
            console.log("pay enter");
          },
          Exit: () => {
            this.setState({
              modalError: false
            });
            this.onConfirm = null;
            this.onCancel = null;
            console.log("pay exit");
            
          }
        }

        this.Transition(this.StateTest);
      }

      render(){
        return (
          <div className="pos">
            <ModalBool
              active={this.state.modalBool}
              title={this.state.modalTitle}
              description={this.state.modalDescription}
              handleCancel={this.handleCancel.bind(this)}
              handleConfirm={this.handleConfirm.bind(this)}
              handleClickOverlay={this.handleClickOverlay.bind(this)}
            />
            <ModalKeypad
              inputLength={this.props.uidLength}
              active={this.state.modalKeypad}
              error={this.state.modalError}
              cancelText={"Log out"}
              canCancel={false}
              title={this.state.modalTitle}
              description={this.state.modalDescription}
              errorMessage={this.state.modalErrorMessage}
              handleCancel={this.handleCancel.bind(this)}
              handleConfirm={this.handleConfirm.bind(this)}
              handleClickOverlay={this.handleClickOverlay.bind(this)}
            />
            <ModalSale
                inputLength={12}
                active={this.state.modalSale}
                error={this.state.modalError}
                cancelText={"Cancel"}
                canCancel={true}
                selectedItem={this.state.selectedItem}
                title={this.state.modalTitle}
                description={this.state.modalDescription}
                errorMessage={this.state.modalErrorMessage}
                handleCancel={this.handleCancel.bind(this)}
                handleConfirm={this.handleConfirm.bind(this)}
                handleClickOverlay={this.handleClickOverlay.bind(this)}
            />
            <div className="grid-container">
              <section className="grid-item cart">
                <Cart 
                  cartItems={this.state.cartItems}
                  selectedItem={this.state.selectedItem}
                  handleCartAdd={this.handleCartAdd.bind(this)}
                  handleCartSubtract={this.handleCartSubtract.bind(this)}
                  handleCartModify={this.handleCartModify.bind(this)}
                  handleCartSelect={this.handleCartSelect.bind(this)}
                /> 
              </section>
              <section className="grid-item inventory">
                <Inventory 
                  stock={this.state.stock}
                  selectedItem={this.state.selectedItem}
                  handleInventorySelect={this.handleInventorySelect.bind(this)}
                />
              </section>
              <section className="grid-item summary">
                <Summary
                  summary={this.state.summary}
                />
              </section>
              <section className="grid-item checkout">
                <button className="checkout-button" onClick={() => this.handleLogout()}>Logout</button>
                <button className="checkout-button" onClick={() => this.handleLock()}>Lock</button>
                <button className="checkout-button" onClick={() => this.handleSale()}>Sale</button>
                <button className="checkout-button" onClick={() => this.handlePay()}>Pay</button>
              </section>
            </div>
          </div>
        );
      }

      //State Machine
      Transition(state){
        if (this.currentState === state || this.inTransition) {
          return;
        }
    
        this.inTransition = true;
    
        if (this.currentState !== undefined && this.currentState !== null) {
          this.currentState.Exit();
        }
    
        this.currentState = state;
    
        if (this.currentState !== undefined && this.currentState !== null) {
          this.currentState.Enter();
        }
    
        this.inTransition = false;
    
        }

      //Cart Callbacks
      handleCartAdd(){
        let item = {
          "name": this.state.selectedItem.name, 
          "id": this.state.selectedItem.id, 
          "qty": this.state.selectedItem.qty + 1, 
          "price": this.state.selectedItem.price,
          "total": this.state.selectedItem.price * this.state.selectedItem.qty
        }
    
        this.setState({
          selectedItem: item
        })
      }
    
      handleCartSubtract(){
        let item = {
          "name": this.state.selectedItem.name, 
          "id": this.state.selectedItem.id, 
          "qty": this.state.selectedItem.qty - 1, 
          "price": this.state.selectedItem.price,
          "total": this.state.selectedItem.price * this.state.selectedItem.qty
        }
        if(item.qty <= 0){
          item.qty = 0;
        }
        this.setState({
          selectedItem: item
        });
      }
    
      handleCartModify(){
        let item = this.state.selectedItem;
        //If there's no items
        if(item.id === 0){
          return;
        }
    
        //Check if it's already in the cart
        let index = this.state.cartItems.findIndex((cart) => {
          return item.id === cart.id;
        });
    
        //Delete - check qty = 0 and in cart
        if(item.qty <= 0 && index >= 0){
          this.cartRemove(index);
        //Update - check qty > 0 and in cart
        } else if(item.qty > 0 && index >= 0){
          this.cartUpdate(index, item.qty);
        //Add - check qty > 0 but not in cart
        } else if(item.qty > 0 && index === -1){
          this.cartAdd(item, item.qty);
        }
    
        this.calculateSummary();
      }

      handleCartSelect(id){
        this.setSelectedItem(id);
      }


      //State - Summary 
      calculateSummary(){
        let total = 0;
        let tax = 0;
        let net = 0;
        let item;
        for(let i = 0; i < this.state.cartItems.length; i++){
          item = this.state.cartItems[i];
          net += item.total;
        }
    
        tax = net * this.state.taxRate;
        total = net + tax;
    
        this.setState({
          summary: {
            "total": total,
            "tax": tax,
            "net": net
          }
        });
      }
      

      //State - Cart
      cartAdd(item, qty){
        let cart = this.state.cartItems;
        item.total = this.calculateICartItemTotal(item.id, qty);
        cart.push(item);
        this.setState({
          cartItems: cart
        });
      }
    
      cartRemove(index){
        let cartItems = this.state.cartItems;
        cartItems.splice(index, 1);
        let newCart = cartItems;
        this.setState({
          cartItems: newCart
        });
        return;
      }
    
      cartUpdate(index, qty){
        let cartItems = this.state.cartItems;
        let item = cartItems[index];
        item.qty = qty;
        item.total = this.calculateICartItemTotal(item.id, qty);
        this.setState({
          cartItems: cartItems
        });
      }

      //Inventory Callbacks
      handleInventorySelect(id){
        this.setSelectedItem(id);
      }

      //Checkout Callbacks
      handleLogout() {
        this.Transition(this.StateLogout);
      }

      handleLock(){
        this.Transition(this.StateLock);
      }

      handleSale(){
        this.Transition(this.StateSale);
      }

      handlePay(){
        this.Transition(this.StatePay);
      }

      //Modal Callbacks
      handleConfirm(value){
        this.onConfirm(value);
      }

      handleCancel(value){
        this.onCancel(value);
      }

      handleClickOverlay(value){
        this.onClickOverlay(value);
      }

      //Logout Methods
      logout(){
        this.props.handleLogout();
      }

      //Lock Methods
      VerifyId(value){
        if(this.props.uid === value){
          this.Transition(this.StateDefault);
        } else {
          this.setState({
            modalError: true
          });
          return;
        }
      }

      //Sale Methods

      //Pay Methods
      
      //State - Inventory
      calculateICartItemTotal(id, qty){
        const stock = this.getItemStock(id);
        return stock.price * qty;
      }

      setSelectedItem(id){
        let item = this.getItemCart(id);
        if(item === undefined || item === null){
          const itemStock = this.getItemStock(id);
          item = {
            "name": itemStock.name,
            "id": itemStock.id,
            "price": itemStock.price,
            "qty": 1,
            "total": itemStock.price,
            "saleFlat": 0,
            "salePercent": 0
          }
        }
    
        this.setState({
          selectedItem: item
        });
      }
    
      //Helper Functions
      getItemStock(id){
        return this.state.stock.find(item => item.id === parseInt(id));
      }
    
      getItemCart(id){
        let item = this.state.cartItems.find(item => item.id === parseInt(id));
        return item;
      }
}