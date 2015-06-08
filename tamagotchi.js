var util = require('util');
var message = require('./message')

Tamagotchi = function(name, pet, food) {
  this.name = name;
  this.pet = pet;
  this.food = food;
  this.hunger = 0;
  this.awake = true;
  this.happy = 3;
  this.poo = 0;
  this.age = 0;

  // ACTIONS

  this.play = function() {
    // A pet usually get's happy and hungry after playing a game
    this.hunger++;
    this.happy++;
    return util.format('%s played a nice game of %s', this.name, this.pet[Math.floor(Math.random() * this.pet.length)]);
  };

  this.feed = function() {
    // When you feed it, it gets a little bit less hungry, but will eventually get tired and need to poop
    if (this.hunger > 0) {
      this.hunger--;
      this.poo++;
      this.getSad();
      return util.format("%s just ate some delicious %s", this.name, this.food[Math.floor(Math.random() * this.food.length)]);
    }
    return "Not hungry!";
  };

  this.sleep = function() {
    // Sleeping takes a lot of energy
    if (this.awake) {
      this.poo++;
      this.awake = false;
      return util.format("%s just went to sleep", this.name);
    }
    return util.format("%s is already sleeping", this.name);
  };
  this.wake = function() {
    if (this.awake) {
      return util.format("%s is already awake", this.name);
    }
    this.awake = true;
    return util.format("%s just woke up", this.name);
  };
  this.poop = function() {
    if (this.poo > 0) {
      this.poo--;
      return util.format("%s just had a nice poo", this.name);
    }
    return util.format("%s doesn't need to poo right now", this.name);
  };

  this.getSad = function() {
    if (this.happy > 0)
      this.happy--;
  };

  this.aging = function() {
    // Every one get a little bit sad when they get older.
    this.age++;
    this.getSad();
    return util.format("%s is now one year older", this.name);
  };

  // STATUS

  this.checkAge = function() {
    return util.format("%s age: %d", this.name, this.age);
  };

  this.checkHunger = function() {
    return util.format("%s hunger level: %d", this.name, this.hunger);
  };

  this.checkHappiness = function() {
    return util.format("%s happiness level: %d", this.name, this.happy);
  };



  this.aiSimulate = function() {
    if (!this.awake) {
      odds(100, 50) ? this.wake() : message.send("ZzzzZzzzZzzz");
    }
    if (odds(10, 3)) {
      if (this.poo > 0) {
        this.poop();
      }
    } else if (odds(10, 2)) {
      this.aging();
    } else if (this.awake && odds(100, 20)) {
      this.sleep();
    }
    if (this.poo > 3 || this.hunger > 3) {
      this.getSad();
    }
    if (this.happiness == 1 && odds(10, 5) || this.happiness == 0) {
      this.poo++;
      this.hunger++;
      message.send(util.format("Please take batter care of %s :-(", this.name))

    }
    if (this.hunger > 5) {
      this.poo++;
      message.send(util.format("Please give %s some food :-(", this.name));
    }
  };

  odds = function(range, threshold) {
    var random = Math.floor(Math.random() * range) + 1;
    if (random > threshold) {
      return true;
    }
    return false;
  };

};

module.exports = Tamagotchi;