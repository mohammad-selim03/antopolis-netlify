"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";

const Categories = () => {
  const [animals, setAnimals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://antopolis-task-five.vercel.app/categories");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again later.");
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch("https://antopolis-task-five.vercel.app/animals");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnimals(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching animals:", error);
      }
    };

    fetchAnimals();
  }, []);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto py-2 lg:py-20 flex items-center justify-evenly">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center gap-5">
          {categories?.map((item, index) => (
            <p
              key={index}
              className={`border rounded-3xl px-8 font-semibold cursor-pointer py-2 capitalize ${
                item?.name === "Land Animals"
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              }`}
            >
              {item?.name}
            </p>
          ))}
        </div>
        <div className="w-72">
          <Modal />
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto flex flex-wrap gap-4 px-10 ml-16">
        {animals.map((animal, index) => (
          <div  key={index}>
            <div className="w-64 h-64 border rounded-lg shadow-md">
            <img
              src={`https://antopolis-task-five.vercel.app${animal.image.path}`}
              alt={animal.name}
              className="animal-image rounded-lg w-64 h-64"
            />
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-500 uppercase">{animal.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
