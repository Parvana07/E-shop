import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        {/* <Route exact path="/topic" component={Topic} /> */}
        <Route exact path="/shop" component={ShopPage} />
        {/* <Route path="/hhh/topic/:topicId" component={TopicDetail} /> */}
      </Switch>
    </div>
  );
}

export default App;
