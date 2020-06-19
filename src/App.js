import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./pages/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { setCurrentUser } from "./redux/user/user.actions";

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
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signIn"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

//we dont do anything with currentuser, besides setting the value to it, thats why we dont need mapstateProps, and passing it as null
export default connect(mapStateToProps, mapDispatchToProps)(App);
