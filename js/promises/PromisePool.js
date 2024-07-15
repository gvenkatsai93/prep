// type F = () => Promise<any>;

// function promisePool(functions, n) {
//     const wrappers = functions.map(fn => async () => {
//         await fn();
//         const nxt = waiting.shift();
//         nxt && (await nxt());
//     });

//     const running = wrappers.slice(0, n);
//     const waiting = wrappers.slice(n);
//     return Promise.all(running.map(fn => fn()));
// }

// listFunction = [
//     () => new Promise(resolve => setTimeout(() => resolve('1'), 100)),
//     () => new Promise(resolve => setTimeout(() => resolve('2'), 200)),
//     () => new Promise(resolve => setTimeout(() => resolve('3'), 300)),
// ]

// promisePool(listFunction, 2).then(console.log); // ['1', '2', '3'] in any order

async function promisePool(functions, n) {
    let currentIndex = 0; // To keep track of the current function index
    let runningPromises = 0; // To keep track of currently running promises
  
    // Helper function to execute a single function
    async function executeFunction() {
      if (currentIndex >= functions.length) {
        return; // If no more functions left, return
      }
      
      const currentFunction = functions[currentIndex];
      currentIndex++;
      runningPromises++;
  
      await currentFunction(); // Execute the current function
  
      runningPromises--;
      await executeFunction(); // Start the next function if any
    }
  
    // Start the initial batch of functions
    const initialPromises = [];
    for (let i = 0; i < n && i < functions.length; i++) {
      initialPromises.push(executeFunction());
    }
  
    // Wait until all initial functions are executed
    await Promise.all(initialPromises);
  }
  
  // Example usage:
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  
  const functions = [
    () => sleep(1000).then(() => console.log('Task 1 completed')),
    () => sleep(500).then(() => console.log('Task 2 completed')),
    () => sleep(300).then(() => console.log('Task 3 completed')),
    () => sleep(400).then(() => console.log('Task 4 completed')),
    () => sleep(600).then(() => console.log('Task 5 completed')),
  ];
  
  promisePool(functions, 2).then(() => console.log('All tasks completed'));
  


