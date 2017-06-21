console.log("twit bot launched!");

var city = 'Shanghai';
var api = 'http://api.openweathermap.org/data/2.5/weather?q=';
var key = '&APPID=6841052ab83f02461bfe35e9c2bcd6e8&units=';
var units = 'metric';
var complete = api + city + key + units;
var weather;

var Twit = require('twit');
var request = require('request');

var T = new Twit({
  consumer_key:         'vLAvfLOGKnIiwUYzmHUXf5qLb',
  consumer_secret:      'wPaU60ZJwrCObDP0oE1fXiv5tZ638MJ9eumtoOflme669cfbWs',
  access_token:         '877323777243140105-JIiyrmRz1HpoxxGFuCau02qo6uT1QNS',
  access_token_secret:  '50wvXypQL04vMne8R4a6evOVd96mOGO6bfu7SzPTLT1FF',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

request({
    url: complete, //used in weather json yesterday
    json: true
  }, function (error, response, body) {

      if  (!error && response.statusCode === 200) {
          console.log(body);
          weather = body;
          tweet();

      };
  });


// T.get('search/tweets', //category
// { q: 'bts_twt since:2017-06-01', count: 5 }, //search parameters, json description
// function(err, data, response) { //random function, contains all data
//   // console.log(data.statuses[0].retweet_count);
//   for (var i = 0; i < 5; i++) {
//     console.log("the tweet by " + data.statuses[i].user.name + " has " + data.statuses[i].retweet_count + " retweets");
//   };
// });

setInterval(tweet, 25000);

function tweet () {
  var bonus;

  if (weather.main.temp < 50) {
    bonus = ' that\'s cold'
  }
  else if (weather.main.temp > 49 && weather.main.temp < 78)
    bonus = ' that\'s nice'
  }
  else {
    bonus = ' that\'s hot'
  }

  var msg = "the temperature in " + city + " is " + Math.floor(weather.main.temp) + " degrees." + bonus;

  T.post('statuses/update',
  { status: msg },
  function(err, data, response) {
    console.log(data)
  });
};
