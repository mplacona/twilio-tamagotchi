var util = require('util');

var Tamagotchi = function (name) {
    this.name = name;
    this.alive = true;
    this.hunger = 0;
    this.awake = true;
    this.happy = 3;
    this.poo = 0;
    this.age = 0;
};

Tamagotchi.prototype.play = function play(activity){
	this.hunger++;
	this.happy++;
	return util.format('%s played a nice game of %s', this.name, activity);
};

Tamagotchi.prototype.checkAge = function age(){
	return util.format("%s age: %d", this.name, this.age);
}

Tamagotchi.prototype.checkHunger = function checkHunger(){
	return util.format("%s hunger level: %d", this.name, this.hunger);
}

Tamagotchi.prototype.checkHappiness = function checkHappiness(){
	return util.format("%s happiness level: %d", this.name, this.happy);
}

Tamagotchi.prototype.feed = function feed(food) {
	if (this.hunger > 0) {
		this.hunger--;
		this.poo++;
		getSad();
		return util.format("%s just ate some delicious %s", this.name, food);
	}
	return "Not hungry!";
}

Tamagotchi.prototype.sleep = function sleep() {
	if (this.awake) {
		this.poo ++;
		this.awake = false;
		return util.format("%s just went to sleep", this.name);
	}
	return util.format("%s is already sleeping", this.name);
}

Tamagotchi.prototype.wake = function wake() {
	if (this.awake) {
		return util.format("%s is already awake", this.name);
	}
	this.awake = true;
	return util.format("%s just woke up", this.name);
}

Tamagotchi.prototype.poop = function poop() {
	if (this.poo > 0) {
		this.poo --;
		return util.format("%s just had a nice poo", this.name);
	}
	return util.format("%s doesn't need to poo right now", this.name);
}

Tamagotchi.prototype.aiSimulate = function aiSimulate() {
	if (!this.awake) {
		return odds(100, 50) ? this.wake() : "ZzzzZzzzZzzz";
	}
	if (odds(10, 3)) {
		if (this.poo > 0) {
			return this.poop();
		}
	} else if (odds(10, 2)) {
		console.log('calling')
		return aging();
	} else if (this.awake && odds(100, 20)) {
		return this.sleep();
	}
	if (this.poo > 3 || this.hunger > 3) {
		getSad();
	}
	if (this.happiness == 1 && odds(10, 5) || this.happiness == 0) {
		this.poo += 1;
		this.hunger += 1;
		return util.format("Please take batter care of %s :-(", this.name);
	}
	if (this.hunger > 5) {
		this.poo += 1;
		return util.format("Please give %s some food :-(", this.name);
	}
	return "Everything is dandy";
}

function odds(range, threshold){
	var random = Math.floor(Math.random() * range) + 1;
	console.log(util.format("range: %d, threshold: %d, random: %d", range, threshold, random))
	if(random > threshold){
		console.log('should age')
		return true;
	}
	return false;
}

function getSad() {
	if (this.happy > 0)
		this.happy -= 1;
}

function aging(){
	this.age++;
    getSad();
    console.log(this.age)
    console.log(this.name)
    return util.format("%s is now one year older", this.name);
}
module.exports = Tamagotchi;