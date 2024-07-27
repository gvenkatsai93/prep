#### Behavioural Design Pattern

#### STRATEGY DESIGN PATTERN
- It is a behavioural design pattern that defines a family of algorithms, encapsulates each algorithm, and makes the algorithms interchangeable within that family.
- It lets the algorithm vary independently from the clients that use it.
- It is used when we have multiple algorithms for a specific task and the client decides the actual implementation to be used at runtime.

```csharp
    internal interface IFlyBehaviour
    {
        void Fly();
    }
    internal interface IQuackBehaviour
    {
        void Quack();
    }
     class FlyNope : IFlyBehaviour
    {
        public void Fly()
        {
            Console.WriteLine("I can't fly");
        }
    }
     class FlyWings : IFlyBehaviour
    {
        public void Fly()
        {
            Console.WriteLine("Flap Flap");
        }
    }
        class QuackNope : IQuackBehaviour
        {
            public void Quack()
            {
                Console.WriteLine("I can't quack");
            }
        }
        class QuackQuack : IQuackBehaviour
        {
            public void Quack()
            {
                Console.WriteLine("Quack Quack");
            }
        }

         internal class Duck
    {
        private IQuackBehaviour _quacker;
        private IFlyBehaviour _flyer;


        public IQuackBehaviour Quacker
        {
            set
            {
                _quacker = value;
            }
        }

        public IFlyBehaviour Flyer
        {
            set
            {
                _flyer = value;
            }
        }


        protected void PerformQuack()
        {
            _quacker.Quack();
        }

        protected void PerformFly()
        {
            _flyer.Fly();
        }
    }

    internal class MallardDuck : Duck
    {
        public MallardDuck()
        {
            Flyer = new FlyNope();
            Quacker = new QuackNope();
        }

        public void Display()
        {
            PerformFly();
            PerformQuack();
        }
    }

    internal static class Program
    {
        private static void Main()
        {
            var mallard = new MallardDuck { Quacker = new QuackNormal() };
            mallard.Display();
            mallard.Flyer = new FlyWings();
            mallard.Display();

        }
    }

```