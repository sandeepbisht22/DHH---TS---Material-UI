import { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Rappers from "./component/Artist/rappers/Rappers";
import Rapper from "./component/Artist/rappers/Rapper";
import { Provider } from "react-redux";
import BeatProducers from "./component/Artist/beat Producer/BeatProducers";
import ReactionChannels from "./component/reaction Channel/ReactionChannels";
import BeatProducer from "./component/Artist/beat Producer/BeatProducer";
import Login from "./component/auth/Login";
import SignUp from "./component/auth/SignUp";
import PrivateRoute from "./component/routing/PrivateRoute";
import Alerts from "./component/layout/Alerts";
import Test from "./component/Test";
import User from "./component/pages/User";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div style={{ backgroundColor: "grey" }}>
          <Router>
            <Fragment>
              <Navbar></Navbar>
              <Alerts></Alerts>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <PrivateRoute
                  exact
                  path="/artist/rappers"
                  component={Rappers}
                />
                <PrivateRoute
                  exact
                  path="/artist/beatproducers"
                  component={BeatProducers}
                />
                <PrivateRoute
                  exact
                  path="/reactionChannels"
                  component={ReactionChannels}
                />
                <PrivateRoute
                  exact
                  path="/artist/rappers/:rapper"
                  component={Rapper}
                />
                <PrivateRoute
                  exact
                  path="/artist/beatproducers/:beatProducer"
                  component={BeatProducer}
                />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/test" component={Test} />
                <Route exact path="/user" component={User} />
              </Switch>
            </Fragment>
          </Router>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
