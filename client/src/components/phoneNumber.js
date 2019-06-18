import React from 'react';

class PhoneNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: props.score,
      tweetContent: props.tweetContent,
      userName: props.userName,
      number: ''
    };
    this.sendSMS = this.sendSMS.bind(this);
  }

  sendSMS() {
    fetch('/sendSMS', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        number: this.state.number,
        score: this.props.score,
        tweetContent: this.props.tweetContent,
        userName: this.props.userName
      })
    })
    .then(res => {
      alert('Your text was successfully sent!')
      this.setState({ number: '' })
      this.props.resetScore()
    })
    .catch(function(error){ console.log(error)});
  }

  renderPhoneInput() {
    if (this.props.score) {
      return (
        <div>
          <div className="ui divider"></div>
            <div className="ui container">
              <p>Phone number:</p>
              <div className="ui input">
                <input
                  placeholder="18005554444"
                  type="tel"
                  value={this.state.number}
                  onChange={(e) => this.setState({ number: e.target.value})}
                />
            </div>
          </div>
        </div>
      );
    }
  }

  renderSendButton() {
    if (this.state.number) {
      if (this.state.number.match(/\d/g).length===11) {
        return (
          <div>
            <button className="ui purple button" onClick={this.sendSMS}>
            Send the tweet's score to my phone
            </button>
          </div>
        );
      } else {
        return (
          <div>
            <button className="ui button" >
            Send the tweet's score to my phone
            </button>
          </div>
        )
      }
    }
  }

  render() {
    return (
      <div>
        {this.renderPhoneInput()}
        {this.renderSendButton()}
      </div>
    )
  }
}
export default PhoneNumber;
