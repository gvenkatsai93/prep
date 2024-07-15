Generator is a feature introduced in Javascript ES6. Through the yield keyword, 
we can pause function execution and return an intermediate value until the next time the generator is invoked.

yield* is used when we want to delegate to another Generator (in this case the recursive call).

```javascript

var fibGenerator = function*() {
    let current = 0; 
    let next = 1;

    while (true) {
        yield current; 
        [current, next] = [next, current + next];
    }
};

/**
 * const gen = fibGenerator();
 * gen.next().value; // 0
 * gen.next().value; // 1
 */

```


Input: arr = [[[6]],[1,3],[]]
Output: [6,1,3]
Explanation:
const generator = inorderTraversal(arr);
generator.next().value; // 6
generator.next().value; // 1
generator.next().value; // 3
generator.next().done; // true


```javascript

var inorderTraversal = function*(arr) {
    for (let element of arr) {
        if (Array.isArray(element)) {
            yield* inorderTraversal(element);
        } else {
            yield element;
        }
    }
};

```

#### Factorial Generator

```javascript
function* factorial(n) {
    if (n === 0) {
        yield 1;
    }
    let ans = 1;
    for (let i = 1; i <= n; ++i) {
        ans *= i;
        yield ans;
    }
}


const gen = factorial(6);
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 6
console.log(gen.next().value); // 24
console.log(gen.next().value); // 120   

 ```

 #### Date Generator

 ```javascript
 function* dateRangeGenerator(start, end, step) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    let currentDate = startDate;
    while (currentDate <= endDate) {
        yield currentDate.toISOString().slice(0, 10);
        currentDate.setDate(currentDate.getDate() + step);
    }
}

/**
 * const g = dateRangeGenerator('2023-04-01', '2023-04-04', 1);
 * g.next().value; // '2023-04-01'
 * g.next().value; // '2023-04-02'
 * g.next().value; // '2023-04-03'
 * g.next().value; // '2023-04-04'
 * g.next().done; // true
 */

```