import Clock from "./components/svgs/Clock";
import Truck from "./components/svgs/Truck";
import Utensils from "./components/svgs/Utensils";

export default function Home() {
  const featuredMeals = [
    {
      id: 1,
      name: "Grilled Salmon Bowl",
      description:
        "Fresh Atlantic salmon with quinoa, avocado, and roasted vegetables",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Seafood",
      prepTime: "25 mins",
    },
    {
      id: 2,
      name: "Chicken Pesto Pasta",
      description:
        "Homemade pesto sauce with grilled chicken and fresh cherry tomatoes",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Pasta",
      prepTime: "20 mins",
    },
    {
      id: 3,
      name: "Buddha Bowl",
      description:
        "Nutritious mix of quinoa, roasted chickpeas, and fresh vegetables",
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Vegetarian",
      prepTime: "15 mins",
    },
    {
      id: 4,
      name: "Fruit Bowl",
      description: "Fresh fruits with nuts, coconut, and strawberries",
      price: 24.99,
      image:
        "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg",
      category: "Fruits",
      prepTime: "25 mins",
    },
    {
      id: 1,
      name: "Grilled Salmon Bowl",
      description:
        "Fresh Atlantic salmon with quinoa, avocado, and roasted vegetables",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Seafood",
      prepTime: "25 mins",
    },
    {
      id: 1,
      name: "Grilled Salmon Bowl",
      description:
        "Fresh Atlantic salmon with quinoa, avocado, and roasted vegetables",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=600",
      category: "Seafood",
      prepTime: "25 mins",
    },
  ];
  return (
    <main className="flex min-h-screen flex-col">
      {/* <Navbar /> */}

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50" />
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&h=1200"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Delicious Meals,
            <br />
            Delivered to Your Door
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-800/60">
            Experience restaurant-quality meals prepared by expert chefs,
            delivered fresh to your doorstep.
          </p>
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">View Menu</Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
          <div className="mt-8">
            <DownloadButton />
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Why Choose CloudBite?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-600/10 rounded-full flex items-center justify-center">
                <Utensils className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Expert Chefs</h3>
              <p className="text-gray-800/60">
                Our meals are crafted by professional chefs using the finest
                ingredients
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-600/10 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quick Delivery</h3>
              <p className="text-gray-800/60">
                From our kitchen to your door in under 45 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-600/10 rounded-full flex items-center justify-center">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Free Delivery</h3>
              <p className="text-gray-800/60">
                Enjoy free delivery on all orders over $30
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="py-14" id="menu">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            Featured Meals
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredMeals.map((meal, id) => (
              <div
                key={id}
                className="max-w-96 max-h-fit rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  className="w-full h-1/2"
                  src={meal.image}
                  alt={meal.description}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 flex justify-between items-center">
                    <p>{meal.name}</p>
                    <p className="bg-gray-400/50 rounded-lg px-1 text-[10px] text-sm leading-5 font-normal">
                      {meal.category}
                    </p>
                  </div>
                  <p className="text-gray-700 text-base">{meal.description}</p>
                </div>
                <div className="px-6 pb-2">
                  <div>
                    <p className="flex items-center gap-2">
                      <span>
                        <Clock className="w-4 h-4 text-gray-400/50" />
                      </span>
                      <span>{meal.prepTime}</span>
                    </p>

                    <div className="pt-6 pb-4 flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold">${meal.price}</p>
                      </div>
                      <div className="bg-black rounded px-1 py-2 cursor-pointer w-24 text-white text-sm text-center">
                        <button>Add to Card</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
