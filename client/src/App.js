import React from 'react';
import TwitterName from './components/twitterName';

class  App extends React.Component {
  render() {
    return (
      <div className="ui center aligned container" style={{marginTop: '30px'}}>
        Enter a Twitter Handle and find the most recent tweet:
        <TwitterName />
      </div>
    );
  }
}

export default App;
