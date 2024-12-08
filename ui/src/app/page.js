"use client";
import Clock from "./components/svgs/Clock";
import Truck from "./components/svgs/Truck";
import Utensils from "./components/svgs/Utensils";
import axios from "axios";
import { baseApi } from "./constants/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchMeals = async () => {
      try {
        const response = await axios.get(`${baseApi}/menus/items`);
        setFeaturedMeals(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching meals:", err);
        setError("Failed to load meals. Please try again later.");
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>{error}</p>
      </main>
    );
  }

  const addToCart = async (meal) => {
    try {
      const response = await axios.post(`${baseApi}/cart/add`, {
        id: meal.id,
        name: meal.name,
        price: meal.price,
        quantity: 1,
        description: meal.description,
        imageUrl: meal.imageUrl,
        prepTime: meal.prepTime,
      });

      if (response.status === 200) {
        toast.success(`${meal.name} added to cart successfully!`);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

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
                  src={meal.imageUrl}
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
                      <span>{meal.prepTime} min</span>
                    </p>

                    <div className="pt-6 pb-4 flex justify-between items-center">
                      <div>
                        <p className="text-lg font-bold">${meal.price}</p>
                      </div>
                      <div className="bg-black rounded px-1 py-2 cursor-pointer w-24 text-white text-sm text-center">
                        <button onClick={() => addToCart(meal)}>
                          Add to Cart
                        </button>
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
