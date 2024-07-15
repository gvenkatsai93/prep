
var partial = function (fn, args) {
    return function (...restArgs) {
        let i = 0;
        for (let j = 0; j < args.length; ++j) {
            if (args[j] === '_') {
                args[j] = restArgs[i++];
            }
        }
        while (i < restArgs.length) {
            args.push(restArgs[i++]);
        }
        return fn.apply(this, args);
    };
};

const fn = (...args) => args, args = [1,2,"_",4,"_",6], restArgs = [3,5]

const partialFn = partial(fn, args) 
const result = partialFn(...restArgs) 
console.log(result) // [1,2,3,4,5,6] 