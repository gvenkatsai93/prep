## Array JavaScript

### Add custom methods to Array.prototype
#### Implement last() method on Array.prototype which returns the last element of the array

```javascript
Array.prototype.last = function() {
    return this.length > 0 ? this[this.length - 1] : -1;
};
```

#### Snail method on Array convert given array to 2D 

```javascript

Array.prototype.snail = function(numRows, numCols) {
  if (numRows * numCols !== this.length) return [];
  let result = Array(numRows).fill().map(() => []);
  for (let row = 0; row < numCols; row++) {
    for (let col = 0; col < numRows; col++) {
      result[(row & 1) ? numRows - col - 1 : col].push(this[row * numRows + col]);
    }
  }
  return result;
}

Input: 
nums = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15]
rowsCount = 5
colsCount = 4
Output: 
[
 [19,17,16,15],
 [10,1,14,4],
 [3,2,12,20],
 [7,5,18,11],
 [9,8,6,13]
]

```


#### Reduce function

```javascript

var reduce = function(nums, fn, init) {
    let val = init;
    for (let i=0; i<nums.length; i++) {
        val = fn(val, nums[i]);
    }

    return val;
};

Input: 
nums = [1,2,3,4]
fn = function sum(accum, curr) { return accum + curr; }
init = 0
Output: 10

```

#### Array reduceRight

```javascript
const arr = [1, 2, 3, 4, 5];

const sum = arr.reduceRight((prev, curr) => {
  return prev + curr;
});

console.log(sum); // Output: 15

```

#### function composition 

```javascript
Input: functions = [x => x + 1, x => x * x, x => 2 * x], x = 4
Output: 65
Explanation:
Evaluating from right to left ...

var compose = function(functions) {
    if (functions.length == 0) {
        return function(x) { return x; };
    }
    return function(x) {
        let result = x;
        for (let i=functions.length-1; i>=0; i--) {
            result = functions[i](result);
        }
        return result;
    }
};

var compose = function(functions) {
	if (functions.length === 0) {
    return function(x) { return x; };
  }

  return functions.reduceRight(function(prevFn, nextFn) {
    return function(x) {
      return nextFn(prevFn(x));
    };
  });

};


const fn = compose([x => x + 1, x => 2 * x]);
console.log(fn(4)); // 9

```


#### Array GroupBy method

```javascript

fn = function (item) { 
  return item.id; 
}

Array.prototype.groupBy = function(fn) {
    const ans = {};
    for (let key of this) {
        const temp = fn(key)
        ans[temp] ? ans[temp].push(key) : ans[temp] = [key];
    }
    return ans;
};

```


#### Array.prototype.forEach

```javascript
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

```

#### Repeat string n times

```javascript 

String.prototype.replicate = function (times) {
    return Array(times).fill(this).join('');
};

console.log('abc'.replicate(3)); // abcabcabc

```