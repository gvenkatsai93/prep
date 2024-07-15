setTimeout(() => {
    console.log(1);
}, 0);

console.log(2);

new Promise((resolve, reject) => {
    console.log(3);
    resolve();
}
).then(() => {
    console.log(4);
});

console.log(5);
