// execute async tasks in sequence

const createAsyncTask = () => {
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

const asyncSequence = async (tasks, callback) => {
    const results = [];
    for (let task of tasks) {
        try {
            const res = await task();
            results.push(res);
        } catch (err) {
            results.push(err);
        }
    }
    callback(results);
}

let tasks = [
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask
]

console.time('start');
// asyncSequence(tasks)
//     .then(res => {
//         console.log(res);
//     })

asyncSequence(tasks, (res) => {
    console.log(res);
});
