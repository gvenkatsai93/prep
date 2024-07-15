const join = (a, b, c) => {
    console.log(`${a}_${b}_${c}`);
}

const bindJoin = join.bind(this, 1);
const bindJoin2 = bindJoin.bind(this, 2);
const bindJoin3 = bindJoin2.bind(this, 3);
bindJoin3()

// implementation 1

function curry(fn) {
    return function(...args) {
        if (args.length >= fn.length) {
            return fn.call(this, ...args);
        }
        const bindFn = fn.bind(this, ...args);
        return curry(bindFn); // recursively bind each argument then
    }
}

// implementation 2

function curry2(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.call(this, ...args);
        }
        return curried.bind(this, ...args);
    }
}

// implementation 3

function curry3(fn){
    return function curried(...args) {
        if (args.length >= fn.length){
            return fn.call(this, ...args);
        }
        return function(...missingArgs){
            return curried.call(this, ...args, ...missingArgs);
        }
    }
}

const curryedJoin = curry(join);
const curryedJoin2 = curry2(join);
const curryedJoin3 = curry3(join);


curryedJoin(1, 2, 3)
curryedJoin(1, 2)(3)
curryedJoin2(1)(2, 3)
curryedJoin3(1)(2)(3)

