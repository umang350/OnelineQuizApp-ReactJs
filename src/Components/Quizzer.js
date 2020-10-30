import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

var styler = {margin: "10px"}

class Quizzer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Loading ...",
            questions: [],
            id: [],
            quizId: null,
            selections: [],
            filled: true
        }
    }

    getQuiz() {
        Axios.get(`http://localhost:3001/api/quiz/${this.props.match.params.id}`)
            .then(result => {
                const quiz = result.data;
                this.setState({ name: quiz.name, questions: quiz.questions, id: quiz.id, quizId: quiz._id })
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        var selectionsTemp = this.state.selections;
        this.setState({ filled: true })
        var index = selectionsTemp.findIndex(function (currentValue, index) {
            if (Object.keys(currentValue)[0] === name) {
                return true;
            }
            else {
                return false;
            }
        })
        if (index === -1) {
            selectionsTemp.push({ [name]: value })
        } else {
            selectionsTemp[index] = { [name]: value }
        }
        this.setState({
            selections: selectionsTemp
        }, () => { console.log(this.state.selections) })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.selections.length !== this.state.questions.length) {
            this.setState({ filled: false })
            return 1;
        }
        this.setState({ name: "Loading Submission" }, () => {
            this.props.history.push({
                pathname: "/review",
                state: {
                    selections: this.state.selections,
                    id: this.state.id,
                    quizId: this.state.quizId
                }
            });
        })

    }

    componentDidMount() {
        this.getQuiz()
    }

    render() {
        return (
            <div className="container">
                <h3>Welcome to the Test : {this.state.name}</h3>
                <div className="container card">
                    <h3 className="card-title" style={styler}>Questions</h3>
                    <hr/>
                    <div className='card-body'>
                        <form onSubmit={this.handleSubmit}>
                            {
                                this.state.questions.map((listValue, index) => {
                                    return (
                                        <div key={index} className="form-group">
                                            <label htmlFor="question"> Q{index + 1}. {listValue.question} ?</label>
                                            <br />
                                            {
                                                listValue.options.map((listValue1, index1) => {
                                                    return (
                                                        <div key={index1} className="form-check form-check-inline">
                                                            <input onChange={this.handleChange} className="form-check-input" type="radio" name={listValue.question} id={listValue1} value={listValue1} />
                                                            <label className="form-check-label" htmlFor={listValue1}> {listValue1} </label>
                                                        </div>
                                                    );
                                                })
                                            }
                                             <hr/>
                                        </div>
                                    )
                                })
                            }

                            {
                                this.state.filled ? "" : <div className="alert alert-danger">All Questions are compulsory.</div>
                            }

                            <button onClick={this.handleSubmit} className="btn btn-secondary">Submit</button>&nbsp;&nbsp;
                <Link className="btn btn-info" to='/'>Back to Quiz List</Link>
                        </form></div>
                </div>
            </div>
        )
    }
}

export default Quizzer;