var Hapi = require('hapi');
var Tamagotchi = require('./tamagotchi.js');
var util = require('util');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 8000 
});

var tamagotchi;
var pet = Array("hangman", "tic-tac-toe", "human knot", "london bridges", "frog races", "water balloon fights", "silly relay races");
var food = Array("apple", "cheetos", "burrito", "letuce", "pear", "ice cream");

server.route({
    method: 'POST',
    path: '/interact',
    handler: function(request, reply){
        var action = request.payload.body;
        var status;

        // check whether our pet has already been created
        if(!(tamagotchi instanceof Tamagotchi)){
            // we will create one then
            tamagotchi = new Tamagotchi(action);
            status = util.format('Hello, my name is %s and I was just born. Do you wanna play?', action);
        }else{
            // check if our pet is awake
            if(!tamagotchi.awake && action != "wake"){
                status = util.format('%s is asleep now', tamagotchi.name);
            }
            else{
                // let's check which action the user is going for
                switch(action){
                    case("play"):
                        status = tamagotchi.play(pet[Math.floor(Math.random()*pet.length)]);
                        break;
                    case("feed"):
                        status = tamagotchi.feed(food[Math.floor(Math.random()*food.length)]);
                        break;
                    case("wake"):
                        status = tamagotchi.wake();
                        break;
                    case("sleep"):
                        status = tamagotchi.sleep();
                        break;
                    case("poop"):
                        status = tamagotchi.poop();
                        break;
                    case("age"):
                        status = tamagotchi.checkAge();
                        break;
                    case("hunger"):
                        status = tamagotchi.checkHunger();
                        break;
                    case("happy"):
                        status = tamagotchi.checkHappiness();
                        break;
                    default:
                        status = "Actions: feed, pet, wake, poo\nStatus: age, hunger, happy";
                }
            }
        }
        console.log(status)
        tamagotchi.aiSimulate();
        reply(status);
    }
});

// Start the server
server.start(function(){
    console.log('What are you gonna name your pet?')
});