import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Quizzer from "./Quizzer";
import Review from "./Review";

class Main extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <div className="container">
                                <Link to={'/'} className="navbar-brand">Online Test App</Link>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <Link to={'/'} className="nav-link">Home</Link>
                                        </li>
                                    </ul>
                                </div></div>
                        </nav> <br />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/review' render={(props) => <Review {...props} />} />
                            <Route exact path='/quizzer/:id' component={Quizzer} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Main;