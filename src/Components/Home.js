import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

var styler = {width: "18rem", margin: "10px"}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quizzes: []
        }
    }

    getQuizzes() {
        Axios.get(`http://localhost:3001/api/quiz`)
            .then(result => {
                const quizList = result.data;
                this.setState({ quizzes: quizList })
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    componentDidMount() {
        this.getQuizzes()
    }

    render() {
        return (
            <div className="container">
                <h3>Welcome to the Online Test System</h3>
                <h5>Please Select the desired test from the below list.</h5>
                <br/>
                <div className="container">
                    <div className="row">
                        {this.state.quizzes.map((listValue, index) => {
                            return (
                                <div className="card text-center" key={index} style={styler}>
                                    <div className="card-body">
                                        <h5 className="card-title">{listValue.name}</h5>
                                        <Link className="btn btn-primary" to={'/quizzer/' + listValue._id}>Give Test</Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;