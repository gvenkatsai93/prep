
function deepObjectFilter(obj, fn) {
    const dfs = (data) => {
        if (Array.isArray(data)) {
            const res = data.map(dfs).filter(x => x !== undefined);
            return res.length > 0 ? res : undefined
        } 
        if (typeof data === 'object'){
            const res = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const filterValue = dfs(data[key]);
                    if (filterValue !== undefined) {
                        res[key] = filterValue;
                    }
                }
            }

            return Object.keys(res).length > 0 ? res : undefined;
        }

        return fn(data) ? data : undefined;
    }
    return dfs(obj)
}

obj = [-5, -4, -3, -2, -1, 0, 1], 
fn = (x) => x > 0
console.log(deepObjectFilter(obj, fn))
// Output: [1]

obj = {"a": 1, "b": "2", "c": 3, "d": "4", "e": 5, "f": 6, "g": {"a": 1, "z": "2"}}, 
fn = (x) => typeof x === "string"
console.log(deepObjectFilter(obj, fn))
// Output: {"b":"2","d":"4"}

obj = [-1, [-1, -1, 5, -1, 10], -1, [-1], [-5]], 
fn = (x) => x > 0
console.log(deepObjectFilter(obj, fn))
// Output: [[5,10]]

obj = [[[[5]]]], 
fn = (x) => Array.isArray(x)
console.log(deepObjectFilter(obj, fn))
// Output: undefined