



#### memoize
##### It uses a map to cache results of function and also uses apply to call the function with the given arguments.
##### It uses closure to access the cache variable.

```javascript

function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    }
}

const memoizedSum = memoize(function(a, b) {
  return a + b;
});

console.log(memoizedSum(2, 3)); // Output: Computing sum, 5
console.log(memoizedSum(2, 3)); // Output: 5

```