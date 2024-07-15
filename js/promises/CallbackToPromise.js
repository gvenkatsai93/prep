// type CallbackFn = (next: (data: number, error: string) => void, ...args: number[]) => void;
// type Promisified = (...args: number[]) => Promise<number>;

function promisify(fn) {
    return async function (...args) {
        return new Promise((resolve, reject) => {
            fn(
                (data, error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                },
                ...args,
            );
        });
    };
}

/**
 * const asyncFunc = promisify(callback => callback(42));
 * asyncFunc().then(console.log); // 42
 */

const fn = (callback, a, b, c) => {
    callback(a * b * c);
}

const args = [1, 2, 3]

const promisfyCallback = promisify(fn);
console.log(promisfyCallback(...args).then(console.log))
