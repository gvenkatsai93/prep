### Closure in Javascript

Closure is a function that has access to the outer function's scope. This is a very powerful feature in Javascript. 
It allows you to create private variables and functions. 

```javascript
function outerFunction() {
    let outerVariable = 'I am from outer function';
    function innerFunction() {
        console.log(outerVariable);
    }
    return innerFunction;
}

let innerFunc = outerFunction();
innerFunc(); // I am from outer function
```

In the above example, `innerFunction` has access to the `outerVariable` which is declared in the `outerFunction`.

Here's another example:

```javascript
function counter() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    }
}

let increment = counter();
increment(); // 1
increment(); // 2
increment(); // 3
```

In the above example, `increment` function has access to the `count` variable which is declared in the `counter` function.


#### Counter II

increment() increases the current value by 1 and then returns it.
decrement() reduces the current value by 1 and then returns it.
reset() sets the current value to init and then returns it.

```javascript

var createCounter = function(init) {
    let start = init;
    let value = start;
    return {
        increment: function increment() {
            return ++value;
        },
        decrement: function decrement() {
            return --value;
        },
        reset: function reset() {
            return value = start;
        }
    }
};

const counter = createCounter(5);
counter.increment(); // 6
counter.increment(); // 7
counter.decrement(); // 6
counter.reset(); // 5
```


#### Allow One Function Call

Write a function that takes a function as an argument and returns a new function.

```javascript

var once = function(fn) {
    let called = false;
    return function() {
        if (!called) {
            called = true;
            return fn.apply(this, arguments);
        }
    }
};

const logOnce = once(console.log);
logOnce('Hello'); // Hello
logOnce('World'); // No output
```


