#### Adapter Design Pattern
- Adapter design pattern is a structural design pattern that allows objects with incompatible interfaces to collaborate.
- It converts the interface of a class into another interface the clients expect.
- It lets classes work together that couldn't otherwise because of incompatible interfaces.
- It is also known as Wrapper.
- In below example, we have converted Turkey interface to Duck interface using TurkeyAdapter.
```csharp
 public interface IDuck
    {
        void Quack();
        void Fly();
    }
class MallardDuck : IDuck
    {
        public void Quack()
        {
            Console.WriteLine("Quack Quack Quack");
        }

        public void Fly()
        {
            Console.WriteLine("Flies 500 Metres");
        }
    }
public interface ITurkey
    {
        void Gobble();
        void Fly();
    }
class WildTurkey : ITurkey
    {
        public void Gobble()
        {
            Console.WriteLine("Gobble Gobble Gobble");
        }

        public void Fly()
        {
            Console.WriteLine("Flies 100 Metres");
        }
    }
public class TurkeyAdapter : IDuck
    {
        private readonly ITurkey _turkey;

        public TurkeyAdapter(ITurkey turkey)
        {
            _turkey = turkey;
        }
        public void Quack()
        {
            _turkey.Gobble();
        }

        public void Fly()
        {
            for (var i = 0; i < 5; i++)
            {
                _turkey.Fly();
                Console.WriteLine("Resting..");
            }
        }
    }
class Program
    {
        static void Main(string[] args)
        {
            IDuck duck = new MallardDuck();
            ITurkey turkey = new WildTurkey();
            IDuck turkeyAdapter = new TurkeyAdapter(turkey);

            Console.WriteLine("Duck says..");
            duck.Quack();
            duck.Fly();

            Console.WriteLine("Turkey says..");
            turkey.Gobble();
            turkey.Fly();

            Console.WriteLine("Turkey Adapter says..");
            turkeyAdapter.Quack();
            turkeyAdapter.Fly();
        }
    }
```

#### Facade Design Pattern
- Facade design pattern is a structural design pattern that provides a simplified interface to a complex system.
- It hides the complexities of the system and provides an interface to the client using which the client can access the system.
- It involves a single class that provides a simple interface to the client and delegates the calls to the underlying system components.
- In below example, we have a HomeTheatreFacade that provides a simple interface to the client to watch a movie, pause and resume. It internally uses Dimmer, Dvd and DvdPlayer classes.
```csharp
public class Dimmer
    {
        internal void Dim(int val)
        {
            Console.WriteLine(val == 10 ? "Turning Lights On" : $"Dimming lights to {val}");
        }

        internal void Off() => Console.WriteLine("Switching off lights");
    }
public class Dvd
    {
        public Dvd(string name)
        {
            Movie = name;
        }
        public string Movie { get; set; }
    }
public class DvdPlayer
    {
        private Dvd _dvd;
        private int _time = 0;
        public void On() => Console.WriteLine("DVD Player powered on");

        public void Insert(Dvd dvd)
        {
            _dvd = dvd;
            Console.WriteLine($"Inserting {dvd.Movie}");

        }

        public void Play() => Console.WriteLine($"Playing {_dvd.Movie}");

        public void Pause()
        {
            Console.WriteLine($"Pausing at {_time = (new Random()).Next(_time, _time + 120)}");
        }

        public void Resume()
        {
            Console.WriteLine($"Resuming from {_time}");
        }
    }
public class HomeTheatreFacade
    {
        private Dimmer _dimmer;
        private Dvd _dvd;
        private DvdPlayer _dvdPlayer;

        public HomeTheatreFacade(Dimmer dimmer, Dvd dvd, DvdPlayer dvdPlayer)
        {
            _dvd = dvd;
            _dimmer = dimmer;
            _dvdPlayer = dvdPlayer;
        }

        public void WatchMovie()
        {
            _dimmer.Dim(5);
            _dvdPlayer.On();
            _dvdPlayer.Insert(_dvd);
            _dvdPlayer.Play();
        }

        public void Pause()
        {
            _dimmer.Dim(10);
            _dvdPlayer.Pause();
        }

        public void Resume()
        {
            _dimmer.Dim(5);
            _dvdPlayer.Resume();
        }
    }
internal static class Program
    {
        private static void Main()
        {
            var dimmer = new Dimmer();
            var dvdPlayer = new DvdPlayer();
            var dvd = new Dvd("Gone with the Wind 2 : Electric Bugaloo");
            var homeTheater = new HomeTheatreFacade(dimmer, dvd, dvdPlayer);

            homeTheater.WatchMovie();
            Console.WriteLine();
            homeTheater.Pause();
            Console.WriteLine();
            homeTheater.Resume();
            Console.WriteLine();
            homeTheater.Pause();
        }
    }
```

#### Decorator Pattern
- it can decorate an obejct with additional functionality without modifying its structure.
- It is a structural design pattern that lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the new behaviors.
- In below example, we have a Beverage class that is decorated with MochaCondiment and WhipCondiment classes.
- MochaCondiment and WhipCondiment are decorators that add Mocha and Whip to the beverage.
- The cost of the beverage is calculated by adding the cost of the beverage and the cost of the condiments.
- The description of the beverage is calculated by adding the description of the beverage and the description of the condiments.
- The decorators can be stacked to add multiple condiments to the beverage.
- The decorators can be added / removed dynamically at runtime.
- The decorators can be added / removed conditionally based on some criteria.

```csharp
abstract class Beverage
    {
        protected string _description = "No Description";
        public abstract string Description { get; }
        public abstract double Cost();
    }
 class Espresso : Beverage
    {
        public Espresso()
        {
            _description = "Espresso";
        }

        public override string Description => _description;

        public override double Cost()
        {
            return 1.99;
        }
    }
    class HouseBlend : Beverage
    {
        public HouseBlend()
        {
            _description = "House Blend";
        }

        public override string Description => _description;

        public override double Cost()
        {
            return 2.49;
        }
    }
abstract class CondimentDecorator : Beverage
    {
        public abstract override string Description { get; }
    }
class MochaCondiment : CondimentDecorator
    {
        Beverage _beverage;

        public MochaCondiment(Beverage beverage)
        {
            this._beverage = beverage;
        }

        public override string Description
        {
            get
            {
                if (_beverage.Description.StartsWith("Mocha"))
                {
                    return "Double " + _beverage.Description;
                }
                else
                    return "Mocha " + _beverage.Description;
            }
        }

        public override double Cost()
        {
            return 0.2 + _beverage.Cost();
        }
    }
class WhipCondiment : CondimentDecorator
    {
        Beverage _beverage;

        public WhipCondiment(Beverage beverage)
        {
            this._beverage = beverage;
        }

        public override string Description
        {
            get
            {
                if (_beverage.Description.StartsWith("Whip"))
                {
                    return "Double " + _beverage.Description;
                }
                else
                    return "Whip " + _beverage.Description;
            }
        }

        public override double Cost()
        {
            return 0.15 + _beverage.Cost();
        }
    }

static class Program
    {
        static void Main()
        {
            Beverage beverage = new Espresso();
            Console.WriteLine(beverage.Description + " $" + beverage.Cost());

            Beverage beverage2 = new DarkRoast();
            beverage2 = new MochaCondiment(beverage2);
            beverage2 = new MochaCondiment(beverage2);
            beverage2 = new WhipCondiment(beverage2);
            Console.WriteLine(beverage2.Description + " $" + beverage2.Cost());

            Beverage beverage3 = new HouseBlend();
            beverage3 = new MochaCondiment(beverage3);
            beverage3 = new WhipCondiment(beverage3);
            Console.WriteLine(beverage3.Description + " $" + beverage3.Cost());
        }
    }

```

#### Composite Design Pattern
- Composite design pattern is a structural design pattern that lets you compose objects into tree structures to represent part-whole hierarchies.
- It allows clients to treat individual objects and compositions of objects uniformly.
- In below example, we have a MenuComponent class that is the base class for MenuItem and Menu classes.
- MenuItem represents a leaf node in the tree structure.
- Menu represents a composite node in the tree structure.

```csharp
public class MenuComponent
    {
        public virtual void Add(MenuComponent component)
        {
            throw new NotImplementedException();
        }

        public virtual void Remove(MenuComponent component)
        {
            throw new NotImplementedException();
        }

        public virtual MenuComponent GetChild(int i)
        {
            throw new NotImplementedException();
        }

        public virtual string Name { get; }
        public virtual string Description { get; }
        public virtual bool Vegetarian { get; }
        public virtual double Price { get; }

        public virtual void Print()
        {
            throw new NotImplementedException();
        }
    }

 public class MenuItem : MenuComponent
    {
        public MenuItem(string name, string description, double price, bool isveg)
        {
            Name = name;
            Description = description;
            Price = price;
            Vegetarian = isveg;
        }

        public override string Name { get; }

        public override string Description { get; }

        public override double Price { get; }

        public override bool Vegetarian { get; }

        public override void Print()
        {
            Console.WriteLine($"{Name} : {Price}  {(Vegetarian ? '+' : '*')} \n {Description}");
        }
    }

 public class Menu : MenuComponent
    {
        List<MenuComponent> _components = new List<MenuComponent>();

        public Menu(string name, string description)
        {
            Name = name;
            Description = description;

        }

        public override void Add(MenuComponent component)
        {
            _components.Add(component);
        }

        public override void Remove(MenuComponent component)
        {
            _components.Remove(component);
        }

        public override MenuComponent GetChild(int i)
        {
            return _components[i];
        }

        public override string Name { get; }

        public override string Description { get; }

        public override void Print()
        {
            Console.WriteLine(Name);
            Console.WriteLine("___________");
            foreach (var menuComponent in _components)
            {
                menuComponent.Print();
            }
            Console.WriteLine();
        }
    }

static class Program
    {
        public static void Main()
        {

            var breakfast = new Menu("Breakfast", "Pancake House");
            var lunch = new Menu("Lunch", "Deli Diner");
            var dinner = new Menu("Dinner", "Dinneroni");

            var dessert = new Menu("Dessert", "Ice Cream");

            var menu = new Menu("All", "McDonalds");

            breakfast.Add(new MenuItem("Waffles", "Butterscotch waffles", 140, false));
            breakfast.Add(new MenuItem("Corn Flakes", "Kellogs", 80, true));

            lunch.Add(new MenuItem("Burger", "Cheese and Onion Burger", 250, true));
            lunch.Add(new MenuItem("Sandwich", "Chicken Sandwich", 280, false));

            dinner.Add(new MenuItem("Pizza", "Cheese and Tomato Pizza", 210, true));
            dinner.Add(new MenuItem("Pasta", "Chicken Pasta", 280, false));

            dessert.Add(new MenuItem("Ice Cream", "Vanilla and Chocolate", 120, true));
            dessert.Add(new MenuItem("Cake", "Choclate Cake Slice", 180, false));

            dinner.Add(dessert);
            menu.Add(breakfast);
            menu.Add(lunch);
            menu.Add(dinner);

            menu.Print();

        }
    }

```