### Promise in JavaScript

Given a positive integer millis, write an asynchronous function that sleeps for millis milliseconds. It can resolve any value.

```javascript
function sleep(millis) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Slept for ' + millis + ' milliseconds');
        }, millis);
    });
}

sleep(2000).then((result) => {
    console.log(result); // Slept for 2000 milliseconds
});
``` 




### Cache With Time Limit

set(key, value, duration): accepts an integer key, an integer value, and a duration in milliseconds. Once the duration has elapsed, the key should be inaccessible. The method should return true if the same un-expired key already exists and false otherwise. Both the value and duration should be overwritten if the key already exists.

get(key): if an un-expired key exists, it should return the associated value. Otherwise it should return -1.

count(): returns the count of un-expired keys.


```javascript
var TimeLimitedCache = function() {
    this.cache = new Map();
};

TimeLimitedCache.prototype.set = function(key, value, duration) {
    let found = this.cache.has(key);
    if (found) clearTimeout(this.cache.get(key).ref);
    this.cache.set(key, {
        value,
        ref: setTimeout(() => this.cache.delete(key), duration)
    })
    return found;
};

TimeLimitedCache.prototype.get = function(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
};

TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
};

const timeLimitedCache = new TimeLimitedCache()
timeLimitedCache.set(1, 42, 1000); // false
console.log(timeLimitedCache.get(1)) // 42
console.log(timeLimitedCache.count()) // 1
timeLimitedCache.set(1, 43, 3000); // true
console.log(timeLimitedCache.get(1)) // 43
console.log(timeLimitedCache.count()) // 1
setTimeout(() => {
    console.log(timeLimitedCache.get(1)) // -1
    console.log(timeLimitedCache.count()) // 0
}, 5000)

```

### async and await

The async function declaration defines an asynchronous function, which returns an AsyncFunction object. An asynchronous function is a function which operates asynchronously via the event loop, using an implicit Promise to return its result. But the syntax and structure of code using async functions is much more like using standard synchronous functions.

The await expression causes async function execution to pause until a Promise is settled (that is, fulfilled or rejected), and to resume execution of the async function after fulfillment. When resumed, the value of the await expression is that of the fulfilled Promise.

```javascript

async function asyncFunction() {
    const result =  await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Async function resolved');
        }, 2000);
    });
    console.log(result); // Async function resolved
}

asyncFunction();

```

### Delay Promises

```javascript
const listOfPromises = [
    new Promise((resolve) => setTimeout(() => resolve(11), 100)),
    new Promise((resolve) => setTimeout(() => resolve(21), 200))
];

function delayFunction(lp, D) {
    return lp.map(fn => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
                fn.then(data => console.log(data));
            }, D);
        })
    })
}

function delayAll(functions, ms) {
    return functions.map(fn => {
        return async function () {
            await new Promise(resolve => setTimeout(resolve, ms));
            return fn();
        };
    });
}


const delayedPromises = delayFunction(listOfPromises, 500);
Promise.all(delayedPromises).then(console.log); // [1, 2] in any order

```

####  Parallel Execution of Promises for Individual Results Retrieval

```javascript

var promiseAllSettled = function (functions) {
    return new Promise(resolve => {
        const res = [];
        let count = 0;
        for (let i in functions) {
            functions[i]()
                .then(value => ({ status: 'fulfilled', value }))
                .catch(reason => ({ status: 'rejected', reason }))
                .then(obj => {
                    res[i] = obj;
                    if (++count === functions.length) {
                        resolve(res);
                    }
                });
        }
    });
};

let functions = [
    () => new Promise(resolve => setTimeout(() => resolve(20), 100)), 
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]

promiseAllSettled(functions).then(res => console.log(res))

```