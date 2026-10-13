/*let arr1 = [1,2,3];
let arr2 = [1,2,3];

arr1.sayHello = () => {
    console.log("hello frends!!!!");
}

arr2.sayHello = () => {
    console.log("hello frends!!!!");
}*/

/*function PersonMaker(name,age){
    const obj = {
        name  : name,
        age : age,
        talk(){
            console.log(`Hii !! ${this.name}`);
        }
    }
    
    return obj;
}

let p1 = PersonMaker("dish", 18);
let p2 = PersonMaker("suru", 28);*/

/*function Person(name,age){
    this.name  = name,
    this.age = age
}
Person.prototype.talk = function(){
    console.log(`hi. welcome ${this.name}`);
}*/

class Person {
    constructor(age){
        this.name = name,
        this.age = age
    }

    talk(){
        console.log(`hi welcome ${this.name}.`);
    }
}

let q1 = new Person("dimple", 20);
let q2 = new Person("surendra", 27);