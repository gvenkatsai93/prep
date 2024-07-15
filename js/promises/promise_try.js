function runPromise() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Success');
        }, 1000);
        setTimeout(() => {
            reject('Error');
        }, 500);
    });

    promise.then((success_args) => {
        console.log(success_args);
    }).catch((failure_args) => {
        console.log(failure_args);
    });
}

runPromise();

async function runAsyncPromise() {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Success');
        }, 1000);
        setTimeout(() => {
            reject('Error');
        }, 5000);
    });
    
    console.log('Promise Running');
    console.log(await Promise.resolve('100'));

    const result = await promise;

    console.log('Promise Done ' + result);
}

runAsyncPromise();

// async function doAsyncTask() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             console.log('Async Task Calling');
//             resolve('Async Task Done');
//         }, 1000);
//     });
// }

// async function runAsync() {
//     const result = await doAsyncTask();
//     console.log(result);
// }

// runAsync();


async function doAsyncTask() {
    const ans = await new Promise(resolve => {
        setTimeout(() => {
            console.log('Async Task Calling');
            resolve('Async Task Done');
        }, 1000);
    });
    console.log(ans);
}

async function runAsync() {
    console.log('Before Async Task');
    await doAsyncTask();
    console.log('After Async Task');
}

runAsync();

