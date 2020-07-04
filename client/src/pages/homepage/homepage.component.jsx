import React from "react";

import Directory from "../directory/directory-component";

import { HomePageContainer } from "./homepage.styles";
// import "./homepage.styles.scss";

const Homepage = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};
export default Homepage;
