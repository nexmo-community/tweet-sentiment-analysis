const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const Nexmo = require('nexmo');
const Twitter = require('twitter');

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Twitter init
app.post('/userName', function(req, res) {
  userName = req.body.userName;

  // twitter credentials
  app.get('/twitter', (req, res) => {
    const client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });
    // read most recent tweet
    var username = {screen_name: userName };
    client.get('statuses/user_timeline', username, function(error, tweets, response) {
      if (!error) {
        console.log(`most recent tweet: `, tweets[0].text);
        res.json(tweets[0].text)
      }
    });
  });
});

// Nexmo credentials
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
}, {debug: true});

// send SMS via Nexmo
app.post('/sendSMS', (req, res) => {
  res.send(req.body);
  let score = req.body.score;
  let toNumber = req.body.number;
  let tweet = req.body.tweetContent;
  let userName = req.body.userName;
  let scoreSign = '';

  if (score > '.5') {
    scoreSign = '✅'
  } else if (score == '.5') {
    scoreSign = '😐'
  } else {
    scoreSign = '👿'
  }

  //  Nexmo Messages API
  nexmo.channel.send(
    { type: 'sms', number: toNumber }, // To
    { type: 'sms', number: '12035809124' }, // From
    {
      content: {
        type: 'text',
        text: `${userName}'s most recent tweet was: \"\ ${tweet}\"\ and the sentiment score is: ${scoreSign}`,
      }
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    },
    { useBasicAuth: true }
  );
});

const port = 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
