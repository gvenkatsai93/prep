### Creational Design Patterns

- [Singleton](#singleton)

 Eager Initialization

 ```csharp
 class EagerSingleton
    {
        private static readonly EagerSingleton instance = new EagerSingleton();
        private EagerSingleton() { }

        public static EagerSingleton Instance { get { return instance; } }
    }
```

Lazy Initialization

```csharp
class LazySingleton
    {
        private static Lazy<LazySingleton> instance = new LazySingleton();
        private LazySingleton() { }

        public static LazySingleton Instance { get { return instance.Value; } }
    }
```

Thread Safe Singleton

```csharp
class ThreadSafeSingleton
    {
        private static ThreadSafeSingleton instance;
        private static readonly object lockObject = new object();

        private ThreadSafeSingleton() { }

        public static ThreadSafeSingleton Instance
        {
            if (instance == null)
            {
                lock (lockObject)
                {
                    if (instance == null)
                    {
                        instance = new ThreadSafeSingleton();
                    }
                }
            }
            return instance;
        }
    }
```





