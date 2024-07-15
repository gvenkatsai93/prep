let debounce = (fn, delay) => {
    let timer;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    }
}

const debounceAdd = debounce((a, b) => {
    console.log('processing' + (a + b));
}, 2000);

setTimeout(() => {
    debounceAdd(1, 2);
}, 1000);

setTimeout(() => {
    debounceAdd(9, 2);
}, 3000);