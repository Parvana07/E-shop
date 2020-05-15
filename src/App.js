import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";

const Hats = (props) => {
  console.log(props);
  return (
    <div>
      <h1>Hats</h1>
    </div>
  );
};
// const Homepage = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <button onClick={() => props.history.push("/topic")}>Topic</button>
//       <h1>Homepage</h1>
//     </div>
//   );
// };

const TopicDetail = (props) => {
  // console.log(props.match.params.topicId);
  console.log(props);
  return (
    <div>
      <h1>Topic Detail Page</h1>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      {/* <Route exact path="/topic" component={Topic} /> */}
      <Route exact path="/shop/hats" component={Hats} />
      <Route path="/hhh/topic/:topicId" component={TopicDetail} />
    </div>
  );
}

export default App;
