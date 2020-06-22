import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./pages/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selector";
import CheckoutPage from "./pages/checkout/checkout.component";

class App extends Component {
  //setting CurrentUser with React:
  // constructor() {
  //   super();
  //   this.state = {
  //     // currentUser: null,
  //   };
  // }
  unsubscribeFromAuth = null;
  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //returns object representing data that is currently stored  in our database, it is very similar to offStateChange
        userRef.onSnapshot((snapShot) => {
          //setting CurrentUser with React:
          //   this.setState({
          //     id: snapShot.id,
          //     ...snapShot.data(),
          //   });

          //setting current User with Redux:
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      }
      //setting CurrentUser with React:
      // this.setState({
      //   currentUser: userAuth,
      // });

      //setting current User with Redux:
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  //in React we need to pass currentUser to header component:
  //currentUser={this.state.currentUser}
  render() {
    //component={Homepage}
    const { currentUser } = this.props;
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              currentUser ? <Homepage /> : <Redirect to="/signin" />
            }
          />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/checkout"
            component={CheckoutPage}
            // render={() =>
            //   currentUser ? <CheckoutPage /> : <Redirect to="signin" />
            // }
          />
          <Route
            exact
            path="/signin"
            render={() =>
              currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
            }
          />
        </Switch>
      </div>
    );
  }
}

//using selector for memoization
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

//we dont do anything with currentuser, besides setting the value to it, thats why we dont need mapstateProps, and passing it as null
export default connect(mapStateToProps, mapDispatchToProps)(App);
