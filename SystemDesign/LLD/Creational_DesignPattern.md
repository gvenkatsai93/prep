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

Serilization Safe Singleton

```csharp

 [Serializable]
 public class SerializableSingleton 
 {
     private static readonly SerializableSingleton instance = new SerializableSingleton();

     private SerializableSingleton()
     {
         // Private constructor to prevent instantiation
     }

     public static SerializableSingleton Instance
     {
         get
         {
             return instance;
         }
     }

     public class SingletonConverter : JsonConverter<SerializableSingleton>
     {
         public override SerializableSingleton Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
         {
             // Read the start of the object
             while (reader.TokenType != JsonTokenType.StartObject)
             {
                 if (!reader.Read())
                 {
                     throw new JsonException("Expected start of object.");
                 }
             }

             // Read properties if any (no properties expected in this case)
             while (reader.Read() && reader.TokenType != JsonTokenType.EndObject)
             {
                 // Move to the next token if it's a property name
                 if (reader.TokenType == JsonTokenType.PropertyName)
                 {
                     reader.Skip();
                 }
             }

             // Return the singleton instance
             return SerializableSingleton.Instance;
         }

         public override void Write(Utf8JsonWriter writer, SerializableSingleton value, JsonSerializerOptions options)
         {
             // Write an empty JSON object
             writer.WriteStartObject();
             writer.WriteEndObject();
         }
    }
 }

 // Serialize the singleton instance to a JSON string
 string jsonString = JsonSerializer.Serialize(singleton1, options);
 Console.WriteLine("Serialized JSON: " + jsonString);

 // Deserialize the singleton instance from the JSON string
 SerializableSingleton singleton2 = JsonSerializer.Deserialize<SerializableSingleton>(jsonString, options);

 // Both instances should be the same
 Console.WriteLine(singleton1 == singleton2); // Outputs: True
 Console.WriteLine(singleton1.GetHashCode() + " " + singleton2.GetHashCode()); // Outputs: 46104728 46104728

```


#### Builder Design Pattern
- It simplifies the object creation process by providing a way to create an object step by step.
- It is used when an object can have multiple representations or states.
- It is used when an object creation is a complex process.

```csharp
public class PizzaBuilder {
    private String dough;
    private String sauce;
    private String topping;

    public PizzaBuilder setDough(String dough) {
        this.dough = dough;
        return this;
    }

    public PizzaBuilder setSauce(String sauce) {
        this.sauce = sauce;
        return this;
    }

    public PizzaBuilder setTopping(String topping) {
        this.topping = topping;
        return this;
    }

    public Pizza build() {
        Pizza pizza = new Pizza();
        pizza.setDough(dough);
        pizza.setSauce(sauce);
        pizza.setTopping(topping);
        return pizza;
    }
}

class Pizza {
    private String dough;
    private String sauce;
    private String topping;

    public String getDough() {
        return dough;
    }

    public void setDough(String dough) {
        this.dough = dough;
    }

    public String getSauce() {
        return sauce;
    }

    public void setSauce(String sauce) {
        this.sauce = sauce;
    }

    public String getTopping() {
        return topping;
    }

    public void setTopping(String topping) {
        this.topping = topping;
    }
}

var pizza = new PizzaBuilder().setDough("Wheat").setSauce("Tomato").setTopping("Olives").build();
```

```csharp


// pattern 2 with inner class
public class Pizza
{
    private string dough;
    private string sauce;
    private string topping;

    private Pizza(Builder builder)
    {
        this.dough = builder.Dough;
        this.sauce = builder.Sauce;
        this.topping = builder.Topping;
    }

    public string Dough
    {
        get { return dough; }
    }

    public string Sauce
    {
        get { return sauce; }
    }

    public string Topping
    {
        get { return topping; }
    }

    public class Builder
    {
        public string Dough { get; private set; }
        public string Sauce { get; private set; }
        public string Topping { get; private set; }

        public Builder SetDough(string dough)
        {
            Dough = dough;
            return this;
        }

        public Builder SetSauce(string sauce)
        {
            Sauce = sauce;
            return this;
        }

        public Builder SetTopping(string topping)
        {
            Topping = topping;
            return this;
        }

        public Pizza Build()
        {
            return new Pizza(this);
        }
    }
}

var pizza = new Pizza.Builder().SetDough("Wheat").SetSauce("Tomato").SetTopping("Olives").Build();

```
