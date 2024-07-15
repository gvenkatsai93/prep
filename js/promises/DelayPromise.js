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

// Promise.all(listOfPromises).then(value => console.log('value ', value))