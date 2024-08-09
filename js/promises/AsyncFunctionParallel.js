function createAsyncTask() {
    const value = Math.floor(Math.random() * 10);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (value < 5) {
                reject("Error");
            } else {
                resolve(value * 1000)
            }
        }, value * 1000);
    })
}

let tasks = [
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask(),
    createAsyncTask()
]

// createAsyncTask()
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

const asyncParallel = (tasks, callback) => {
    const success = [];
    const failures = [];
    count = 0;
    tasks.forEach(task => {
        task.then(res => {
            success.push(res);
        })
        .catch(err => {
            failures.push(err);
        })
        .finally(() => {
            if (++count == tasks.length) {
                callback(success, failures);
            }
        })
    });
}

console.time('start');
asyncParallel(tasks, (success, failures) => {
    console.log(success);
    console.error(failures);
});
console.timeEnd('start');