import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./pages/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unsubscribeFromAuth = null;
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //returns object representing data that is currently stored  in our database, it is very similar to offStateChange
        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot.id);
          this.setState({
            id: snapShot.id,
            ...snapShot.data(),
          });
          console.log(this.state);
        });
      }
      this.setState({
        currentUser: userAuth,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          {/* <Route exact path="/topic" component={Topic} /> */}
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signIn" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
