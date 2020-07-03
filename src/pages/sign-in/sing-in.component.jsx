import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../customButton/custom-button.component";
// import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({ emailSignInStart, googleSignInStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // await auth.signInWithEmailAndPassword(email, password);
      // this.setState({ email: "", password: "" });
      emailSignInStart(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I have already an account</h2>
      <span> Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          label="Email"
          value={email}
          handleChange={handleChange}
          required
        />

        <FormInput
          name="password"
          type="password"
          label="Password"
          value={password}
          handleChange={handleChange}
          required
        />
        <div className="buttons">
          <CustomButton type="submit">Sign In</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, mapDispatchToProps)(SignIn);
