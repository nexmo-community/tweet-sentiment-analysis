# Analyze Twitter Sentiments with Text Analytics API (and a spot of React)

This repository holds the code for Lauren's excellent blog post [Discover Your Twitter Positivity Score with React](https://www.nexmo.com/blog/2019/07/01/discover-your-twitters-positivity-score-with-react-dr)

### Get the code and configure it

- clone this repo to your own machine
- run `npm install` in root of project && within the `/client` folder  
- rename `.env-example` files to `.env` in both the root & `/client` folder
- add a `private.key` file to hold your Nexmo key in root of project  
- Fill in the `.env` files with your personal credentials:

In `tweet-sentiment-analysis/.env`:       
```javascript
API_KEY=*******      
API_SECRET=*******    
APPLICATION_ID=*******    
NEXMO_NUMBER=*******    

CONSUMER_KEY=*******     
CONSUMER_SECRET=*******     
ACCESS_TOKEN_KEY=*******    
ACCESS_TOKEN_SECRET=*******      
```

In `tweet-sentiment-analysis/private.key`:
```javascript      
-----BEGIN PRIVATE KEY-----     
XYZ123****xxx123XYZ***    
-----END PRIVATE KEY-----       
```

In `tweet-sentiment-analysis/client/.env`:    
```javascript
REACT_APP_RAPIDAPI_KEY=*******         
```

### See the app in action

Run both server and client simultaneously by running `npm run dev`    
Open `localhost:3000` to see the app and analyze your twitter positivity (or lack of)
