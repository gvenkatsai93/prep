function invertObject(obj) {
    const ans = {};
    for (const key in obj) {
        if (ans.hasOwnProperty(obj[key])) {
            if (Array.isArray(ans[obj[key]])) {
                ans[obj[key]].push(key);
            } else {
                ans[obj[key]] = [ans[obj[key]], key];
            }
        } else {
            ans[obj[key]] = key
        }
    }
    return ans;
}

obj = ["1", "2", "3", "4", "4"]
console.log(invertObject(obj))
invertedObj = {"1": "0", "2": "1", "3": "2", "4": "3"}