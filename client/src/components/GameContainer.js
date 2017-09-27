import React, { Component } from 'react';
import NewsSourceSelector from './NewsSourceSelector'
import QuizContainer from './QuizContainer'

class GameConatianer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentNewsSource: '',
      newsSourcesByCategory: {},
      questionQueue: [],
    }
    this.updateCurrentNewsSource = this.updateCurrentNewsSource.bind(this);
    this.updateNewsSources = this.updateNewsSources.bind(this);
  }

  render() {
    return (
      <div id="gameContainer">
        <NewsSourceSelector
          newsSourcesByCategory={ this.state.newsSourcesByCategory }
          updateCurrentNewsSource={ this.updateCurrentNewsSource }
        />
        <QuizContainer 
          questionQueue={ this.state.questionQueue }
        />
      </div>
    )
  }

  componentDidMount() {
    this.updateNewsSources();
  }

  updateCurrentNewsSource(currentNewsSource) {
    // find the id of this news source
    let sourceId = '';
    for (let category in this.state.newsSourcesByCategory) {
      for (var i = 0; i < this.state.newsSourcesByCategory[category].length; i++) {
        if (this.state.newsSourcesByCategory[category][i].name === currentNewsSource) {
          sourceId = this.state.newsSourcesByCategory[category][i].id;
          break;
        }
      }
      if (sourceId) break;
    }
    fetch(`/api/headlines/${sourceId}`)
      .then((rawHeadlines) => rawHeadlines.json())
      .then((questionQueue) => {
        this.setState({ 
          currentNewsSource,
          questionQueue
        });
      })
      .catch((err) => console.log('Error getting headlines: ', err));
  }

  updateNewsSources() {
    fetch('/api/sources')
      .then((sourceData) => sourceData.json())
      .then((sources) => {
        let newsSourcesByCategory = {};
        sources.sources.map((source) => (
          newsSourcesByCategory[source.category] = [source, ...(newsSourcesByCategory[source.category] || [])]
        ));
        this.setState({ newsSourcesByCategory })
      })
      .catch((err) => console.log('Error retrieving news sources: ', err));
  }
}

export default GameConatianer;