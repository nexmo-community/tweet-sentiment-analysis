import React from 'react';
import SentimentCalculate from './sentimentCalculate';

class TwitterName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      tweetContent: ''
  };
    this.sendUserName = this.sendUserName.bind(this);
    this.getTweet = this.getTweet.bind(this);
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

  getTweet = (event) => {
    fetch('/twitter')
    .then(res => res.json())
    .then(tweetContent => this.setState({tweetContent}, () => console.log('tweet fetched: ', tweetContent)))
  }

  render() {
    return (
      <div>

        <div className="ui input">
          <input
            placeholder="twitter name"
            type="text"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value})}
            />
        </div>
        <br />
        <button className="ui blue button" onClick={this.sendUserName}>
          find most recent tweet
        </button>

        <SentimentCalculate tweetContent={this.state.tweetContent} userName={this.state.userName}/>
      </div>
    )
  }
}
export default TwitterName;
