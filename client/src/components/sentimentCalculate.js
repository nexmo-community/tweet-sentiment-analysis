import React from 'react';
import unirest from 'unirest';
import PhoneNumber from './phoneNumber';

class SentimentCalculate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetContent: props.tweetContent,
      userName: props.userName,
      score: ''
    };
    this.calculateSentiment = this.calculateSentiment.bind(this);
    this.renderSentimentButton = this.renderSentimentButton.bind(this);
  }

  calculateSentiment = (event) => {
    console.log("tweet", this.props.tweetContent)
    event.preventDefault();
    unirest.post("https://microsoft-azure-text-analytics-v1.p.rapidapi.com/sentiment")
    .header("X-RapidAPI-Host", "microsoft-azure-text-analytics-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "9e3f240e48mshb9079ed21621b98p17fd28jsn5d5db64d7dd9")
    .header("Content-Type", "application/json")
    .send({"documents":[{"language":"en","id":"string","text":this.props.tweetContent}]})
    .end((result) => {
      const newScore = result.body.documents[0].score
      console.log("The score is:", newScore)
      this.setState({ score: newScore })
    });
  }

  renderSentimentButton() {
    if (this.props.tweetContent) {
      return (
        <div>
          <button className="ui teal button" onClick={this.calculateSentiment}>
          Calculate sentiment score
          </button>
          <div className="ui divider"></div>
            <strong>{this.state.score && `Tweet's sentiment score: `}</strong>{this.state.score}
        </div>
      );
    }
  }
  showTweet() {
    if (this.props.tweetContent) {
      return (
      <div className="ui raised segment">
        {this.props.tweetContent}
      </div>
    )
    }
  }


  render() {
    return (
      <div>
      <div className="ui divider"></div>
      {this.showTweet()}
      {this.renderSentimentButton()}
      <PhoneNumber score={this.state.score} tweetContent={this.props.tweetContent} userName={this.props.userName}/>
      </div>
    )
  }
}
export default SentimentCalculate;
