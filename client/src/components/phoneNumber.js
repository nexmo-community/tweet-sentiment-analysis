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
    this.renderPhoneInput = this.renderPhoneInput.bind(this);
    this.renderSendButton = this.renderSendButton.bind(this);
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
    .then(function(res){ console.log(res) })
    .catch(function(error){ console.log(error)});
  }


  renderPhoneInput() {
    if (this.props.score) {
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

  renderSendButton() {
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
      <div>
      {this.renderPhoneInput()}
      {this.renderSendButton()}
      </div>
    )
  }
}
export default PhoneNumber;
