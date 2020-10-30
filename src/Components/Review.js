import Axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import './review.css';

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Data Loading ...",
            questions: [],
            id: null,
            quizId: null,
            answers: {
                questions: {}
            },
            score: 0,
            noOfQues: 0
        }
    }

    getQuiz() {
        Axios.get(`http://localhost:3001/api/quiz/${this.props.location.state.quizId}`)
            .then(result => {
                const quiz = result.data;
                this.setState({ name: quiz.name, questions: quiz.questions, id: quiz.id, quizId: quiz._id }, () => {
                    this.getAnswers()
                })
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    getAnswers() {
        Axios.get(`http://localhost:3001/api/answers/${this.props.location.state.id}`)
            .then(result => {
                const answers = result.data[0];
                this.setState({ answers: answers }, () => {
                    console.log(this.state)
                    this.scoreIncsreaser()
                })
            })
            .catch(error => console.log('There is some error.. : ', error));
    }

    componentWillMount() {
        if (!this.props.location.state) {
            this.props.history.push({
                pathname: "/"
            });
        }
        console.log(this.props.location.state)
        this.setState(this.props.location.state, () => {
            this.getQuiz()
        })
    }

    scoreIncsreaser() {
        var scorer = 0;
        var noOfQues = 0;
        this.state.questions.forEach((listValue, index) => {
            var ques = listValue.question;
            const userSelections = this.state.selections;
            var userAns = "Unable To Fetch your input"
            userSelections.forEach((listValue1, index1)=>{
                if(Object.keys(userSelections[index1])[0]===ques)
                    userAns = userSelections[index1][ques]
            })
            var compAns = this.state.answers.questions[listValue.question] || "Unable To Fetch Correct Answer"
            noOfQues++;
            if (userAns.toLowerCase() === compAns.toLowerCase()) {
                scorer++;
            }
        })
        this.setState({ score: scorer, noOfQues: noOfQues })
    }

    render() {
        return (
            <div className="container">
                <h3>Your Test Evaluation</h3>
                <h4>Your Scored : {this.state.score}/{this.state.noOfQues} </h4>
                <h5 className={this.state.score===this.state.noOfQues ? "alert alert-success" : "alert alert-danger"}>{
                    this.state.score===this.state.noOfQues ? "Congratulations for being perfect." : "You need more practice."
                }</h5>
                <br />
                {this.state.questions.map((listValue, index) => {
                    var ques = listValue.question;
                    const userSelections = this.state.selections;
                    var userAns = "Unable To Fetch your input"
                    userSelections.forEach((listValue1, index1)=>{
                        if(Object.keys(userSelections[index1])[0]===ques)
                            userAns = userSelections[index1][ques]
                    })
                    var compAns = this.state.answers.questions[listValue.question] || "Unable To Fetch Correct Answer"
                    return (
                        <div key={index}>
                            <div className="card">
                                <h3>Q{index + 1}. {listValue.question} ?</h3>
                                <h4 className={userAns.toLowerCase() === compAns.toLowerCase() ? 'correct' : 'wrong'}>Your Answer: {userAns}</h4>
                                <h4 >Correct Answer: {compAns}</h4>
                            </div>
                        </div>
                    )
                })}
                <br />
                <Link className="btn btn-info" to='/'>Back to Quiz List</Link>
                &nbsp;&nbsp;
                <Link className="btn btn-primary" to={'/quizzer/'+this.state.quizId}>Retake Quiz</Link>
                <p></p>
            </div>
        )
    }
}

export default Review;