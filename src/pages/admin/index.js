import React, { useState } from "react";

const sidesPriceOption = { single: "", double: "" };
const pizzaPriceOption = { small: "", medium: "", large: "" };

function Admin() {
  const [foodData, setFoodData] = useState({
    name: "",
    foodCategory: "",
    foodType: "",
    price: "",
    description: "",
    img: "",
  });

  const handleChange = async (e) => {
    setFoodData((prevData) => {
      return { ...prevData, [e.target.name]: e.target.value };
    });
    if (e.target.name === "foodCategory") {
      if (e.target.value === "Pizza") {
        setFoodData((prevData) => {
          return { ...prevData, price: pizzaPriceOption };
        });
      } else if (e.target.value === "SIDES & BEVERAGES") {
        setFoodData((prevData) => {
          return { ...prevData, price: sidesPriceOption };
        });
      } else {
        setFoodData((prevData) => {
          return { ...prevData, price: e.target.value };
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/createFoodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foodData),
    });
    const result = await response.json();
    if (result.success) {
      alert("Food item created successfully!");
    } else {
      alert("Failed to create food item. Please try again.");
    }
  }

  return (
    <div
      style={{
        minHeight: "90vh",
        overflowY: "scroll",
        backgroundImage:
          'url("https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
      }}
      className="flex py-10 justify-center items-center"
    >
      <div className="container w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 border-gradient rounded-lg shodow-2xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Food Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Food Name"
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={foodData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="foodCategory"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Food Category
            </label>
            <select
              name="foodCategory"
              type="foodCategory"
              required
              style={{ "-webkit-appearance": "auto" }}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={foodData.foodCategory}
              onChange={handleChange}
            >
              <option value="" className="text-black">
                Select Category
              </option>
              <option value="Pizza" className="text-black">
                Pizza
              </option>
              <option value="SIDE & BEVERAGES" className="text-black">
                SIDE & BEVERAGES
              </option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="foodType"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Food Type
            </label>
            <select
              name="foodType"
              required
              style={{ "-webkit-appearance": "auto" }}
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={foodData.foodType}
              onChange={handleChange}
            >
              <option value="" className="text-black">
                Select Food Type
              </option>
              <option value="Veg" className="text-black">
                Veg
              </option>
              <option value="Non-Veg" className="text-black">
                Non-Veg
              </option>
            </select>
          </div>

          {foodData.foodCategory !== "" && (
            <div className="mb-4">
              <label
                htmlFor="geolocation"
                className="block text-gray-300 text-sm font-bold mb-2"
              >
                Food Price
              </label>
              {foodData.price !== "" &&
                Object.keys(foodData.price).map((key) => {
                  return (
                    <div key={key} className="ml-4 mb-4">
                      <label
                        htmlFor={key}
                        className="block text-gray-300 text-sm font-bold mb-2"
                      >
                        {key}
                      </label>
                      <input
                        key={key}
                        type="number"
                        name={key}
                        placeholder={`Price of ${key}`}
                        value={foodData.price[key]}
                        onChange={(e) => {
                          setFoodData({
                            ...foodData,
                            price: { ...foodData.price, [key]: e.target.value },
                          });
                        }}
                        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
                      />
                    </div>
                  );
                })}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              rows={4}
              placeholder="description"
              name="description"
              onChange={handleChange}
              type="text"
              required
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={foodData.description}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="img"
              className="block text-gray-300 text-sm font-bold mb-2"
            >
              Food Image
            </label>
            <input
              placeholder="img"
              name="img"
              onChange={handleChange}
              type="text"
              required
              className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 focus:border-indigo-700 text-gray-700 dark:text-gray-100  leading-tight focus:outline-none focus:shadow-outline"
              value={foodData.img}
            />
          </div>
          <div className="flex items-center justify-between"></div>
          <button
            type="submit"
            className="border font-bold dark:border-gray-400 border-gray-900 rounded mr-2 p-2 hover:bg-gradient-to-r from-indigo-700 via-violet-700 to-orange-700 hover:text-gray-100"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
