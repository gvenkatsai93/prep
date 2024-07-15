function hello(a, b) {
    console.log('hello world ' + a + b);
}

hello.apply(null, ['Venkat', 'Sai']);

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

const memoizeAdd = memoize((a, b) => {
    console.log('processing');
    return a + b;
});

console.log(memoizeAdd(1, 2)); // processing 3
console.log(memoizeAdd(9, 2)); // 3