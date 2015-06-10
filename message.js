var config = require('./config');
var twilio = require('twilio');

// Create a new REST API client to make authenticated requests against the twilio back end
var client = new twilio.RestClient(config.twilioConfig.accountSid, config.twilioConfig.authToken);

// This method is to be used when we want to initiate SMS messages via REST API
exports.send = function(message) {
  client.sendSms({
    to: config.myNumber,
    from: config.twilioConfig.number,
    body: message
  }, function(error, message) {
    if (!error) {
      console.log('Success!');
    } else {
      console.log('Oops! There was an error.');
      console.log(error)
    }
  });
}

// We will use this method in conjunction with Twilio's webhooks to automatically reply to interactions
exports.twiml = function(message){
  // Create a TwiML object to respond to requests with TwiML
  var response = new twilio.TwimlResponse();
  return response.message(message).toString();
}