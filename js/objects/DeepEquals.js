function areDeepEqual(o1, o2) {
    if (o1 === null || typeof o1 !== 'object') return o1 === o2;
    if (typeof o1 !== typeof o2) return false;
    if (Array.isArray(o1) !== Array.isArray(o2)) return false;
    if (o1 instanceof Date && o2 instanceof Date) return o1.getTime() === o2.getTime();

    if (Array.isArray(o1)) {
        if (o1.length !== o2.length) return false;
        for (let i=0; i<o1.length; i++) {
            if (!areDeepEqual(o1[i], o2[i])) return false;
        }
        return true;
    } else {
        const keys1 = Object.keys(o1);
        const keys2 = Object.keys(o2);
        if (keys1.length !== keys2.length) return false;
        for (let key of keys1) {
            if (!areDeepEqual(o1[key], o2[key])) return false;
        }
        return true;
    }
}


o1 = {"x":1,"y":2}, o2 = {"x":1,"y":2}
console.log(areDeepEqual(o1, o2)); // true

o1 = {"y":2,"x":1}, o2 = {"x":1,"y":2}
console.log(areDeepEqual(o1, o2)); // true

o1 = {"x":null,"L":[1,2,3]}, o2 = {"x":null,"L":["1","2","3"]}
console.log(areDeepEqual(o1, o2)); // false

a = [1,2,3], b = [1,2,3]
console.log(areDeepEqual(a, b));

