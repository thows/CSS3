import React from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

export default class App extends React.Component {


    render() {
        return (
            <Router>
                <div className="container-fluid" id="container">
                    <div className="row">
                        <div className="col-xs-3 col-sm-2"></div>
                        <div className="col-xs-12 col-sm-8">
                            <nav className="navbar navbar-inverse">
                                <div className="container-fluid">
                                    <ul className="nav navbar-nav">
                                        <li>
                                            <Link to="/">首页</Link>
                                        </li>
                                        <li>
                                            <Link to="/about">战队介绍</Link>
                                        </li>
                                        <li>
                                            <Link to="/login">视频</Link>
                                        </li>

                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <Route style={this.backAndTextColor} exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        );
    }
}

function Home() {
    const backAndTextColor = {
        backgroundColor: 'red',
        color: 'white',
        fontSize: 40,
        height:100,
    };
    return (
        <div style={backAndTextColor}>
            <h2>Home</h2>
        </div>
    );
}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Login() {
    return (
        <div>
            <h2>Login</h2>
        </div>
    );
}
