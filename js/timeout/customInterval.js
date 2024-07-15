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


fn = () => console.log("print");
let delay = 50, period = 20;
customInterval(fn, delay, period)
cancelTime = 225
customClearInterval(cancelTime)