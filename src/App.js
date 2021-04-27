import './App.css';
import React from 'react';

import Login from "./login/Login";
import POS from "./pos/Pos";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      uid: 0,
      uidLength: 7,
      isLoggedIn: false,
    }
  }

  render(){
    let screen;
    if(this.state.isLoggedIn === false){
      screen = (
        <Login 
          uidLength={this.state.uidLength}
          isLoggedIn={this.state.isLoggedIn}
          handleLogin={this.handleLogin.bind(this)}
        />
      );
    } else if(this.state.isLoggedIn === true){
      screen = (
        <POS
          uid= {this.state.uid}
          uidLength={this.state.uidLength}
          isLoggedIn={this.state.isLoggedIn}
          handleLogout={this.handleLogout.bind(this)}
        />
      );
    }

    return(
      <div className="App">
        {screen}
      </div>
    )
  }
  

  handleLogin(uid){
    this.setState({
      uid: uid,
      isLoggedIn: true
    });
  }

  handleLogout(){
    this.setState({
      isLoggedIn: false
    });
  }
}

/*

var myPromise = new Promise(function(myResolve, myReject) {
  setTimeout(function() { myResolve("I love You !!"); }, 3000);
});

var p1 = new Promise((res) => {setTimeout(() => {res(1);}, 5000)});
var p2 = new Promise((res) => {setTimeout(() => {res(2);}, 7000)});
var p3 = new Promise((res) => {res("we're all good")});

async function MyPromiseAll(arr){
  let result = await new Promise((response) => {
    let count = 0;
    let temp = [];
    for(let i = 0; i < arr.length; i++){
      arr[i].then(res => {
        count++;
        temp[i] = res;
        if(count === arr.length){
          response(temp);
        }
      });
    }
  });

  return result;
}

myPromise.then((res) => {
  console.log(res);
});

var temp = MyPromiseAll([p1, p2, p3]);
temp.then((res) => {
  console.log(res);
});
*/