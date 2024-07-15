var promiseAllSettled = function (functions) {
    return new Promise(resolve => {
        const res = [];
        let count = 0;
        for (let i in functions) {
            functions[i]()
                .then(value => ({ status: 'fulfilled', value }))
                .catch(reason => ({ status: 'rejected', reason }))
                .then(obj => {
                    res[i] = obj;
                    if (++count === functions.length) {
                        resolve(res);
                    }
                });
        }
    });
};

let functions = [
    () => new Promise(resolve => setTimeout(() => resolve(20), 100)), 
    () => new Promise(resolve => setTimeout(() => resolve(15), 100))
]

promiseAllSettled(functions).then(res => console.log(res))