import React from 'react';
import Welcome from './mycomponents/welcome/Welcome'
import Jeopardy from './mycomponents/jeopardy/Jeopardy'
import Clock from './mycomponents/clock/Clock'
import Contact from './mycomponents/contact/Contact'
import Navigation from './mycomponents/navigation/Navigation'
import { Route } from "react-router-dom";
function App() {
  return (
    <div>

      <Navigation />
      <Route exact path="/" render={(props) => <Welcome {...props} name="Eric" />} />
      <Route path="/clock" component={Clock} />
      <Route path="/contact" component={Contact} />
      <Route path="/jeopardy" component={Jeopardy} />
    </div>
  );
}

export default App;
