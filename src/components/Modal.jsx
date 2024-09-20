"use client"
import React, { useState } from "react";
import toast from "react-hot-toast";

const Modal = () => {
  const [animalName, setAnimalName] = useState("");
  const [animalImage, setAnimalImage] = useState(null);

  const [categoryName, setCategoryName] = useState("");

  const handleAnimalSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", animalName);
    formData.append("image", animalImage);

    try {
      const response = await fetch("https://antopolis-task-five.vercel.app/animals", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Animal added successfully!");
        setAnimalName("");
        setAnimalImage(null);
      } else {
        toast.error("Failed to add animal.");
      }
    } catch (error) {
      console.error("Error adding animal:", error);
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://antopolis-task-five.vercel.app/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        toast.success("Category added successfully!");
        setCategoryName("");
      } else {
        toast.error("Failed to add category.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div>
      <label
        htmlFor="my_modal_7"
        className="border border-white text-white px-4 py-2 font-semibold rounded-3xl cursor-pointer"
      >
        Add Animal
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal px-40 bg-white" role="dialog">
        <div className="modal-box w-96 flex flex-col gap-6">
          <h3 className="text-lg font-semibold">Add Animal</h3>
          <form onSubmit={handleAnimalSubmit}>
            <input
              type="text"
              placeholder="Animal Name"
              className="w-full px-5 h-10 rounded-md bg-slate-200 outline-none mt-4 mb-4"
              value={animalName}
              onChange={(e) => setAnimalName(e.target.value)}
              required
            />
            <input
              type="file"
              className="w-full px-5 h-10 rounded-md bg-slate-200 flex items-center mt-4 mb-4"
              onChange={(e) => setAnimalImage(e.target.files[0])}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white h-10 font-semibold rounded-md"
            >
              Create Animal
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>

      <label
        htmlFor="my_modal_8"
        className="border border-white text-white px-4 py-2 font-semibold rounded-3xl cursor-pointer ml-2"
      >
        Add Category
      </label>

      <input type="checkbox" id="my_modal_8" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box flex flex-col gap-6 w-96">
          <h3 className="text-lg font-bold">Add Category</h3>
          <form onSubmit={handleCategorySubmit}>
            <input
              type="text"
              placeholder="Category Name"
              className="w-full px-5 h-10 rounded-md bg-slate-200 outline-none mt-4 mb-4"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white h-10 font-semibold rounded-md"
            >
              Save
            </button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_8">
          Close
        </label>
      </div>
    </div>
  );
};

export default Modal;
