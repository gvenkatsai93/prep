Array.prototype.forEachC = (callback, context) => {
    for (let i=0; i<this.length; i++) {
        callback.call(context, this[i], i, this)
    }
}

const arr = [1,2,3];
const callbck = (num, i, arr) => arr[i] = arr[i] * 2;
const context = {context: true};

arr.forEach(callbck, context);
console.log(arr)