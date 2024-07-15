#### Threads in C#

- **Thread** is a lightweight process. It is a separate path of execution.
- **Thread** is a smallest unit of processing.

#### Creating a Thread
- Thread class is used to create a new thread.
- Thread class is defined in System.Threading namespace.
- Thread class has a constructor that accepts a ThreadStart delegate.
- ThreadStart delegate is a pointer to a method that is executed by a new thread.

#### Starting a Thread
- To start a thread, call Start() method on the thread object.
- Start() method is used to start the thread.

#### Joining a Thread
- Join() method is used to wait for the thread to finish.
- Join() method blocks the calling thread

#### Example

```csharp
using System.Threading.Tasks;
public void Execute()
{
    Thread thread1 = new Thread(() => DownloadFile("file1", 1000));
    Thread thread2 = new Thread(() => DownloadFile("file2", 300));
    Thread thread3 = new Thread(() => DownloadFile("file3", 600));
    thread1.Start();
    thread2.Start();
    thread3.Start();
    thread1.Join();
    thread2.Join();
    thread3.Join();

    Console.WriteLine("All downloads completed. Processing files ...");

}

private void DownloadFile(string filename, int delay)
{
    Console.WriteLine($"Starting download: {filename}");
    Thread.Sleep( delay );
    Console.WriteLine($"Finished downloading: {filename}");
}

```

#### Thread States
- **Unstarted**: The thread is created but not started.
- **Ready**: The thread is ready to run and waiting for the processor.
- **Running**: The thread is running.
- **WaitSleepJoin**: The thread is blocked.
- **Stopped**: The thread is stopped.

#### Thread Priority
- highPriorityThread.Priority = ThreadPriority.Highest;
- lowPriorityThread.Priority = ThreadPriority.Lowest;
- Highest Priority acquires the processor more frequently than the lowest priority. It is not guaranteed that the highest priority thread will always get the processor.
- Highest priority thread gets the lock first.

#### Thread Synchronization
- Thread synchronization is used to prevent multiple threads from accessing shared resources at the same time.
- Thread synchronization is achieved using locks.
- Locks are used to prevent multiple threads from accessing shared resources at the same time.


#### Print Odd Even Numbers using Threads
- Print odd and even numbers using two threads.
- Use lock and Monitor class to synchronize threads.

#### Monitor.Pulse
- Monitor.Pulse() method is used to signal a waiting thread.
- Monitor.Pulse() method is used to wake up a waiting thread.

#### Monitor.Wait
- Monitor.Wait() method is used to block the current thread.
- Monitor.Wait() method is used to wait for a signal from another thread.

Monitor.Pulse(lockObject) notifies the other thread that it can proceed, moving it from the waiting queue to the ready queue.
Monitor.Wait(lockObject) releases the lock and waits until it is notified by the other thread. Once notified, the waiting thread attempts to reacquire the lock and continue execution.

```csharp

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPatterns.Threads
{
    enum NumberType
    {
        Odd,
        Even
    }

    internal class OEState
    {
        public NumberType Type { get; set; } = NumberType.Odd;
        public object LockObject { get; } = new object();
    }
    internal class OddEven
    {
        private int n = 50;

        private void PrintOdd(OEState state)
        {
            for (int i = 1; i <= n; i += 2)
            {
                lock (state.LockObject)
                {
                    while (state.Type != NumberType.Odd)
                    {
                        Monitor.Wait(state.LockObject);
                    }
                    Console.Write(i + " ");
                    state.Type = NumberType.Even;
                    Monitor.Pulse(state.LockObject);
                }
            }
        }

        private void PrintEven(OEState state)
        {
            for (int i = 2; i <= n; i += 2)
            {
                lock (state.LockObject)
                {
                    while (state.Type != NumberType.Even)
                    {
                        Monitor.Wait(state.LockObject);
                    }
                    Console.Write(i + " ");
                    state.Type = NumberType.Odd;
                    Monitor.Pulse(state.LockObject);
                }
            }
        }

        public void Execute()
        {
            OEState state = new OEState();
            Thread oddThread = new Thread(() => PrintOdd(state));
            Thread evenThread = new Thread(() => PrintEven(state));

            oddThread.Start();
            evenThread.Start();

            oddThread.Join();
            evenThread.Join();

            Console.WriteLine("Done");
        }
    }
}

```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DesignPatterns.Threads
{
    enum Turn
    {
        Letter,
        Number
    }

    internal class State
    {
        public Turn Turn { get; set; } = Turn.Letter;
        public readonly object LockObject = new object();
        public object LockObject1 { get; } = new object();
    }

    internal class LetterNumber
    {
        public void Execute()
        {
            var state = new State();
            Thread letterThread = new Thread(() => PrintLetter(state));
            Thread numberThread = new Thread(() => PrintNumber(state));
            letterThread.Start();
            numberThread.Start();
            letterThread.Join();
            numberThread.Join();
            Console.WriteLine("Done");
        }

        private void PrintLetter(State state)
        {
            for (char lett = 'A'; lett <= 'Z'; lett++)
            {
                lock (state.LockObject)
                {
                    while (state.Turn != Turn.Letter)
                    {
                        Monitor.Wait(state.LockObject);
                    }
                    Console.Write(lett + " ");
                    state.Turn = Turn.Number;
                    Monitor.Pulse(state.LockObject);
                }
            }
        }

        private void PrintNumber(State state) 
        {
            for (int num = 1; num <= 26; num++)
            {
                lock (state.LockObject)
                {
                    while (state.Turn != Turn.Number)
                    {
                        Monitor.Wait(state.LockObject);
                    }
                    Console.Write(num + " ");
                    state.Turn = Turn.Letter;
                    Monitor.Pulse(state.LockObject);
                }
            }
        }
    }
}

```


#### Thread Safe Counter

```csharp
using System;
using System.Threading;

public class ThreadSafeCounter
{
    private int _count;
    private readonly object _lockObject = new object();

    public int Count
    {
        get
        {
            lock (_lockObject)
            {
                return _count;
            }
        }
    }

    public void Increment()
    {
        lock (_lockObject)
        {
            _count++;
        }
    }

    public void Decrement()
    {
        lock (_lockObject)
        {
            _count--;
        }
    }
}

// Example usage
public class Program
{
    public static void Main(string[] args)
    {
        ThreadSafeCounter counter = new ThreadSafeCounter();

        Thread[] threads = new Thread[10];
        for (int i = 0; i < 10; i++)
        {
            threads[i] = new Thread(() =>
            {
                for (int j = 0; j < 1000; j++)
                {
                    counter.Increment();
                }
            });
        }

        foreach (Thread thread in threads)
        {
            thread.Start();
        }

        foreach (Thread thread in threads)
        {
            thread.Join();
        }

        Console.WriteLine("Final count: " + counter.Count); // Expected output: 10000
    }
}

```

####  Thread-safe Counter Using Interlocked
- The Interlocked class provides atomic operations for variables that are shared by multiple threads, offering a simpler and potentially more efficient way to increment and decrement the counter.

```csharp
public class ThreadSafeCounter
{
    private int _count;

    public int Count
    {
        get
        {
            return _count;
        }
    }

    public void Increment()
    {
        Interlocked.Increment(ref _count);
    }

    public void Decrement()
    {
        Interlocked.Decrement(ref _count);
    }
}

```