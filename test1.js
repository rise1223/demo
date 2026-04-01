function Person(){

}

Person.prototype.name = 'jack'
const p1  = new Person()
const p2  = new Person()

p1.name = 'al'

console.log(p1.hasOwnProperty('name'));
console.log(p2.hasOwnProperty('name'));

