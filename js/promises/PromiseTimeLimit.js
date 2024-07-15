let timeLimit = function(fn, t) {
    return async function(...args) {
        let originalPromise = fn(...args);
        let rejectPromise = new Promise((resolve, reject) => {
            setTimeout(() => reject('Promise timed out'), t);
        });

        return Promise.race([originalPromise, rejectPromise]);
    }
}

const limited = timeLimit(async function() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'done';
}, 500);

limited().then(console.log).catch(console.log); // Promise timed out



const limited2 = timeLimit((t) => new Promise(resolve => setTimeout(resolve, t)), 500);
limited2(1000).then(console.log).catch(console.log); // Promise timed out