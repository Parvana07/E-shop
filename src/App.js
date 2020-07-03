import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./pages/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";
import CheckoutPage from "./pages/checkout/checkout.component";

const App = ({ checkUserSession, currentUser }) => {
  // unsubscribeFromAuth = null;
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }
  //in React we need to pass currentUser to header component:
  //currentUser={this.state.currentUser}

  //component={Homepage}

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
};

//using selector for memoization
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //this is for saving our data in firebase
  // collectionArray: selectCollectionsForPreview,
});

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser,
// });

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

//we dont do anything with currentuser, besides setting the value to it, thats why we dont need mapstateProps, and passing it as null
export default connect(mapStateToProps, mapDispatchToProps)(App);
