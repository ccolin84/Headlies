import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';

class QuizContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestionIndex: 0,
      userHasGuessed: false
    }
    this.handleNavButtonClick = this.handleNavButtonClick.bind(this);
    this.handleUserChoice = this.handleUserChoice.bind(this);
  }

  handleNavButtonClick(incriment) {
    this.setState({ 
      currentQuestionIndex: this.state.currentQuestionIndex + incriment,
      userHasGuessed: false 
    })
  }

  handleUserChoice(e) {
    if (!this.state.userHasGuessed) this.setState({ userHasGuessed: true })
  }

  render() {
    if (this.props.questionQueue.length) {
      let fakeHeadlines = this.props.questionQueue[this.state.currentQuestionIndex].fakeHeadlines;
      let realHeadline = this.props.questionQueue[this.state.currentQuestionIndex].realHeadline;
      let randomRealHeadlineInx = Math.floor(Math.random() * 3);
      let mixedHeadlines = fakeHeadlines.slice();
      mixedHeadlines.splice(randomRealHeadlineInx, 0, realHeadline.title);
      return (
        <div id="quizContainer">
          <div id='questionsContainer'>
            <h3>One of These Headlines is Legit</h3>
            <ListGroup>
              { mixedHeadlines.map((headline, inx) => (
                <ListGroupItem 
                  onClick={ this.handleUserChoice }
                  bsStyle={ this.state.userHasGuessed ? (inx === randomRealHeadlineInx ? 'success' : 'danger') : ''}
                  key={ headline + inx }>
                  { headline }
                </ListGroupItem>
              ))}
            </ListGroup>
            <div id="gameButtons">
              <Button onClick={ () => this.handleNavButtonClick(-1) } 
                disabled={ this.state.currentQuestionIndex === 0 ? true : false }>
                Back
              </Button>
              <Button onClick={ () => this.handleNavButtonClick(1) }
                disabled={ this.state.currentQuestionIndex === (this.props.questionQueue.length - 1) ? true : false }>
                Next
              </Button>
            </div>
          </div>
          { 
            !this.state.userHasGuessed ? '' : 
            <div id='articleInfo'>
              <img src={ realHeadline.urlToImage || 'pexels-photo-242492.jpeg' } style={{ height: '35%', width: '35%'}}/>
              <h4>{ realHeadline.author }</h4>
              <h3>{ realHeadline.title }</h3>
              <div>{ realHeadline.publishedAt }</div>
              <div>{ realHeadline.description }</div>
              <div><a href={ realHeadline.url }>{ realHeadline.url }</a></div>
            </div>
          }
        </div>
      )
    } else {
      return (
        null
      )
    }
  }
}

export default QuizContainer;