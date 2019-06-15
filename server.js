const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');

const Nexmo = require('nexmo');
const Twitter = require('twitter');

const app = express();

// Nexmo init
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
}, {debug: true});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Twitter init
app.post('/userName', function(req, res) {
  userName = req.body.userName;

  app.get('/twitter', (req, res) => {
    const client = new Twitter({
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      access_token_key: process.env.ACCESS_TOKEN_KEY,
      access_token_secret: process.env.ACCESS_TOKEN_SECRET
    });

    var username = {screen_name: userName };
    client.get('statuses/user_timeline', username, function(error, tweets, response) {
      if (!error) {
        console.log(`most recent tweet: `, tweets[0].text);
        res.json(tweets[0].text)
      }
    });
  });
});

app.post('/sendSMS', (req, res) => {
  res.send(req.body);
  let text = req.body.text;
  let toNumber = req.body.number;

  // Sending SMS via Nexmo
  nexmo.channel.send(
    { type: 'sms', number: toNumber }, // To
    { type: 'sms', number: '12035809124' }, // From
    {
      content: {
        type: 'text',
        text: `your most recent tweet's sentiment is: ${text}`,
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
