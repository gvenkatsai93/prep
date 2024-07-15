const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Hello World console.log');
        resolve('resolve data 1000');
    }, 2000);
});

prom.then((data) => {
    console.log("here cb " + data);
}).catch((err) => {
    console.log(err);
});


async function asyncFunc() {
    try {
        const data = await prom;
        console.log('return data ' + data);
    } catch (error) {
        console.log(error);
    }
}

asyncFunc();