#### Debounce

```javascript
let debounce = function(fn, delay) {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    }
};
```

#### Custom Interval

```javascript

const intervalMap = new Map();

function customInterval(fn, delay, period) {
    let count = 0;
    function recursiveTimeout() {
        intervalMap.set(
            id,
            setTimeout(
                () => {
                    fn();
                    count++;
                    recursiveTimeout();
                },
                delay + period * count,
            ),
        );
    }

    const id = Date.now();
    recursiveTimeout();
    return id;
}

function customClearInterval(id) {
    if (intervalMap.has(id)) {
        clearTimeout(intervalMap.get(id));
        intervalMap.delete(id);
    }
}

```