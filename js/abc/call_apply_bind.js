const obj = {age: 29};

function printName(name, city) {
    console.log(`Name is ${name} from ${city} Age is ${this.age}`);
}

printName.call(obj, "Rahul", "hyd"); // takes list of arguments comma seperated
printName.apply(obj, ["Rahul", "hyd"]); // tkaes list of arguments in array format

const bindFn = printName.bind(obj, "Rahul"); // returns the function which needs to be called again
bindFn("hyd");

function join(a, b, c) {
    console.log(a, b, c);
}

const bindJoin = join.bind(this, 1);
const bindJoin2 = bindJoin.bind(this, 2);
const bindJoin3 = bindJoin2.bind(this, 3);
bindJoin3()


