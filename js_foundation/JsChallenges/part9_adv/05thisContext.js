const person = {
  name: "Chandan",
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};

person.greet();

const greetFunction = person.greet;
greetFunction();  // we cannot change the referance of a function to another variable.

const boundGreet = person.greet.bind({ name: "John" });
boundGreet();

//bind, call and apply
