var TimeLimitedCache = function() {
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @param {number} value
 * @param {number} duration time until expiration in ms
 * @return {boolean} if un-expired key already existed
 */
TimeLimitedCache.prototype.set = function(key, value, duration) {
    let found = this.cache.has(key);
    if (found) clearTimeout(this.cache.get(key).ref);
    this.cache.set(key, {
        value,
        ref: setTimeout(() => this.cache.delete(key), duration)
    })
    return found;
};

/** 
 * @param {number} key
 * @return {number} value associated with key
 */
TimeLimitedCache.prototype.get = function(key) {
    return this.cache.has(key) ? this.cache.get(key).value : -1;
};

/** 
 * @return {number} count of non-expired keys
 */
TimeLimitedCache.prototype.count = function() {
    return this.cache.size;
};


const timeLimitedCache = new TimeLimitedCache()
timeLimitedCache.set(1, 42, 1000); // false
console.log(timeLimitedCache.get(1)) // 42
console.log(timeLimitedCache.count()) // 1
timeLimitedCache.set(1, 43, 3000); // true
console.log(timeLimitedCache.get(1)) // 43
console.log(timeLimitedCache.count()) // 1
setTimeout(() => {
    console.log(timeLimitedCache.get(1)) // -1
    console.log(timeLimitedCache.count()) // 0
}, 5000)
