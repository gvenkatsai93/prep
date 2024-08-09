const cachedAPICal = (cacheTime) => {
    const cache = {};
    return async (url, config = {}) => {
        const key = `${url}_${JSON.stringify(config)}`
        const entry = cache[key]
        if (!entry || Date.now() > entry.expiry) {
            console.log("Calling it as fresh or refresh");
            const res = await fetch(url, config);
            const resjon = await res.json();
            cache[key] = {value: resjon, expiry: Date.now() + cacheTime};
        }
        return cache[key].value;
    }
}

const run = async () => {
    const call = cachedAPICal(1500)
    const res = await call('https://jsonplaceholder.typicode.com/todos/1', {});
    console.log(`first response ${res}`)
    setTimeout(async () => {
        const res = await call('https://jsonplaceholder.typicode.com/todos/1', {});
        console.log(`second response ${res}`)
    }, 2000);
}

await run()