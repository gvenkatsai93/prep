var bar = 1

function foo() {
  return this.bar++
}

const a = {
  bar: 10,
  foo1: foo,
  foo2: function() {
    return foo()
  },
} 

// console.log(foo(), this)
// console.log(a.foo1.call({bar: 10}))
// console.log(a.foo1())
// console.log(a.foo2.call())
// console.log(a.foo2.call({bar: 100}))
// console.log(a.foo2())

console.log(a.foo1.call())
console.log(a.foo1())
console.log(a.foo2.call())
console.log(a.foo2())