import React, { Component } from 'react';
//import our service
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
    //set our initial state and set up our service as this.client on this component
    constructor(props) {
        super(props);
        this.client = new JeopardyService();
        this.state = {
            data: {},
            score: 0,
            formData: {
                answer: ""
            }
        }
    }

    handleChange = (event) => {

        let formData = this.state.formData;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            submitted: true
        })
        let tempScore = this.state.score
        if (this.state.formData.answer === this.state.data.answer) {
            tempScore = tempScore + this.state.data.value
        } else {
            tempScore = tempScore - this.state.data.value
        }
        this.setState({
            score: tempScore,
            formData: { answer: "" }
        })
        this.getNewQuestion()
        event.target.answer.value = ""
    }

    //get a new random question from the API and add it to the data object in state
    getNewQuestion() {
        return this.client.getQuestion().then(result => {
            this.setState({
                data: result.data[0]
            })
            console.log(this.state.data.answer)
        })
    }
    //when the component mounts, get a the first question
    componentDidMount() {
        this.getNewQuestion();
    }
    //display the results on the screen
    render() {
        let categoryElement
        if (this.state.data.category === undefined) {
            categoryElement = <div>no category</div>
        } else {
            categoryElement = <div>{this.state.data.category.title}</div>
        }
        return (
            <div>
                <div>Question: {this.state.data.question}</div>
                <div> Value: {this.state.data.value}</div>
                <div>Category: {categoryElement}</div>
                <div>Score:{this.state.score}</div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="">Answer</label>
                        <input type="text" name="answer"
                            onChange={this.handleChange} />
                        <button>Submit Answer</button>
                    </div>
                </form>
            </div>
        );
    }
}
export default Jeopardy;