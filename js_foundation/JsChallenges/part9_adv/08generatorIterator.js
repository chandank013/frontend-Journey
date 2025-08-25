function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}   // it can yield for only three times not more than that.

let gen = numberGenerator();
let genTwo = numberGenerator();

console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

console.log(genTwo.next().value);
console.log(genTwo.next().value);
