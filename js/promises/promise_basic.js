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
console.log("line 1 started");

createAsyncTask()
    .then(res => console.log(res))

// async function run() {
//     try{
//         const res = await createAsyncTask();
//         console.log(res)
//     }
//     catch{
//         console.log("error")
//     }
// }
// run()
console.log("line 2 end");
