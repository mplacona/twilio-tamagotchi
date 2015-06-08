var config = require('./config');
var twilio = require('twilio');

// Create a new REST API client to make authenticated requests against the twilio back end
var client = new twilio.RestClient(config.twilioConfig.accountSid, config.twilioConfig.authToken);
exports.send = function(message) {
  client.sendSms({
    to: config.ownNumber,
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