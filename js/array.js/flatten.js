
// flattern give nested array and return single array upto given depth

var flat = function (arr, n) {
    if (n == 0) return arr;
    let answer = [];
    for (let i=0; i<arr.length; i++) {
        if (n > 0 && Array.isArray(arr[i])) {
            answer.push(...flat(arr[i], n-1));
        } else {
            answer.push(arr[i]);
        }
    }
    return answer;
};


arr = [1, 2, 3, [4, 5, 6], [7, 8, [9, 10, 11], 12], [13, 14, 15]]
d = 1

console.log(flat(arr, d)); // [ 1, 2, 3, 4, 5, 6, 7, 8, [ 9, 10, 11 ], 12, 13, 14, 15 ]


