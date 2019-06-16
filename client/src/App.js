import React from 'react';
import unirest from 'unirest';

class  App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: '',
      number: '',
      tweetContent: '',
      userName: ''
    };
    this.sendSMS = this.sendSMS.bind(this);
    this.sendUserName = this.sendUserName.bind(this);
    this.calculateSentiment = this.calculateSentiment.bind(this);
    this.getTweet = this.getTweet.bind(this);
    this.renderSentimentButton = this.renderSentimentButton.bind(this);
    this.renderPhoneInput = this.renderPhoneInput.bind(this);
    this.renderPhoneButton = this.renderPhoneButton.bind(this);
  }

  sendSMS() {
    fetch('/sendSMS', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: this.state.number,
        score: this.state.score,
        tweetContent: this.state.tweetContent,
        userName: this.state.userName
      })
    })
    .then(function(res){ console.log(res) })
    .catch(function(error){ console.log(error)});
  }

  sendUserName = (event) => {
    event.preventDefault();
    fetch('/userName', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({userName: this.state.userName})
    })
    this.getTweet()
  }

  calculateSentiment = (event) => {
    event.preventDefault();
    unirest.post("https://microsoft-azure-text-analytics-v1.p.rapidapi.com/sentiment")
    .header("X-RapidAPI-Host", "microsoft-azure-text-analytics-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "9e3f240e48mshb9079ed21621b98p17fd28jsn5d5db64d7dd9")
    .header("Content-Type", "application/json")
    .send({"documents":[{"language":"en","id":"string","text":this.state.tweetContent}]})
    .end((result) => {
      const newScore = result.body.documents[0].score
      console.log("The score is:", newScore)
      this.setState({ score: newScore })
    });
  }

  getTweet = (event) => {
    fetch('/twitter')
    .then(res => res.json())
    .then(tweetContent => this.setState({tweetContent}, () => console.log('tweet fetched: ', tweetContent)))
  }

  renderSentimentButton() {
    if (this.state.tweetContent) {
      return (
        <div>
          <button className="ui secondary button" onClick={this.calculateSentiment}>
          Calculate sentiment score
          </button>
          <div className="ui divider"></div>
          {this.state.score && `Tweet's sentiment score: ${this.state.score}`}
        </div>
      );
    }
  }

  renderPhoneInput() {
    if (this.state.score) {
      return (
        <div>
          <div className="ui divider"></div>

          <div className="ui input">
            Phone number:
            <input
              placeholder="18005554444"
              type="tel"
              value={this.state.number}
              onChange={(e) => this.setState({ number: e.target.value})}
            />
          </div>
        </div>
      );
    }
  }
  renderPhoneButton() {
    if (this.state.number) {
      return (
        <div>
          <div className="ui divider"></div>
          <button className="ui primary button" onClick={this.sendSMS}>
          Send the tweet's score to my phone
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
        <div className="ui input">
          <input
            placeholder="twitter name"
            type="text"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value})}
          />
          <button className="ui primary basic button" onClick={this.sendUserName}>
            find most recent tweet
          </button>
        </div>

        <div className="ui divider"></div>

        {this.state.tweetContent && this.state.tweetContent}

        <div className="ui divider"></div>

        {this.renderSentimentButton()}
        {this.renderPhoneInput()}
        {this.renderPhoneButton()}

      </div>
    );
  }
}

export default App;
