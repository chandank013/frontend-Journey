// Injecting anything in a function.

function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hello, my name is ${this.name}`);
};

let hitesh = new Person("chandan");
hitesh.greet();
