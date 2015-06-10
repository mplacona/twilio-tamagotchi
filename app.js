var Hapi = require('hapi');
var util = require('util');
var config = require('./config');
var Tamagotchi = require('./tamagotchi');
var message = require('./message');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: config.port
});

var tamagotchi,
  pet = config.actions.pet,
  food = config.actions.food;

server.route({
  method: 'POST',
  path: '/interact',
  handler: function(request, reply) {
    var action = request.payload.Body;
    var status;

    // check whether our pet has already been created
    if (tamagotchi == undefined) {
      // if our tamagotchi still hasn't been created we will create one
      tamagotchi = new Tamagotchi(action, pet, food);
      status = util.format('Hello, my name is %s and I was just born. Do you wanna play?', action);
    } else {
      // check if our pet is awake, we don't want to wake it up
      if (!tamagotchi.awake && action.toLowerCase() != "wake") {
        status = util.format('%s is asleep now', tamagotchi.name);
      } else {
        // let's check which action the user is going for
        switch (action.toLowerCase()) {
          case ("play"):
            status = tamagotchi.play();
            break;
          case ("feed"):
            status = tamagotchi.feed();
            break;
          case ("wake"):
            status = tamagotchi.wake();
            break;
          case ("sleep"):
            status = tamagotchi.sleep();
            break;
          case ("poo"):
            status = tamagotchi.poop();
            break;
          case ("age"):
            status = tamagotchi.checkAge();
            break;
          case ("hungry"):
            status = tamagotchi.checkHunger();
            break;
          case ("happy"):
            status = tamagotchi.checkHappiness();
            break;
          default:
            status = "Actions: play, feed, sleep, wake, poo\nStatus: age, hungry, happy";
        }
      }
    }
    var aiSimulation = tamagotchi.aiSimulate();
    console.log(status);
    reply(message.twiml(status));
  }
});

// Start the server
server.start(function() {
  var start = 'What are you gonna name your pet?';
  console.log(start);
  message.send(start);
});